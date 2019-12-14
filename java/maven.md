# Maven

## itext7

itext7 的字体涉及到版权问题，基本就是与adobe有关

```java
PdfFont f2 = PdfFontFactory.createFont("STSong-Light", "UniGB-UCS2-H",true);
PdfFont f3 = PdfFontFactory.createFont("C:/Windows/Fonts/simhei.ttf", PdfEncodings.IDENTITY_H,true);
//Add paragraph to the document
document.add(new Paragraph("hellos你好").setFont(f2));
document.add(new Paragraph("hellos你好").setFont(f3));
```

## zxing

条形码的生成
