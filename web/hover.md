# hover

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
