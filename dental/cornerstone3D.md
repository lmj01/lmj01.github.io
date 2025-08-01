# [CornerstoneJS](https://www.cornerstonejs.org/)

- [DICOM](/cg/dental/dicom.md)

## dev
```js
yarn install
yarn run example tutorialName
yarn run serve-static-examples
```

- [3D Volume Rendering](https://www.cornerstonejs.org/live-examples/volumeviewport3d)
- [社区讨论](https://community.ohif.org/)

## 概念

- [ImageId](https://www.cornerstonejs.org/docs/concepts/cornerstone-core/imageId), 一个URL对象，用来标识唯一性, <scheme name>:<hierarchical part>[?<query>][#<fragment>], 其中scheme name(就是image loader)，后面部分有image loader内部决定。这样就区分唯一性了。
    - DICOM Persistent Objects (WADO) is a standard for storing and retrieving medical images using the DICOM protocol
    - url scheme决定某个ImageLoader插件真实的加载图像，Cornerstone3D委托注册的ImageLoader去加载，这样Cornerstone3D就可以同时显示多张图像，来自不同服务上的各种协议

- volume,是三个

### viewport
在packages\core\src\RenderingEngine\index.ts可以看到目前支持的viewport类型有
- StackViewport 2D栈视图, 呈现一堆图像
- VolumeViewport 体视图, 实现多平面重组或重建MPR，体积可视化;可用于两个series之间的图像融合
- VolumeViewport3D 3D视图, 实际的三体立体数据渲染, 如骨、软组织、肺等

### 同步器
CrosshairsTool需要同步器，


### transferFunction

### Annotation

### volume

geometryId概念
- 在packages/core/src/loaders/geometryLoader.ts中
```ts
export function createAndCacheGeometry()
```

## 文档
- [一文(10图)了解Cornerstone3D核心概念(万字总结附导图) ](https://juejin.cn/post/7326432875955798027)
- [Cornerstone3D 概念解析](https://gitcode.com/jianyaoo/vue-cornerstone-demo/overview)

### [OHIF Medical Imaging Viewer](https://github.com/lmj01/Viewers)

### DICOM
关于处理DICOM的部分，分了三部分
- DICOM RT(Radiation Therapy)，是DICOM3.0的标准扩展，专门用于放射治疗
- DICOM Seg(Segmentation), 涉及图像分割，是一种将医学影像中的特定结构、感兴趣区域与周围组织分离的过程
- DICOM SR(Structured Reporting), 是DICOM标准的一部分，

### 例子

- [3D Volume Rendering](https://www.cornerstonejs.org/live-examples/volumeviewport3d)