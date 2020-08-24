# Jimp

JavaScript Image Manipulation Program

它的源码使用了workspace的概念，可以分析分析研究研究。 使用typescript，还已3.1为分界线，处理了两套接口，工程上非常值得研究分析一下， 这里讨论3.1以后的代码逻辑，3.1版的架构思路也非常清晰

```javascript
import configure from '@jimp/custom';

import types from '@jimp/types';
import plugins from '@jimp/plugins';

export default configure({
  types: [types],
  plugins: [plugins]
});
```
core/index.js中对方法进行了实现，把接口与实现耦合在一起

```javascript
class Jimp extends EventEmitter {

}
export function jimpEvMethod(methodName, evName, method) {
    Jimp.prototype[methodName] = function(...args) {}
    Jimp.prototype[methodName + 'Quiet'] = method;
}
```

比如扫描遍历每个像素的逻辑，通过utils/src/index.js中
经过混合后Jimp.prototype.scanQuiet函数了。

这里对typescript的使用让我产生了疑惑了，只是接口声明还是什么情况？typescript中的type推断是如何实现的，目前还没有看明白相关的逻辑，不过不影响使用了。

核心分两部分，type和plugin，type是支持的图像格式，plugin是每个独立的功能模块
全部的算法部分都是使用JavaScript实现的

## type

## plugin

### flip

通过遍历每个像素，映射一下位置关系，并没有做任何的其他计算

### rotate

分两种模式，一是中心旋转，并保存宽高；一是不改变宽高

### resize

提供了不同resize的不同插值算法

## utils

小工具

### scan
```javascript
export function scan(image, x, y, w, h, f) {
  // round input
  x = Math.round(x);
  y = Math.round(y);
  w = Math.round(w);
  h = Math.round(h);

  for (let _y = y; _y < y + h; _y++) {
    for (let _x = x; _x < x + w; _x++) {
      const idx = (image.bitmap.width * _y + _x) << 2;
      f.call(image, _x, _y, idx);
    }
  }

  return image;
}
```

## using

npm install --save jimp

