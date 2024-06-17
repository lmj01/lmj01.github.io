# Maven

## 命令
配置好环境后，使用vscode开发，不使用IDE
- mvn test 跑test下的所有类
- mvn test -Dtest=ReportTest 跑test下指定的类
- mvn compile 编译
- mvn clean
- mvn package
- mvn install
- mvn clean install -Dmaven.test.skip=true 

### springboot
- mvn spring-boot:run

## 配置

### config/setting.xml
设置私有库,需要更改三处地方
```xml
<localRepository>E://repoJava</localRepository>
<server></server>
<mirror></mirror>
```

## itext7

itext7 的字体涉及到版权问题，基本就是与adobe有关

```java
PdfFont f2 = PdfFontFactory.createFont("STSong-Light", "UniGB-UCS2-H",true);
PdfFont f3 = PdfFontFactory.createFont("C:/Windows/Fonts/simhei.ttf", PdfEncodings.IDENTITY_H,true);
//Add paragraph to the document
document.add(new Paragraph("hellos你好").setFont(f2));
document.add(new Paragraph("hellos你好").setFont(f3));
```

## 工具
[mvn的仓库](https://mvnrepository.com/)
[ Spring Initializr在线生成工程模板](https://start.spring.io/)