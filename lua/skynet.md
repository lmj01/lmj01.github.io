# skynet

一个轻量级的服务器框架，C语言写的框架，配合胶水语言lua
[Skynet 设计综述](https://blog.codingnow.com/2012/09/the_design_of_skynet.html)中云风以能够充分利用多核优势，将不同的业务放在独立的执行环境中处理，协同工作，实现了类似Erlang的Actor模型，本质是一个高并发的消息处理框架，消息从底层发给上层的服务去处理。这里的服务，可用C写，可用lua写，大部分都是lua写的，每个lua服务是一个独立的lua虚拟机，这样就隔离了服务之间的环境。lua服务使用协程处理消息，当需要向其他服务通信时，协程可以挂起等待其他服务返回再继续；当协程挂起时，该服务可以处理其他消息，这就保证了消息的高并发。

skynet是一个基于事件的高并发消息处理框架，事件来源于网络、定时器和信号通知等，当事件触发时，skynet将这些事件统一编码成消息结构，派发给感兴趣的服务进行处理，服务在处理消息时，也可以向其他服务发送消息，

## 概念

**服务句柄**
用于唯一标识服务的，是一个32位的无符号整型，最高8位表示集群ID【已不推荐使用】，剩下24位为服务ID

**服务模块**
模块以动态库的形式提供，在创建skynet_context时，必须指定模块名字，skynet把模块加载进来，创建模块实例，实例向服务注册一个回调函数，用于处理服务的消息

**消息队列**
每个服务都有一个消息队列，当队列中有消息时，会主动挂到全局链表，skynet启动了一定数量的工作线程，不断从全局链表取出消息队列，派发消息给服务的回调函数去处理。

## 启动服务
通过skynet_start函数启动
1. 初始化各个模块功能，比如句柄、消息队列、模块、定时、socket等
2. 创建一个logger服务，创建一个bootstrap服务
3. 创建一定数量的工作线程，这个数量可配置，工作线程的责任就是派发消息
4. 创建定时器，用于记录时间以及实现timeout事件
5. 创建socket线程，用于处理socket消息
6. 创建monitor线程，监控服务状态

绝大多数的服务程序的核心功能就是生产消费者模型，产生消息，消费消息，skynet也是如此的。

## 源码分析

**skynet_main.c**
启动的地方，是skynet程序的入口，通过读取配置文件来进行相应的设置

先调用skynet_globalinit函数，是在skynet_server中创建主线程的，其对应的函数是skynet_globalexit
接着设置一个全局的env变量
接着读取配置config，传入给skynet_start进行启动skynet程序

**skynet_start.c**
进入正式启动中，看配置文件中是否有守护进程daemon，这个是用来判断当前服务器是否有相同的服务进程运行

skynet_harbor.h/c中是用于cluster集群的，对harbor的高8位编码

skynet_handle.h/c文件
是用来存储skynet_context对象的，函数skynet_handle_register函数通过一个加锁的结构来生成一个顺序的索引，
以索引位位置存储在固定的长度中，如果超过一半，继续扩容到两倍大小，算是避免hash的冲突吧

skynet_mq.h/c文件
消息队列，维护一个全局的消息Q，一个message_queue的单向链表，所有的消息都要存在这个上面。

### 模式
每个h/c文件对应的是一个模块或功能


使用C开发的，每个服务都独立属于一个文件，有一个static的全局对象，每次操作时都需要通过另外一个alias指针来
操作，如
```c
static struct global_queue *Q = NULL;
void init() {
    struct global_queue *q = skynet_malloc(sizeof(*q));
    Q=q;
}
void operator1() {
    struct global_queue *q = Q;
    // do something with q  
}
```

