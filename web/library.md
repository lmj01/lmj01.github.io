# Quill
> quill富文本编辑器

## dev

安装sharp
npm config get userconfig 获取配置信息
npm config edit 打开默认的配置文件
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"

### rollup打包
看不懂webpack的逻辑，直接增加rollup打包，思路就清晰了
npm install rollup --save-dev
npm install @rollup/plugin-typescript --save-dev
npm install @rollup/plugin-image --save-dev
npm install @rollup/plugin-replace --save-dev
npm install @rollup/plugin-node-resolve --save-dev
npm install @rollup/plugin-commonjs --save-dev
npm install rollup-plugin-postcss --save-dev
npm install rollup-plugin-rawsvg --save-dev

- 2024-1, 作者发布新版2.0了，暂时不去私自编译了，可以直接使用npm包了。之前这样处理是因为作者有很长一个版本的锁定，没有正式发布，版本后不能切换到开放模式，自己打包提取核心功能以便工程需要。

## modules

### clipboard
复制剪切板

### image

内部的image的sanitize时，只支持http,https,data这三种模型，其他情况会赋值为'//:0'
比如拦截时，url需要临时设置成blob:http
```js
const image = Quill.import('formats/image');
image.sanitize = (url) => url;
```


## [delta](https://github.com/quilljs/delta)
Delta 是用于描述富文本文档结构的内容与变更。由于其描述的通用性，quill.js 将其独立维护。它的数据结构是基于 JSON 格式的，方便服务间进行互解析

[An O(ND) Difference Algorithm and Its Variations](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.6927&rep=rep1&type=pdf)在[github上的实现](https://github.com/jhchen/fast-diff)

[Diff, Match and Patch library](https://neil.fraser.name/news/2007/10/09/)在[GitHub](https://github.com/google/diff-match-patch/)上的地址

## [parchment](https://github.com/quilljs/parchment)
Parchment is Quill's document model. It is a parallel tree structure to the DOM tree, and provides functionality useful for content editors, like Quill. A Parchment tree is made up of Blots, which mirror a DOM node counterpart. Blots can provide structure, formatting, and/or content. Attributors can also provide lightweight formatting information.

通过Parchment你可以自定义出Quill能够识别的内容和格式，或者添加全新的内容和格式。
[一个例子](https://kang-bing-kui.gitbook.io/quill/zhi-nan-guides/clonewithparchment)

# [tinymce](https://www.tiny.cloud/docs/tinymce/latest/)
> 自己需要一个编辑器，用来编辑并保存为HTML5格式，且需要数学公式，就需要这个强大的编辑器

- [github项目](https://github.com/lmj01/tinymce)
- [mathjax插件](https://github.com/lmj01/tinymce-mathjax)

插件的写法可参考安装后的code插件来写。
modules\tinymce\src\core\main\ts\api\Options.ts

# jszip

```javascript
new Promise(()=>{

}).then(res=>{
    // 字符串
    if (res.byteLength < 100) {
        const tmp = JSON.parse(new TextDecoder().decode(new Uint8Array(res)));
    } else {
        const zip = new JSZip();
        zip.loadAsync(res).then(zip=>{
            let i = 0;
            for (const fname in zip.files) {
                zip.file(fname).async('arraybuffer').then(img=>{
                    const blob = new Blob([img]);
                    i++;
                    if (i == 4) {
                    }
                });
            }
        });
    }
})
```


# [node-gyp](https://github.com/nodejs/node-gyp)
node-gyp is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js. It contains a vendored copy of the gyp-next project that was previously used by the Chromium team and extended to support the development of Node.js native addons.

# 其他库

- [excel](/articles/notes/excel.md)