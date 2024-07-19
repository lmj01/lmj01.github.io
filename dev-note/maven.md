# [Maven](https://maven.apache.org/)

Apache Maven is a software project management and comprehension tool. Based on the concept of a project object model (POM), Maven can manage a project's build, reporting and documentation from a central piece of information. 

maven是项目管理工具，将项目分成了三个生命周期，clean，default，site
 是打包工具，执行还是需要调用Java

## 命令

配置好环境后，使用vscode开发，不使用IDE

- mvn test 跑test下的所有类
- mvn test -Dtest=ReportTest 跑test下指定的类
- mvn compile 编译
- mvn clean
- mvn package // 打包后jar文件包含资源和编译的Java类
- mvn install
- mvn clean install -Dmaven.test.skip=true 

### [Spring Boot Maven Plugin](https://docs.spring.io/spring-boot/maven-plugin/index.html)

- [插件源码](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-tools/spring-boot-maven-plugin)

Spring Boot 通过 Spring Boot Maven Plugin 在 Apache Maven 中提供了对 Spring Boot 的支持。

- mvn spring-boot:run
- mvn spring-boot:repackage
- mvn package 打包后用java -jar来运行

调用springboot打包后的文件启动服务

- java -jar target/spring-boot-artifacts-2.jar 
- java -jar target/orth.war

## 配置

### config/setting.xml
设置私有库,需要更改三处地方
```xml
<localRepository>E://repoJava</localRepository>
<server></server>
<mirror></mirror>
```

## [itext](https://api.itextpdf.com/iText/java/latest/)

- [FAQ](https://kb.itextpdf.com/itext/faq)
- [stackoverflow](https://stackoverflow.com/questions/tagged/itext+itext7)

- A4 width:595.0, height:842.0

itext7 的字体涉及到版权问题，基本就是与adobe有关

```java
PdfFont f2 = PdfFontFactory.createFont("STSong-Light", "UniGB-UCS2-H",true);
PdfFont f3 = PdfFontFactory.createFont("C:/Windows/Fonts/simhei.ttf", PdfEncodings.IDENTITY_H,true);
//Add paragraph to the document
document.add(new Paragraph("hellos你好").setFont(f2));
document.add(new Paragraph("hellos你好").setFont(f3));
```

### [7.1.8](https://api.itextpdf.com/iText/java/7.1.8/)

- [How to fill a rectangle with color?](https://kb.itextpdf.com/itext/how-to-fill-a-rectangle-with-color)


## 工具
- [mvn的仓库](https://mvnrepository.com/)
- [ Spring Initializr在线生成工程模板](https://start.spring.io/)
- [Spring-boot:repackage 和 Maven package](https://springdoc.cn/spring-boot-repackage-vs-mvn-package/)


### 开发配置
```shell
cd matchyun-orthodontic
mvn spring-boot:run
cd ..
```