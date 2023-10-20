# Quill

## dev

按照sharp
npm config get userconfig 获取配置信息
npm config edit 打开默认的配置文件
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"

## rollup打包
看不懂webpack的逻辑，直接增加rollup打包，思路就清晰了
npm install rollup --save-dev    
npm install @rollup/plugin-typescript --save-dev
npm install @rollup/plugin-image --save-dev
npm install @rollup/plugin-replace --save-dev
npm install @rollup/plugin-node-resolve --save-dev
npm install @rollup/plugin-commonjs --save-dev   
npm install rollup-plugin-postcss --save-dev
npm install rollup-plugin-rawsvg --save-dev

## [delta](https://github.com/quilljs/delta)
Delta 是用于描述富文本文档结构的内容与变更。由于其描述的通用性，quill.js 将其独立维护。它的数据结构是基于 JSON 格式的，方便服务间进行互解析

[An O(ND) Difference Algorithm and Its Variations](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.6927&rep=rep1&type=pdf)在[github上的实现](https://github.com/jhchen/fast-diff)

[Diff, Match and Patch library](https://neil.fraser.name/news/2007/10/09/)在[GitHub](https://github.com/google/diff-match-patch/)上的地址

## [parchment](https://github.com/quilljs/parchment)
Parchment is Quill's document model. It is a parallel tree structure to the DOM tree, and provides functionality useful for content editors, like Quill. A Parchment tree is made up of Blots, which mirror a DOM node counterpart. Blots can provide structure, formatting, and/or content. Attributors can also provide lightweight formatting information.

通过Parchment你可以自定义出Quill能够识别的内容和格式，或者添加全新的内容和格式。
[一个例子](https://kang-bing-kui.gitbook.io/quill/zhi-nan-guides/clonewithparchment)