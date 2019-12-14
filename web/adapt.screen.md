# 布局Layout

## 静态Static
所有元素的尺寸使用px作为单位
布局对于设计师和开发者来说最简单，但无兼容性，只能针对门户网站之类的

## 流式Liquid
尺寸使用百分比，整体布局不变，宽带使用%，高度使用px
屏幕太大或太小元素不能正常显示，结果非常不协调

css3的vw这种viewport percentage length，视口长度的百分比
```css
 div {
     width: 1vw; /*1%视窗宽度的1%*/
     height: 1vh; /*1%视窗高度的1%*/
 }
```

## 自适应Adaptive
为不同的屏幕分辨率定义不同的布局，即使用媒体查询Media Queries
```css
@media (min-width: 1024px) {
    font-size: 33px;
}
@media (min-width: 1920px) {    
}
@media (max-width: 1920px) {}
@media (max-width: 1024px) {}
```
注意顺序，min-width小的房子大的后面，max-width小的放在大的前面

定制性较好，但维护难度很麻烦

## 响应式Responsive
为不同的屏幕分辨率定义布局，每个布局中使用流式布局的理念
使用@media和Grid System结合处理

响应式页面的头部一般有类似代码
```html
<meta name="applicable-device" content="pc,mobile">
<meta http-equiv="Cache-Control" content="no-transform">
```

## 弹性
使用参考，让element相对于其他参数来进行自适应
大区域综合使用之前的各种布局方式

### em
em是相当父元素

### rem
rem, font size of the root element
rem 是根据root根节点font size大小来动态变化，1rem默认为16px
所有字体大小统一使用rem单位就无需考虑各种屏幕大小，但devicePixelRatio小于1时，就需要设置对应的缩放比例

### flex
CSS3引入的强大布局
flex container是display:flex，所有子element自动成为flex item。
flex container默认存在两根轴,水平主轴main axis,垂直的交叉轴cross axis.

#### flex-direction
四种，水平与竖直，正与反两个方向

#### flex-wrap
nowrap默认不换行
