# tiff

## nodejs
```shell
npm install tiff.js
```

```js
fetch('static/test.tif').then(res=>res.arrayBuffer()).then(buffer=>{
    const tiff = new Tiff({buffer: xhr.response});
    const canvas = tiff.toCanvas();
    this.src = canvas.toDataURL();
})
// tiff.js默认只能转换小于10M的文件，超过10M的文件需要设置内存
Tiff.initialize({TOTAL_MEMORY :50 * 1024 * 1024});
// 超过40M的文件，建议按照插件并使用object标签展示
```



## 参考
- [TIFF image decoder written entirely in JavaScript.](https://github.com/image-js/tiff)
- [A small, fast and advanced TIFF / EXIF (+ DNG, CR2, NEF and other TIFF-ish files) decoder and encoder. It is the main TIFF library for Photopea image editor](https://github.com/photopea/UTIF.js)