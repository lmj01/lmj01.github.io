
# JavaScript

Blob-binary large object

***
## 不常用特性与新语法
### double exclamatioin mark
```javascript
bool = !!1; // bool true
bool = !!0; // bool is false
```
### double tilde

tilde的算法是

```javascript
~N=-(N+1);
~~N=-(-(N+1)+1)=N;
!~-1 = !-0 = !0= true;
if (!~arr.indexOf()) { // indexOf函数返回值-1
    // didn't find 
} else {
    // find it
}
```
在ES6中
```javascript
// ~~ is equal Math.trunc
~~"9";// 9
Math.trunc("9"); // 9
```

### format
```javascript
let v = 'str';
let str = `${str}--`
```

### optional Chaining
```javascript
a?.b  		// optional static property access
a == null ? undefined : a.b;
a?.[b]		// optional dynamic property access
a == null ? undefined : a[x];
a?.b()		// option function or method call
a == null ? undefined : a.b();
a?.()
a == null ? undefined : a();
```

***
## JavaScript
### this
任何一段代码都是有上下文的，解释这段代码就是在一个上下文中，而上下文对象是通过this变量来体现的，即this永远指向当前代码所处的对象中。
与静态OOP相比，静态OOP中的this就是对象本身，而Javascript中this是上下文，有可能不是对象本身。
### Data Types
> 一个数据对象是mutable还是immutable是非常重要的，涉及到内存的管理和数据的重复使用的问题，语义不清晰时会造成不可查的BUG存在. 对于函数式的编程就是不需要程序员去管理内存，而是让编程语言具有内在的默认属性去支持高级语言的抽象化。
>
> > 与C，C++中的变量的副作用相关的概念

#### Primitive
所有primitive都是不可变的值，它们是：Boolean, Null, Undefined, Number, String, Symbol
#### Object
对象中的Data Property是一个可配置的基本属性，如有 Writable, Enumerable, Configurable等
#### Function
函数构造器，返回一个函数对象，默认有个隐式参数数组arguments。还有一种更简单的形式**Arrow functions**:箭头函数比函数表达式更简洁,且没有自己的this,arguments,super或new.target. 用于匿名函数,如果C++中lambda函数用于匿名函数一样.
##### apply与call
每个函数都包含两个非继承的方法。功能相同，用法存在差异
- apply: 接收两个参数，一个是函数运行的作用域(this)，另一个是参数数组， xxFunc.apply(this,arguments)
- call:区别在于参数必须详细列举出来
```javascript
//Function.prototype.call;
//Function.prototype.apply;
this.foo(arg1,arg2,arg3) 
    = foo.apply(this,arguments) 
    = foo.call(this, arg1, arg2, arg3)
// 模拟call的实现逻辑
Function.prototype.call2 = function(context) {
    if (typeof context === 'object') {
        context = context || window;
    } else {
        context = Object.create(null);
    }
    var fn = +new Date() + '' + Math.random();
    context[fn] = this;
    var args = [];
    for (var i=1; i<arguments.length; i++) {
        args.push('arguments['+ i +']');
    }
    var result = eval('context[fn]('+ args +')');
    delete context[fn];
    return result;
}
```
它们真正的用处是能够扩充函数赖以运行的作用域
##### bind -- ES5
与apply和call相比，bind后不理解执行，而是返回函数对象
```javascript
setInterval(function(){
	// do something    
}.bind(this), 2000);
```
这是this对象中延迟2秒执行。这里this是不确定的，是需要上下文来确定谁调用
#### Promise

#### Module
> Module是解决了大型项目和模块化开发的基础, 在ES6之前,社区存在两种方案,一种是CommonJS适用于服务器端,一种是AMD,适用于浏览器端, 但是都是运行前加载的语法糖, ES6加入的Module改进了,使之可以在编译期进行额外的处理,如添加宏的语法功能,或类型检测, 从软件工程角度来看有如下几个角度：代码复用;功能代码松耦合;解决命名冲突;.代码可维护性;代码可阅读性.
1. IIFE立即执行表达式
2. 在JQuery时代,模块模式大量使用,痛点是严格限制加载的顺序
    `var utils = (function ($) {
        var $body = $("body"); 
        var _private = 0;
        var foo = function() {}
        return { foo: foo }
    })(jQuery);`
3. commJS,规定每个模块内部，module代表当前模块，这个模块是一个对象，有id,filename,loaded,parent,children,exports等属性，module.exports属性表示当前模块对外输出的接口, 特性有:
    1. 加载模块是同步的，
    2. 加载的是输出值的拷贝，即导入后的值不随原来值变化
    3. 是为NodeJS而建的一个标准
    4. 缓存已加载模块

4. UMD(Universal Module Definition),UMD规范的JS文件就是一个立即执行函数，通过检测JS环境判断是那种模块定义
5. ES6语言层面的模块化，编译时加载或静态加载，编译时就能确定模块依赖关系，输入和输出变量。特性：
    1. 加载时是引用，即原始值变了加载的值也跟着变化
    2. 动态加载，不需要缓存
    
***
## JS使用场景
### Fetch API
```javascript
// 这里遇到一个阿里云url文件下载的问题，其实类似的地方都可以使用这个来下载
fetch(url)
.then((res) => res.blob()) // 这里res是Body对象
.then((data) => {
	// blob data
    const blob = new Blob([data],{type:'appliaction/octet-stream'});
    const a = document.createElement('a');
    const href = window.URL.createObjectURL(blob);
    a.href = href;
    a.download = 'filename';
    a.click();
    window.URL.revokeObjectURL(href);
})
```

***

## 库,框架
- **[markdown-it](https://github.com/markdown-it/markdown-it)**:Markdown parser, done right. 100% CommonMark support, extensions, syntax plugins & high speed
- **[marked](https://github.com/markedjs/marked)**:A markdown parser and compiler. Built for speed.
- **[Flows](https://flow.org/en/)**: A static type checker for javascript, Vue中有使用到
- [PeerJS](https://peerjs.com/)PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API.
- [filepond](https://github.com/pqina/filepond) a flexible and fun javascript file upload library
- [Altered Qualia](https://alteredqualia.com/)一些webGL的高级demo
- [UglifyJS](https://github.com/mishoo/UglifyJS), 是一个js解释，最小化，压缩，美化的工具集。

***

### 特性
#### Source Map
js源文件转为生产文件后,调试非常麻烦,而对应的source map文件就是为了保留这个对应的文件,编译通过错误中的行列号定位错误的位置, 目前就chrome支持,Google的Closure编译器提供了支持生成map文件
#### Dynamic Type
Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types

***
## [jsbin](https://github.com/jsbin/jsbin)
### v4搭建
node版本需要是v7.x的，npm7 install成功后，修改配置文件
cp config.default.json config.local.json
编辑config.local.json把store中的adapter改成mysql，v4版本不支持sqlite
运行 npm7 run start就可以访问了
#### ss
### v5搭建的环境
1. mkdir meijie-jsbin 
2. cd meijie-jsbin && git init
3. git remote add origin https://github.com/lmj01/meijie-jsbin.git
4. git remote add upstream https://github.com/jsbin/jsbin.git
5. git fetch upstream
6. git merge upstream/feat/next-v5
7. git push --set-upstream origin master

每次更新时，注意要合并的是upstrea/feat/next-v5到当前的本地.目前这个版本在还没有安装成功，

