# Font

- [SLUG--Dynamic GPU Font Rendering and Advanced Text Layout ](https://sluglibrary.com/)
  - [GPU-Centered Font Rendering Directly from Glyph Outlines](https://jcgt.org/published/0006/02/02/)

字体在网页中的应用

去各大网站上看看其他网站默认的字体，一般都是对body样式中存在这样的值

```css 
body {
    height:100%;
 font:400 1em/1.8 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif
}
/*额外引入文字字体*/
@font-face {
  font-family: 'Yaku';
  src: url('http://font-url.com/yaku.woff') format('woff'),
    url('http://font-url.com/yaku.woff2') format('woff2'),
    url('http://font-url.com/yaku.otf') format('otf'),
    url('http://font-url.com/yaku.eot') format('eot'),
    url('http://font-url.com/yaku.ttf') format('truetype'),
    url('http://font-url.com/yaku.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

## Fonts

### Google Fonts

- [地址](http://www.googlefonts.cn/)
- [cn地址](http://www.googlefonts.cn/)

谷歌字体是一个云字库平台，使用起来很方便，不需要进行格式的转换，直接在网页中引用。

### Fira Code
Fira Code: free monospaced font with programming ligatures

- [github](https://github.com/tonsky/FiraCode?_pjax=#js-repo-pjax-container)

## 理论知识
不同操作系统、不同浏览器内嵌的默认字体是不同的

按字体族类分类为
- serif衬线，是指在字的笔划开始及结束处的地方有额外的装饰，且笔画的粗细也有变化，衬线的字体比较突出，常见的有Times New Roman、宋体
- sans-serif无衬线，是没有这些装饰，笔画粗细大致差不多，字形端庄，横平竖直，常见的有Tahoma、Arial、Verdana、Helvetica、微软雅黑
- monospace等宽字体，指字符宽度相同的字体，通常用于编辑器以及技术文章编辑中，主要是针对西文字体的，courier是最常见的等宽字体
- fantasy梦幻
- cuisive草体

![](./images/Serif-and-sansSerif.png)

### 打印字体TrueType

PDF内嵌字体

TrueType(CID)
编码 Identity-H
[TrueType CID fonts causing issues for clients with older printers](https://forum.aspose.com/t/truetype-cid-fonts-causing-issues-for-clients-with-older-printers/13530/3)

## 渲染

figma文字 > 矢量形状 > 屏幕像素

- [canvas-editor基于canvas/svg的富文本编辑器](https://hufe.club/canvas-editor-docs/)

使用 freetype 库 用opengl显示 ，无法显示汉字， 
freetype可以根据ttf等格式的font文件 提取到文字轮廓 然后根据轮廓三角化就行了，可以借助[CGAL库](https://www.cgal.org/)

[FTGL is a free cross-platform Open Source C++ library that uses Freetype2 to simplify rendering fonts in OpenGL applications. FTGL supports bitmaps, pixmaps, texture maps, outlines, polygon mesh, and extruded polygon rendering modes.](https://sourceforge.net/projects/ftgl/)

### [opentype.js](https://opentype.js.org/)

前端渲染字体

- [github](https://github.com/opentypejs/opentype.js/)

## 参考
[Web 字体 font-family 该如何设置？](https://zhuanlan.zhihu.com/p/313284552)
[cmap — Character to Glyph Index Mapping Table](https://learn.microsoft.com/en-us/typography/opentype/spec/cmap#encoding-records-and-encodings)
[Fonts & Encodings](https://book.douban.com/subject/2362953/)
[打印机分辨率增强技术](https://www.docin.com/p-878782126.html)
- [opentype.js is an OpenType and TrueType font parser and writer. It allows you to access the letterforms of text from the browser or node.js. ](https://opentype.js.org/) 
  - [github-Read and write OpenType fonts using JavaScript. ](https://github.com/opentypejs/opentype.js/)
