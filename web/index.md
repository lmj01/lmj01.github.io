# Web

- [web](./web.md)
    - [浏览器](./browser.md)
- [html](./html.md)
    - [hover](./hover.md)
- [CSS](./css.md)
    - [适配屏幕](./adapt.screen.md)
    - [font](./font.md)
    
- [http](./http.md)
    - [nginx](./nginx.md)

- [javascript](./JavaScript.md)
    - [typescript](./typescript.md)
    - [bable](./babel.md)
    - [vue](./vue.md)
- [多语言i18n](./i18n.md)
- [Web Check网站分析，分析各种配置，可参考网站的配置](https://web-check.as93.net/)

## library

### 引导库

- [driver.js官网](https://driverjs.com/)
    - [Driver.js，Powerful, highly customizable vanilla JavaScript engine to drive the user's focus across the page,MIT开源协议](https://github.com/kamranahmedse/driver.js)
    
- [Intro.js is a lightweight JavaScript library for creating step-by-step and powerful customer onboarding tours商用授权](https://introjs.com/)
    - [github](https://github.com/usablica/intro.js)
- [Bootstrap Tour](https://bootstraptour.com/)
    - [github](https://github.com/sorich87/bootstrap-tour)

### 富文本编辑器

- [Trusted WYSIWYG editor很简洁，没有图片](https://github.com/tinymce/)
    - [TinyMCE](https://github.com/tinymce/tinymce)

- [过时的YUI is a free, open source JavaScript and CSS library for building richly interactive web applications. ](https://clarle.github.io/yui3/)
    - [github yui3 ](https://github.com/yui/yui3)

- [The WYSIWYG Editor of tomorrow available today](https://ckeditor.com/)
    - [CKEditor 5 is an ultra-modern JavaScript rich-text editor with MVC architecture, a custom data model, and virtual DOM](https://github.com/ckeditor/ckeditor5)

- [Your powerful rich text editor.](https://quilljs.com/)
    - [github](https://github.com/quilljs/quill)

### PDF

- [PDF-LIB可写可修改](https://pdf-lib.js.org/) 字体必须内嵌，这样文件非常大，拷贝合并pdf时，内嵌字体还没法删除
    - [github](https://github.com/Hopding/pdf-lib)

- [jspdf只能写](https://github.com/parallax/jsPDF)

### 数学
- [regression-js是JS库，包含了linear least-squares filting methods对的数据分析方法，支持linear、exponential、logarithmic、power、polynomial几种常见的](https://github.com/Tom-Alexander/regression-js)

- [ever polate -- Javascript Numerical Inerpolation library](https://github.com/BorisChumichev/everpolate)

### 颜色库

- [Modular, design-conscious color picker widget for JavaScript](https://iro.js.org/)
    - [github](https://github.com/jaames/iro.js/)

### 其他

- [Create, read and edit .zip files with Javascript ](https://stuk.github.io/jszip/)
    - [github](https://github.com/Stuk/jszip)
```js
jszip.loadAsync(new Blob([buffer])).then(zip=>{
    zip.file('filename').async('ArrayBuffer').then(data=>{
        console.log(data)
    })
})
```

#### 放大镜
- [loupe.js 2.0 allows you to add photorealistic loupes (magnifier) to images on your webpages. The design is changeable by use of an image editing program. It uses unobtrusive javascript to keep your code clean. ](http://www.netzgesta.de/loupe/)

##### loupe-js

实现原理很简单, 就是图像因为窗口被压缩,放大镜的作用就是对原图采样截图图片,算好位置,可直接使用css来截图,不像loupe.js这个库使用的是两张图来截取.

- [An image magnifier for JavaScript](https://github.com/nishanths/loupe-js)
    - [demo](https://nishanths.github.io/loupe-js/?shape=rectangle)

## 参考

- [Draggable objects可拖动的对象网页实现](https://www.redblobgames.com/making-of/draggable/)

