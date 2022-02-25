# JS打包机制

## webpack
Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

参考cpl/js/webpack.js分析

```js
function (e,t,n) {

}
```
这是webpack api接收三个参数，chunkIds, moreModules, executeModules
第二个参数是module id，模块工厂映射，webpack默认行为会把module id转换为数字。
[source code](https://github.com/webpack/webpack/blob/0dd0830478e5f5dd0e36930092e5ce6b6e6d3f39/lib/JsonpMainTemplatePlugin.js#L122)

## 关注点

Tree-shaking的本质是消除无用的js代码。无用代码消除在广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE（dead code elimination）。Tree-shaking 是 DCE 的一种新的实现，Javascript同传统的编程语言不同的是，javascript绝大多数情况需要通过网络进行加载，然后执行，加载的文件大小越小，整体执行时间更短，所以去除无用代码以减少文件体积，对javascript来说更有意义。Tree-shaking 和传统的 DCE的方法又不太一样，传统的DCE 消灭不可能执行的代码，而Tree-shaking 更关注宇消除没有用到的代码。下面详细介绍一下DCE和Tree-shaking。
