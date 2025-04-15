# 库

相关库，工作中使用过，分析并学习的库

- [rxjs](/web/libs/rxjs.md)
- [d3](/web/libs/d3.md)

## 富文本

- [企业版的开源富文本编辑器The rich text editor behind great content creation experiences](https://github.com/tinymce/)
    - [TinyMCE](https://github.com/tinymce/tinymce)

- [过时的YUI is a free, open source JavaScript and CSS library for building richly interactive web applications. ](https://clarle.github.io/yui3/)
    - [github yui3 ](https://github.com/yui/yui3)

- [The WYSIWYG Editor of tomorrow available today](https://ckeditor.com/)
    - [CKEditor 5 is an ultra-modern JavaScript rich-text editor with MVC architecture, a custom data model, and virtual DOM](https://github.com/ckeditor/ckeditor5)

### Quill

- [Quill -- Your powerful rich text editor.](https://quilljs.com/)
    - [github](https://github.com/quilljs/quill)

#### dev

安装sharp
npm config get userconfig 获取配置信息
npm config edit 打开默认的配置文件
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"

#### rollup打包
看不懂webpack的逻辑，直接增加rollup打包，思路就清晰了
npm install rollup --save-dev
npm install @rollup/plugin-typescript --save-dev
npm install @rollup/plugin-image --save-dev
npm install @rollup/plugin-replace --save-dev
npm install @rollup/plugin-node-resolve --save-dev
npm install @rollup/plugin-commonjs --save-dev
npm install rollup-plugin-postcss --save-dev
npm install rollup-plugin-rawsvg --save-dev

- 2024-1, 作者发布新版2.0了，暂时不去私自编译了，可以直接使用npm包了。之前这样处理是因为作者有很长一个版本的锁定，没有正式发布，版本后不能切换到开放模式，自己打包提取核心功能以便工程需要。

#### modules

##### clipboard
复制剪切板

##### image

内部的image的sanitize时，只支持http,https,data这三种模型，其他情况会赋值为'//:0'
比如拦截时，url需要临时设置成blob:http
```js
const image = Quill.import('formats/image');
image.sanitize = (url) => url;
```


#### [delta](https://github.com/quilljs/delta)
Delta 是用于描述富文本文档结构的内容与变更。由于其描述的通用性，quill.js 将其独立维护。它的数据结构是基于 JSON 格式的，方便服务间进行互解析

[An O(ND) Difference Algorithm and Its Variations](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.6927&rep=rep1&type=pdf)在[github上的实现](https://github.com/jhchen/fast-diff)

[Diff, Match and Patch library](https://neil.fraser.name/news/2007/10/09/)在[GitHub](https://github.com/google/diff-match-patch/)上的地址

#### [parchment](https://github.com/quilljs/parchment)
Parchment is Quill's document model. It is a parallel tree structure to the DOM tree, and provides functionality useful for content editors, like Quill. A Parchment tree is made up of Blots, which mirror a DOM node counterpart. Blots can provide structure, formatting, and/or content. Attributors can also provide lightweight formatting information.

通过Parchment你可以自定义出Quill能够识别的内容和格式，或者添加全新的内容和格式。
[一个例子](https://kang-bing-kui.gitbook.io/quill/zhi-nan-guides/clonewithparchment)

### [tinymce](https://www.tiny.cloud/docs/tinymce/latest/)
> 自己需要一个编辑器，用来编辑并保存为HTML5格式，且需要数学公式，就需要这个强大的编辑器

- [github项目](https://github.com/lmj01/tinymce)
- [mathjax插件](https://github.com/lmj01/tinymce-mathjax)

插件的写法可参考安装后的code插件来写。
modules\tinymce\src\core\main\ts\api\Options.ts

## Node
### [node-gyp](https://github.com/nodejs/node-gyp)
node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. It contains a vendored copy of the gyp-next project that was previously used by the Chromium team and extended to support the development of Node.js native addons.

## 功能类

### [UMI](https://umijs.org/)
- [笔记](/articles/2024/umi.md)

### [UglifyJS 3](https://github.com/lmj01/UglifyJS)

JavaScript parser / mangler / compressor / beautifier toolkit 

### [redux - A JS library for predictable and maintainable global state management](https://redux.js.org/)
Redux 是一个用于 JavaScript 应用程序的状态容器，它提供了一种可预测化的状态管理方式

### templates模板编译器

- []()

### lru

- [A fast cache that automatically deletes the least recently used items](https://github.com/isaacs/node-lru-cache)

## 分布式
### [PartyKit simplifies developing multiplayer applications.](https://github.com/partykit/partykit)
With PartyKit, you can focus on building multiplayer apps or adding real-time experiences to your existing projects with as little as one line of code. Meanwhile, PartyKit will handle operational complexity and real-time infrastructure scaling.

- [doc](https://docs.partykit.io/)


## 展示类

- [Compact GUI for fine-tuning parameters and monitoring value changes 比dat.GUI更舒服的库](https://github.com/cocopon/tweakpane)
- [excel](/articles/notes/excel.md)

### 图示

- [d2](https://d2lang.com/)
    - [D2 is a modern diagram scripting language that turns text to diagrams](https://github.com/terrastruct/d2)
- []()

### [jsPDF](https://github.com/lmj01/jsPDF/tree/master)

- [PDF-LIB可写可修改](https://pdf-lib.js.org/) 字体必须内嵌，这样文件非常大，拷贝合并pdf时，内嵌字体还没法删除
    - [github](https://github.com/Hopding/pdf-lib)
- [jspdf只能写 github](https://github.com/parallax/jsPDF)

Client-side JavaScript PDF generation for everyone. 

- [paper size打印纸张大小](https://www.papersizes.org/a-paper-sizes.htm)

### jszip

```javascript
new Promise(()=>{

}).then(res=>{
    // 字符串
    if (res.byteLength < 100) {
        const tmp = JSON.parse(new TextDecoder().decode(new Uint8Array(res)));
    } else {
        const zip = new JSZip();
        zip.loadAsync(res).then(zip=>{
            let i = 0;
            for (const fname in zip.files) {
                zip.file(fname).async('arraybuffer').then(img=>{
                    const blob = new Blob([img]);
                    i++;
                    if (i == 4) {
                    }
                });
            }
        });
    }
})
```

### [reveal.js](https://revealjs.com/)

用来做PPT展示内容的。非常适合文档展示的。

reveal.js is an open source HTML presentation framework.

- [github](https://github.com/hakimel/reveal.js)

### [JavaScript image viewer. viewerjs](https://fengyuanchen.github.io/viewerjs/)

用来查看图片的前端库

- [github](https://github.com/lmj01/viewerjs)

### [mxGraph](https://jgraph.github.io/mxgraph/)

### [A lightweight JavaScript library for creating particles ](https://github.com/VincentGarreau/particles.js)
轻量级生成式的粒子显示
[demo and doc](https://marcbruederlin.github.io/particles.js/)

### 引导库

- [driver.js官网](https://driverjs.com/)
    - [Driver.js，Powerful, highly customizable vanilla JavaScript engine to drive the user's focus across the page,MIT开源协议](https://github.com/kamranahmedse/driver.js)
    
- [Intro.js is a lightweight JavaScript library for creating step-by-step and powerful customer onboarding tours商用授权](https://introjs.com/)
    - [github](https://github.com/usablica/intro.js)
- [Bootstrap Tour](https://bootstraptour.com/)
    - [github](https://github.com/sorich87/bootstrap-tour)

### signal

信号是一个非常好的方案用来沟通数据和状态

- [A proposal to add signals to JavaScript.标准提案中的signal](https://github.com/tc39/proposal-signals)

- [Custom Event/Messaging system for JavaScript inspired by AS3-Signals 很老的了](http://millermedeiros.github.io/js-signals/)
    - [github](https://github.com/millermedeiros/js-signals)
- [small, simple, fast event system with no dependencies ](https://github.com/JosephClay/signal-js)
- [Manage state with style in every framework ](https://github.com/preactjs/signals)