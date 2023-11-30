# png

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
- [A small, fast and advanced PNG / APNG encoder and decoder](https://github.com/photopea/UPNG.js)
- [Photopea.com is a free online tool for editing raster and vector graphics with support for PSD, AI, and Sketch files](https://www.photopea.com/)
- [纹理工具A fast, tiny tool for working with compressed textures (DDS etc.)](https://github.com/photopea/UTEX.js/blob/master/UTEX.js)
- [upng online tool](http://upng.photopea.com/)