# SpringBoot

快速开发，适合构建微服务系统，集成度较高，底层很难修改

## 配置

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

## 前后端分离

前端静态资源，通过元素a跳转到指定的href即可，后台的请求就可以全部使用RestController啦！
不直接返回页面，后面的页面也不处理！

# org.springframework.boot.SpringApplication

```java
public static void main(String[] args) {
	SpringApplication.run(DemoApplication.class, args);
}
```

spring也是从main函数开始，按F3进入

## org.springframework.boot.Banner

启动server时打印的logo，即广告内容！


## org.apache.commons.logging.Log

slf4j--Simple Loging Facade For Java, 是Java的日志输出规范接口

Logback是spring boot默认的日志实现

- trace
- debug
- info
- warn
- error

log level 默认是info级别

## org.springframework.context

### org.springframework.context.ApplicationContext

### org.springframework.context.ConfigurableApplicationContext





