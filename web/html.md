
# [HTML](https://whatwg.org/)

>  [HTML Living Standard ](https://html.spec.whatwg.org/multipage/)

[mozilla html doc文档](https://developer.mozilla.org/en-US/docs/Web/HTML)


## tags

### meta

- [本文介绍如何在网页中插入元信息（比如作者、关键词、内容描述等等），便于计算机检索](https://www.thisdaysportion.com/posts/dublin-core-what-is-it-good-for/)

### img

[Intrinsic Sizes](https://www.w3.org/TR/css-sizing-3/#intrinsic-sizes)
图像质量很容易改变的地方。

### input

```html
<input onfocus=this.blur()> <!-- 这样代码内部可以修改，相比readonly -->
```

#### range

[Styling range input with CSS and JavaScript for better UX](https://nikitahl.com/style-range-input-css)

### form

在开发中form的提交表单很舒服,主要使用浏览器自带的属性required和disabled,但是使用时务必注意到使用button的submit提交时, 

- [Sending form data](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data)
    - [form action](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data#the_action_attribute), 如果没有指定url,会跳转到current page.    
    - vue框架中,默认第一次时会propagation到上级,因没有指明路径,router接管到指定的页面,这样产生了默认跳转的逻辑.

### script

```html
<script type="module" src="a.mjs">    
```

### HTML5 Data-attribute

HTML5具有扩展性的设计，数据与特定element相关联，不需要定义数据**data-\***属性允许在标准内于element存储额外的数据， **注意区别html的dataset属性**

### DTD
DOCTYPE,文档类型说明Document Type Declaration,渲染模式有三种:**混杂模式**,不写DOCTYPE;**近似标准模式**;**标准模式**.`<!DOCTYPE html>`强制HTML5标准模式.\

## [WebComponent](https://www.w3.org/wiki/WebComponents/)
网页模块化开发，如CSS的import和JS的script type="module"以及HTML的 [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/)等相关的技术，让前端也可以开发大型复杂项目了。如BIM这类的。

### [custom-element](http://w3c.github.io/webcomponents/spec/custom/)

自定义element

### Virtual DOM
随着前端的逻辑越来越多，数据与模型之间的变化不需要刷新页面而是跟着数据改变而自动渲染变化的部分,演化史：直接操作DOM ==》 MVVM框架 ==》Virtual DOM.Virtual DOM就是在直接操作DOM与数据之间建立一层，数据变化影响到Virtual DOM上，Virtual DOM在利用diff差异的算法来更新真正需要更新的真实DOM的过程

- [Event Loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)
- [User prompts](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#user-prompts)



## 事件
在tag中加入代码
```js
// 禁用事件,就是更改全局函数
oncontextmenu="return false;" // 禁止鼠标右键
ondragstart="return false;" // 禁止鼠标拖动
onselectstart="return false;" // 文字禁止鼠标选中
onselect="documnet.selection.empty();" // 禁止复制
```

## 其他

### hover 
```html
<style>
.child {
	position: absolute;
	display:none;
	z-index: 5;
}
.parent {
	diplay:inline-block;
}
.parent:hover .child {
	display: block;
}
</style>
<div class="parent">
	<h1>hover on element</h1>
	<div class="child">
		<h2>other information</h2>
	</div>
</div>
```
悬浮打开与关闭某些元素，按照上面的样式就可以

```html
<style>
	.one {
		margin: 0 auto;
		width: 400px;
		height: 300px;
		background: #dedede;                
	}
	.two {
		margin: 0 auto;
		width: 100px;
		height: 100px;
		background: #5a5a5a;
	}
	.three {
		margin: 0 auto;
		width: 200px;
		height: 200px;
		background: #4d3e;
	}
	.four {
		margin: 0 auto;
		width: 300px;
		height: 100px;
		background: #723203;
	}
	.one :hover {
		background: lightcoral;
	}
</style>
<div class="one">
	<div class="two"></div>
	<div class="three"></div>
	<div class="four"></div>
</div>
```
注意，one的hover之间是否有空格，
有空格hover的范围是子元素
无空格hover的范围是父元素

:hover必须置于:link和:visited之后

一定不要混乱元素的层级，比如在child中的有比它高的样式，就会出现各种问题
如果测试一个简单的样式，很容易确认，可是一旦牵扯到多个样式，且多个样式挨着时，
问题就会出现各种问题！


## TemplateEngine

模板的诞生就是为了将显示与数据分离，把数据替换为模板中的一些项，最终得到html文件就是模板引擎的工作。

拼接字符串，就是利用正则表达式识别模板的标识，并利用数据替换掉。

### pug

Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers. 

[pug](https://pugjs.org/api/getting-started.html)
[pug doc 中文](https://pugjs.org/zh-cn/api/getting-started.html)

[参考使用方法](https://github.com/lmj01/startbootstrap-grayscale)