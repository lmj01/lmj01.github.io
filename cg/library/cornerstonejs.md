# CornerstoneJS

## dev
```js
yarn install
yarn run example tutorialName
yarn run serve-static-examples
```

- [3D Volume Rendering](https://www.cornerstonejs.org/live-examples/volumeviewport3d)

## 概念

#### ImageId
就是一个url, url scheme决定某个ImageLoader插件真实的加载图像，Cornerstone3D委托注册的ImageLoader去加载，这样Cornerstone3D就可以同时显示多张图像，来自不同服务上的各种协议

![image id](../images/cg/ct/image-id-format.png)
