# Web

- [网页平台最好的开发集合地A place to find the best open source projects related to the web platform](https://bestofjs.org/)
    - [增长最快的排行榜](https://risingstars.js.org/2023/en)

- [使用过的库](/web/library.md)
- [正则表达式](/cpl/js/regularExpressions.js)
- [webassembly](/web/webAssembly.md)
- [web概念](/web/web.md)
- [html](/web/html.md)
- [css](/web/css.md)
- [store存储数据](/web/store.md)
- [canvas](/cg/canvas.md)
- [小程序开发](/web/mini.md)
- [字体](/cg/font.md)
- [框架](/web/framework.md)
- [测试模块](/web/test.md)
- [图像处理](/web/ImageManipulation.md)
- [diff算法原理](/web/diff.md)
- [FRP-Functional Reactive Programming](/cpl/frp.md)
- [浏览器](/web/browser.md)
- [html](/web/html.md)
- [CSS](/web/css.md)
- [适配屏幕](/web/adapt.screen.md)
- [http](/web/http.md)
- [javascript](/cpl/web/ECMAScript.md)
- [代码混淆](/web/confuse.md)


- [Web Check网站分析，分析各种配置，可参考网站的配置](https://web-check.as93.net/)
- [Draggable objects可拖动的对象网页实现](https://www.redblobgames.com/making-of/draggable/)

- [CanIUse网站查看接口的普及率](https://caniuse.com/)

## [MDN Web Api](https://developer.mozilla.org/en-US/docs/Web/API)

现代浏览器技术开发API有大量的接口，需要去了解

### [http](https://developer.mozilla.org/en-US/docs/Web/HTTP)

- [http](/web/http.md)
- [nginx](/web/nginx/nginx.md)

### [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

- [Mock Service Worker Industry standard API mocking for JavaScript](https://mswjs.io/)
- [broswer集成时需要设置worker](https://mswjs.io/docs/integrations/browser)
```shell

```


### [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
新版的剪切接口，是新标准
```javascript
document.execCommand('copy'); // 旧的方法调用系统接口
```


## library

### [Browserslist](https://github.com/browserslist/browserslist)
对一些工具起作用的 使用[Can I Use data](https://caniuse.com/)数据来判断
- [A smaller version of caniuse-db, with only the essentials! ](https://github.com/browserslist/caniuse-lite)


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


### UI
- [bootstrap](https://getbootstrap.com/)
    - [fast bootstrap](https://fastbootstrap.com/)

- [naive ui](https://www.naiveui.com/en-US/os-theme)

- [Element Plus](https://element-plus.org/en-US/component/button.html)

- [ Fabric.js is a powerful and simple Javascript HTML5 canvas library ](http://fabricjs.com/)
    - [github fabric](https://github.com/fabricjs/fabric.js)

- [原生HTML5的canvas中所支持的贝塞尔曲线最多只到3阶,bezierMaker.js可以理论支持N阶贝塞尔曲线的生成](https://github.com/Aaaaaaaty/bezierMaker.js)

- [AlloyImage - 基于HTML5技术的专业图像处理库](https://github.com/AlloyTeam/AlloyImage)

- [JSCAD](https://jscad.app/)
    - [github](https://github.com/jscad)    
    - [open jscad](https://openjscad.xyz/)
    - [CADit.app](https://cadit.app/)
    - [A jscad UI playground developed here and meant to be later contributed into jscad](https://github.com/hrgdavor/jscadui)

- [极简的图标搜索网站,可打包字体或下载svg格式](github.com/antfu-collective/icones)

## [组件开发]()

- [表情拾取组件A lightweight emoji picker, distributed as a web component.](https://github.com/nolanlawson/emoji-picker-element)
- [一个纯JS实现的框架](https://nolanlawson.com/2023/12/02/lets-learn-how-modern-javascript-frameworks-work-by-building-one/)

## Test

**TDD**

测试驱动开发， 在开发功能代码之前，先编写单元测试用例代码，确定需要编写的代码逻辑。TDD是XP(Extreme Programming)的核心实践

**BDD**

行为驱动开发， 

“开发软件系统最困难的部分就是准确说明开发什么” (“The hardest single part of building a software system is deciding precisely what to build” — No Silver Bullet, Fred Brooks)

BDD(Behavior Driven Development), 提出者 Dan North 强调 BDD 不是关于测试的，它是在应用程序存在之前，写出用例与期望，从而描述应用程序的行为，并且促使在项目中的人们彼此互相沟通

测试相关的配置

vue创建工程时，有一个[Manually select features](https://lmiller1990.github.io/vue-testing-handbook/zh-CN/setting-up-for-tdd.html#%E5%AE%89%E8%A3%85-vue-cli)中可配置
- [BDD](https://insights.thoughtworks.cn/when-we-talk-about-bdd/)

### [Jasmine](https://github.com/jasmine/jasmine)

TDD(Test Driven Development)测试驱动开发的框架，

[Behavior-Driven JavaScript docs](https://jasmine.github.io/pages/docs_home.html)
[2.9](https://jasmine.github.io/2.9/introduction)

### Jest 

### Karma

npm install --save-dev karma karma-mocha karma-chrome-launcher karma-mocha-reporter karma-webpack mocha mocha-sinon sinon sinon-chai webpack karma-chai chai

运行
node .\node_modules\karma\bin\karma start
node .\node_modules\karma\bin\karma init 

- [karma.conf.js配置](https://karma-runner.github.io/5.2/config/configuration-file.html)
- [karma-coverage](https://github.com/karma-runner/karma-coverage)测试覆盖率

### [chai](https://github.com/chaijs/chai)

[document](https://www.chaijs.com/)
