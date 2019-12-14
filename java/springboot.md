# SpringBoot

快速开发，适合构建微服务系统，集成度较高，底层很难修改

## 配置

### 端口

- 方法一，直接在配置文件中application.properties设置
	```c
	server.port = 8190
	```
	
- 方法二，实例化EmbeddedServletContainerCustomizer

  	```java
  @RestController
  @EnableAutoConfiguration
  @ComponentScan
  public class example implements EmbeddedServletContainerCustomizer {
      @Override
      public void customize(ConfigableEmbeddedServletContainer configableEmabddedServletContainer) {
          configableEmabddedServletContainer.setPort(8190);
      }
  }
  ```

- 方法三，打包时添加端口 --server.port=8190
- 方法四，在JVM中配置 -Dserver.port=8190

### RESTful

url很符合RESTful风格，根据每个controller来，模块化干净清晰

## boot.test

在测试中，注意函数的执行顺序，是从下往上执行函数的

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```



## boot.data.neo4j

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



# 遇到的问题

- Java中有个很特殊的问题，就是变量名，一些常用字段不能使用，如set和get，会导致某些库出现异常！
- Java的一个class尽量一个文件，特别时注入的相关类，尽量独立看来，不用使用内部类，否则解析总是存在问题