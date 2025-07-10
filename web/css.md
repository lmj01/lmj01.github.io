# CSS-Cascading Style Sheets


## Web-CSS-Standard

### meta
```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```
bootstrap-vue上看到的，让网页宽度自动适应手机屏幕

### 布局

- [参考1](https://www.jianshu.com/p/5c6f761ff769)

- 标准文档流
- 浮动布局
- 定位布局

**absolute**
如果没有指定top,right,bottom,left等参数,它的位置关系是relative to its closest positioned ancestor(if any) or to the initial containing block.

这样可以实现dropdown的样式,

### Visual formatting model
it is an algorithm that processes a document and display it on visual media.
it transforms each element of the document and generates zero, one, or several boxes that conform to the **box model**


### flex

轴
- 主轴main axis
- 交叉轴cross axis

容器,父容器可以统一设置子容器的排列方式，子容器可以单独设置自身的排列方式，如果两者同时设置，以子容器的设置为准。
- 父容器container
    - justify-content
        - 位置排列 flex-start flex-end center
        - 分步排列 space-between space-around 
- 子容器item
    - align-items
        - 位置排列 flex-start flex-end center
        - 基线排列 baseline
        - 拉伸排列 stretch

```scss
.father {
    display: flex;
    flex-flow: row nowrap;
    .son1 {}
    .son2 {
        flex-grow: 1; // 占满最后一个
    }
}
```
- flex-grow, 设置剩余的占满的
### effect

#### scroll

如果要是scroll起作用，一定是在子元素设置min-width,这样就会超出父元素，在父元素设置overflow-auto就可以有滚动条了。
是子元素冒出父元素，不是父元素使用子元素

#### li 
横向摆放，使用float-left模式来处理

#### Cascading order - specificity
[CSS2-Cascading order](https://www.w3.org/TR/CSS21/cascade.html#specificity)
[css-cascade-4](https://drafts.csswg.org/css-cascade-4/#important)
[CSS Specificity And Inheritance](https://www.smashingmagazine.com/2010/04/css-specificity-and-inheritance/)关于CSS的权重问题，这个概念很复杂
注意selector尽量以 style-inline > id-select > class-selector > type-selector为思路， 重叠的selector是从上往下的，即最下面的效果是最终的，与html中的顺序无关, 但是可以使用!important来提高优先级。

```css
class1 {
    color: black;
}
class3 {
    color: red;
}
class2 {
    color: green !important;
}
<element class="class1 class2 class3">
```
结果是class2 > class3 > class1。

#### stacking context & z-index

上下文的堆栈顺序决定了最后显示的效果


### selectors选择器

#### combinators
组合器是用来解释选择器之间的关系, 在两个简单选择器之间插入一个组合器.
1. Adjacent Sibling:相邻,必须有相同的父元素,且必须是相邻的两个元素, 如`h2 + p`,所有跟着h2的p.
2. General Sibling:一般同级,有相同的父元素, 如`p ~ span`,匹配所有跟着p的元素
3. Child:孩子,如`div > p`div中第一级的p,对比后代的区别.
4. Descendant:后代,如`div p`div中所有的p

#### pseudo classes & elements
如`a:visited`匹配所有已经被访问的a的tag element `p::first-line`匹配所有p的第一行

#### box-model

浏览器的render engine渲染引擎把element当成一个长方形,css决定这些长方形的大小,位置和属性. 如果只有默认样式,element是在普通流中占一个位置,而位置所占大小由长方形模型来决定. 每个长方形模型是受如图中所描述的边距影响的.
![css-box-model](./images/css-box-model.png)
box-model分为两类:块状block和行内inline,两种的区别:

1. block可以设置width,height,而inline设置无效
2. block独占一行,除非修改了element的样式,而inline只会在一行内显示
3. block的width默认100%,而inline是根据element内容及element-child来决定
[box-sizing关于box-model的演化](https://css-tricks.com/box-sizing/)

##### position

1. **Normal Document Flow普通流**,指的是HTML代码的位置从上往下决定了element的位置;
2. **relative相对定位**指element相对于**普通流**做了偏移;如果z-index不是auto,则产生新的**stacking context**
3. **absolute绝对定位**,从**普通流**中移除,由距离它最近的**ancestor element**相对定位, 如果z-index不是auto,则产生新的**stacking context**
4. **fixed固定定位**,从**普通流**中移除,由**screen viewport视窗口**相对定位,不受滚动影响.总是产生新的**stacking context**
5. **float浮动**,从**普通流**中移除,特点:
    1. 只有横向浮动,不能纵向浮动
    2. 其parent-element得不高度
    3. element的display更改为block
    4. 浮动的前一个element不受影响,后一个element会围绕,如典型的文字围绕图片

#### break word

1. **word-break**: 允许单词在任何地方被打破(强行折断换行),本质上,break-all是将非CJK当作CJK文字处理, keep-all是反向的,将CJK当作非CJK.
2. **line-break**: The line-break CSS property is used to specify how (or if) to break lines when working with punctuation and symbols. This only affects text in Chinese, Japanese, or Korean (CJK)

#### @media

语法
```css
@media mediatype and|not|only (media feature) {
    css-code;
}
<link rel="stylesheet" media=mediatype and|not|only (media feature)" href="customcss.css">
```
```js
// 通过css的media样式来判断当前的js页面是否属于某种情况，CSS-JS交互的接口
const tabletMedia = window.matchMedia(StylesheetVariables.tabletMedia).matches
```


### pseudo-classes
- host, selects shadow root host用于阴影DOM限定范围的

### transform

视觉格式模型[visual formatting model](https://www.w3.org/TR/CSS22/visuren.html)

#### matrix
```javascript
// Cartesian Homogeneous Coordinate
// CaC  HC on RP^2 		CaC on R^3 		HC on RP^3
// a c  a c tx          a b tx			a c 0 tx
// b d  b d ty		    b d ty			b d 0 ty
//      0 0 1			0 0 1			0 0 1 0
//      [a b c d tx ty]					0 0 0 1

```

CSS Generator - Matrix Transform
CSS Transform property allows to scale, rotate, skew and move HTML elements.

1) Scale - resize elements(small or bigger)
2) Rotate - by angle about the origin
3) Skew - transformation along the X or Y axis
4) Translate - move element in XY direction

linear transformations also can be represented by Matrix function. It combine multiple transform properties into single matrix function. Thanks to this wikipedia image which makes clear everything about matrix transformation.

![](../images/css-matrix.svg)

### API 

- clip-path 裁剪不规则形状

```css
div {
    clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 0% 0%;);
}
```
- [css实现不规则](https://juejin.cn/post/7081595150661025829)

- [CSS Painting API]
    - [clip-path](https://juejin.cn/post/7171609307253833764)

### variable

- 优先级， :root第一，dark or light mode第二，容易出现白屏就是因为:root有默认值是light模式

```css
:root {
    --main-color: pink;
}
div {
    background-color: var(--main-color, red);
}
@media (prefers-color-scheme: dark) {
}
@media (prefers-color-scheme: light) {
}
```


### Color颜色

渐变色，linear-gradient创建一个对象gradient，是一种特别的image，就像使用canvas直接生成一个色条一样，不能使用到color对象上

```css
border-image: linear-gradient(90deg, #B3ADD3 0%, #96BED7 21%, #EB9582 41%, #C3C68C 62%, #FAACAC 81%, #FED09F 99%) 1;
/*  */
input[type="ckeckbox"],
input[type="radio"],
input[type="range"],
progress {
    accent-color: 'auto';
}
```
- [Accent强调](https://developer.mozilla.org/en-US/docs/Glossary/Accent)强调属性，固有的值也可以修改
    - [accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)可以更改input和progress的默认颜色


### Sprite

也称雪碧图，是一种图像合成技术，使用时截取一部分。这种技术减少了请求资源与避免
```css
background-image: url('sprite.png');
background-position: 60px 60px;
width: 48px;
height: 48px;
```

## Tools

### WebAIM:web accessibility in mind
- [Color Contrust Check](https://webaim.org/resources/contrastchecker/) 

### BEM 
Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development.是由Yandex团队提出的一种CSS Class的命名方法

### 高难度

- [CSS实现的机械装置， 作者有一系列的创作](https://cohost.org/blackle/post/42994-div-style-pointer)


## [Sass](https://www.sasscss.com/)

Syntactically Awesome StyleSheets
语法格式有两类

- SCSS，Sassy CSS，仅在CSS3基础上扩展，文件后缀为.scss
- Sass，Indented Sass，使用“缩进”代替“花括号”，用“换行”代替“分号”，文件名后缀为.sass

[scss doc](https://www.sasscss.com/documentation)

[参考使用方法](https://github.com/lmj01/startbootstrap-grayscale)

[boots-watch](https://bootswatch.com/)的demo展示了主体样式切换的原理，就是css文件的替换后自动刷新。它利用了scss预处理技术，把bootstrap中的变量进行了替换，和一些基本样式的更改，

```scss
$top-height: 60px;
div {
    height: calc(100% - #{$top-height});
    @media (max-width: 1200px) {
        height: 100%;
    }
}
@media screen and (orientation: landscape) {
    @media screen and (max-width: 520px) {

    }
}
```
- [循环测试](https://sass-lang.com/playground/#eJyFUttuwjAMfe9XeKVTKGoGZS2M9oU97wP2nEFKI/WmkKlMKP8+N70yJhHJOk58ObZj33dqcVTpB/+JIPTAX6EgrhFfG0E9QAwQQ5QN6hvELeJbI6jvEHdhDNaes0MKjgBRwJAWrhbAS01nV0foRgcwpqhxXIBfXeBJ5FUpFStUjHZtactaLsE5ZOx8ppXkibhEUNO4ed0npQSngESWOfigUll+n1JYB8iDZqRCommkxnuhe+tAPneK5TpwF/5q9XxTgHHTDWAZpg4T8S4lBrXWuZ2L4rN5taNwu6kuHtgZ++KZHRFRsSNxvXvH7WZ341gwKcuaVofO2zXUTlv0lA3TEBNEInIoM+IBOaufjJPIFNZzTd3KJDlzRSeuOZMnUdCMJ2pK1/+Y4vn4aUjej2uf86NgMMc2aDe42TVnFT1xNTdhHulbJK52xzF3mdt2TO6hs9EJ/n7yJHn75HU9uZreEQ+WeMz3cD3a82hJ2vNPNe04XX27QPE0To+XQdXTtfoF1vbwVQ==)

### vue 
当scoped设置后，会为DOM设置唯一属性如data-v-12345,这样修改就不会起作用，必须通过深度作用选择器来穿透它。
```vue
<style scoped>
::v-deep .cls-name {

}
.deep(.cls-name) {

}
</style>
```

### playground

- [sass](https://sass-lang.com/playground/)
- [sass meister](https://www.sassmeister.com/)

## [Stylus](https://github.com/stylus/stylus/)

Expressive, robust, feature-rich CSS language built for nodejs。vue官方使用它。


## 参考

- [css 3d transforms](https://polypane.app/css-3d-transform-examples/)
