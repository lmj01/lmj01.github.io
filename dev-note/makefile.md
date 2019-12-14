# Makefile

## 基础

与make命令一起配合用

```makefile
target ... : prerequisites ...
	command
	...
	...
```

- target, 目标文件，可是object file，或可执行文件
- prerequisites，依赖
- command，任意的shell命令

一个Makefile主要有五个部分，make执行的流程是

- 读入主Makefile（主Makefile可引用其他的Makefile）
- 读入include的Makefile
- 初始化文件中的变量
- 推导隐晦规则，并分析所有规则
- 为所有的目标文件创建依赖关系链
- 根据依赖关系，确定目标重新生成
- 执行生成命令

### 显示规则

 如何生成一个或多个目标文件，其中最主要的一个是路径搜索，有个特殊的变量VPATH

```makefile
VPATH <dirs> // ex. VPATH src: ../parent-dir 当前目录找不到就从dirs查找
VPATH <pattern> <dirs> // ex: VPATH %.h ./header 符合pattern的就从dirs中搜索
VPATH <pattern> // ex: VPATH %.h 清除已设置的搜索目录
VPATH // 清除所有已经设置好的文件路径
```



### 隐晦规则

make的自动推导功能所执行的规则

#### 命令前缀

shell命令可以加前缀，

- 无前缀，输出执行的命令语句，执行后结果输出，遇到错误停止执行
- 前缀@，输出命令执行的结果，出错停止
- 前缀-，命令执行错时，忽略错误，继续执行 

#### 退出码

Makefile退出时有三种值

- 0 ，执行成功
- 1，出现错误
- 2，使用`-q`选项

#### make参数

|           参数            |                含义                |
| :-----------------------: | :--------------------------------: |
|    --debug[=<options>]    |     调试信息，options可为a,b,v     |
|         -j --jobs         |         多线程执行makefile         |
|   -r --no-builtin-rules   |        禁止使用任何隐含规则        |
| -R --no-builtin-variables | 禁止使用任何作用于变量上的隐含规则 |
|     -B --always-make      |            强制重新编译            |



### 变量定义

Makefile中的变量

```makefile
OBJS = pa.o pb.o
OBJS-ADD = $(OBJS) pc.o
# =与:=的区别是，=可以使用后面的定义的变量:=只能使用前面定义的变量
OBJS := pa.o pb.o
OBJS-ADD : $(OBJS) pc.o
SRCS := $(OBJS:%.o=%.c) # .o文件替换为.c
SRCS += pc.c # 追加
# override 变量覆盖
# override <variable>  = <value>
# override <variable> := <value>
# override <variable> += <value>
SRCS := pa.c pb.c pc.c # make SRCS = nothing , SRCS=nothing替换掉
override SRCS := pa.c pb.c pc.c # make SRCS=nothing 无作用
# target 目标变量，作用域只在target范围内
# <target ...> :: <varible-assignment>
# <target ...> :: override <variable-assignment> 
target : TARGET_SRC :=pc.c # make target, 其他target不能使用$(TARGET_SRC)
```



#### 伪目标

```makefile
.PHONY: clean
clean: 
	-rm -f *.o
```


### 文件指示

引用其他的Makefile,`include 'other Makefile'`

### 注释

只有行注释#，使用#字符需要转义`\#`



## 参考

[makefile 使用总结](<https://www.cnblogs.com/wang_yb/p/3990952.html>)