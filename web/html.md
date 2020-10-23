
# [HTML](https://whatwg.org/)

> 文档[mozilla html doc](https://developer.mozilla.org/en-US/docs/Web/HTML),[HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5).

## tags

### img

[Intrinsic Sizes](https://www.w3.org/TR/css-sizing-3/#intrinsic-sizes)
图像质量很容易改变的地方。

### input

```html
<input onfocus=this.blur()> <!-- 这样代码内部可以修改，相比readonly -->
```

### script

```html
<script type="module" src="a.mjs">    
```
## 禁用
在tag中加入代码
```html
oncontextmenu="return false;" // 禁止鼠标右键
ondragstart="return false;" // 禁止鼠标拖动
onselectstart="return false;" // 文字禁止鼠标选中
onselect="documnet.selection.empty();" // 禁止复制
```

### DTD
DOCTYPE,文档类型说明Document Type Declaration,渲染模式有三种:**混杂模式**,不写DOCTYPE;**近似标准模式**;**标准模式**.`<!DOCTYPE html>`强制HTML5标准模式.\

### [WebComponent](https://www.w3.org/wiki/WebComponents/)
网页模块化开发，如CSS的import和JS的script type="module"以及HTML的 [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/)等相关的技术，让前端也可以开发大型复杂项目了。如BIM这类的。

#### [custom-element](http://w3c.github.io/webcomponents/spec/custom/)

自定义element

#### Virtual DOM
随着前端的逻辑越来越多，数据与模型之间的变化不需要刷新页面而是跟着数据改变而自动渲染变化的部分,演化史：直接操作DOM ==》 MVVM框架 ==》Virtual DOM.Virtual DOM就是在直接操作DOM与数据之间建立一层，数据变化影响到Virtual DOM上，Virtual DOM在利用diff差异的算法来更新真正需要更新的真实DOM的过程

- [Event Loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)
- [User prompts](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#user-prompts)


## TemplateEngine

模板的诞生就是为了将显示与数据分离，把数据替换为模板中的一些项，最终得到html文件就是模板引擎的工作。

拼接字符串，就是利用正则表达式识别模板的标识，并利用数据替换掉。

### pug

Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers. 

[pug](https://pugjs.org/api/getting-started.html)
[pug doc 中文](https://pugjs.org/zh-cn/api/getting-started.html)

[参考使用方法](https://github.com/lmj01/startbootstrap-grayscale)