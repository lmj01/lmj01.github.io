# Spring

框架



## IoC

Inversion of Control，控制反转，是spring框架的核心，本质就是spring负责控制对象的生命周期和对象间的关系。

## 控制权

在程序运行中，传统方法是，对象A要调用对象B，A具有B的所有控制权，而在IoC中，A的控制权转移到spring中，A向spring要对象B。

A不是主动请求的，是spring主动注入对象到A中，这就是**DI(Dependency Injection)，依赖注入**的作用，实现的大致逻辑如下：

- 容器启动阶段
  - 加载配置
  - 分析配置信息
  - 装备到BeanDefinition
  - 其他后续处理
- Bean实例化阶段
  - 实例化对象
  - 装配依赖
  - 生命周期回调
  - 对象其他处理
  - 注册回调接口

A不主动请求B，spring是如何知道需要注入对象的呢？主要有三种方式

- 接口注入，基本上deprecate了，spring会强制要求A实现不用到的接口，侵入性很强。
- 构造方法注入，对象A构造完成后就可以使用了，性能上可能造成困扰
- setter方法注入，可以继承的方法，在逻辑上更好理解些

### Ioc类型

spring框架提供了两种IoC容器

#### BeanFactory

基础类型IoC容器，提供完整的服务支持，默认采用延迟初始化策略lazy-load。

#### ApplicationContext

是继承自BeanFactory的，扩展了更多的内容。

### 注入方式

#### 通过文件记录被注入与依赖对象的关系

##### 文本格式

##### xml格式

#### 通过编写代码

#### 通过注解方式

```java
@Component 
public class XXXUtil {
    @Autowired
    private XXX xxxRepo; // 
    public static XXXUtil sXXX;
    public XXXUtil() {
        sXXX = this;
    }
    public void memberFunc() {
        // 调用 xxxRepo.findByName
    }
}
// 其他地方调用
XXXUtil.sXXX.memberFunc(); // 不能new XXXUtil，否则xxxRepo为空
```



