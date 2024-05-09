
# Java

- 编码
	- Java默认字符是Unicode编码，而String类型的编码方式与JVM编码方式都与本机操作系统的默认字符集有关
- [OpenJDK ](https://openjdk.org/)
- jdk1.8需要maven3.3及以上 
- jdk17需要maven3.8.8及以上
- jdk21需要maven3.8.8及以上


## 语言特性

- 不支持默认参数，支持方法重载，同时支持存在歧义。非static方法都是虚方法。同样在C++的virtual方法中使用默认参数，会破坏多态性，所以很多C++编码规范都禁止在虚方法中使用默认参数	

### 泛型

- E  Element,在集合中使用，集合中存放的元素
- T Type， Java的类
- K key 键
- V Value 值
- N Number 数值类型
- ？不确定的Java类型

### Class类

是所有对象的运行时类型标识，即RTTI-Run Time Type Identification
它是由JVM创建，它的作用就是在运行时提供或获得某个对象的类型信息

```java 
public class Shape{}
// get Class method one 
Class obj1 = Class.forName("Shape");
// get Class method two 
Shape shape = new Shape();
Class obj2 = shape.getClass();

// instace obj 
Class<Shape> obj3 = Shape.class;

```

### listener

Java中的事件监听机制，事件观察者向事件发出者进行注册，当事件产生时，事件发出者调用注册的函数进行
发送。
事件发出者管理一个array或list来维护注册者，所以尽量不要在多线程中使用这样，需要单线程依次发送。
特别对于网络的监听是非常多的。

### 反射机制

在运行状态中，对于任意一个类，都能知道这个类的所有属性和方法；对于任意一个对象，都能调用它们的任意一个方法和属性。这种动态获取的信息以及动态调用对象的方法的功能称为Java语言的反射机制

即编译后，这些信息都是可获取的，在语言层面提供了支持。

### 注解

与C语言中的宏是类似功能，Java的注解是在class文件文件基础上的东西，class文件里面是没有注解的，注解的形式是便于编译器在处理class时关联Annotation信息，通过反射去获取信息。

#### 元注解

java.lang.annotation里面定义了4种原语

- @Target，用于明确被修饰的类型，方法，字段，类，接口等
- @Retention，描述注解的生命周期
  1. RetentionPolicy.RUNTIME 注解会在class字节码文件中存在，运行时反射即可获得
  2. RetentionPolicy.CLASS,注解会在class字节码文件中存在，但运行时不能获取
  3. RetentionPolicy.SOURCE，仅存在源码中，class字节码中不存在
- @Documented
- @Jnherited

#### 自定义注解

##### 简单注解

又称标记，这种注解仅利用自身的存在与否来提供信息，如@Override

```java 
// 定义一个注解
public @interface Test{}

// 使用注解
@Test
public class MyClass{
}
```

##### 复杂注解

又称元数据Annotation，提供更多的元数据

```java 
// 定义注解
@Rentention(RententionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyTag {
	// 以method的形式提供
	String name();
	int age() default 32;
}

// 使用注解
public class Test {
	@MyTag(name="test")
	public void info() {}
}
```

使用Annotation修饰了程序后，并不会自己生成，需要开发者通过API来提取。所有的元数据的接口都继承
Annotation父接口

方法就是通过反射获取Annotation，将Annotation转换为XXXAnnotation,调用XXXAnnotation中的方法

```java 
Class clazz = Class.forName(className);
Annotation[] arr = clazz.getMethod("info").getAnnotations();
for (Annotation an : arr) {
	if (an instanceof MyTag) {
		MyTag tag = (MyTag)an;
		String str = String.format("%s, %d", tag.name(), tag.age());
		System.out.println(str);
	}
}
```

### bean

Java语言欠缺属性、事件、多重继承功能，要在Java中实现一些面向对象的常见需求，需要大量的胶水代码。
Bean正是编写这套胶水代码的惯用模式或约定，包括

- getXxx
- setXxx
- isXxx
- addXxxListener
- XxxEvent
- ... 

这也是Java代码的常见写法，数据都是声明为

```java 
private int size;
public int getSize() { return size};
public void setSize(int _size) { size = _size; }
``` 

public保证接口的向后兼容，内部的实现与size可能会改变， 这就是Java Bean，但是更新的语言C#等就
不需要，它们在语言自身中就提供了足够的语言特性来实现这些功能。

#### 进化

1. java bean1.00-A
2. 因需要实现事务，安全，分布式，升级为EJB
3. DI依赖注入，AOP面向切面技术来解决EJB的臃肿，升级为POJO
4. spring

## SpringBoot
> 框架，快速开发，适合构建微服务系统，集成度较高，底层很难修改

### IoC

Inversion of Control，控制反转，是spring框架的核心，本质就是spring负责控制对象的生命周期和对象间的关系。

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

### RESTful

url很符合RESTful风格，根据每个controller来，模块化干净清晰

### boot.test

在测试中，注意函数的执行顺序，是从下往上执行函数的

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### boot.data.neo4j

添加配置

```xml
// 依赖		
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-neo4j</artifactId>
</dependency>        
<dependency>
    <groupId>org.neo4j</groupId>
    <artifactId>neo4j-ogm-http-driver</artifactId>
</dependency>
// 配置
spring.data.neo4j.username=neo4j
spring.data.neo4j.password=123456
spring.data.neo4j.uri=http://localhost:7474
```

### 前后端分离

前端静态资源，通过元素a跳转到指定的href即可，后台的请求就可以全部使用RestController啦！
不直接返回页面，后面的页面也不处理！




## 库

### [itext](https://api.itextpdf.com/iText/java/latest/)

- A4 width:595.0, height:842.0