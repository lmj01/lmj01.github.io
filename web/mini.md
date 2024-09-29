# 小程序
> 国内的特定环境下的产物，基本都是以Webkit内核分支下的产物，
>> 小程序的宿主是App，App提供了浏览器的角色，云端放置一份小程序资源，下载到App内部，由App提供渲染。小程序使用两个线程分别处理视图层以WebView渲染，逻辑层以JsCore运行脚本

## 微信小程序框架

基于Web技术，但是与Html5是有差异的，最大的差异之一就是：浏览器中的UI和JavaScript逻辑都是在一个线程中执行的。而微信小程序使用双线程模型，一个线程专门负责渲染工作，称之为渲染层；另一个线程执行逻辑代码，称之逻辑层。这两个线程同时运行，通过微信客户端来交换数据。

逻辑层执行代码逻辑，通过setData发送到渲染层，JSON数据在小程序中是静态数据，这里容易产生性能问题，必须关注动态数据的更新

渲染层解析WXML和WXSS并渲染出页面。
[小程序没有 DOM 接口，原因,涉及小程序架构框架思路](https://developers.weixin.qq.com/community/develop/article/doc/000462336ccf080229a9eb37c59413)

- wxml是动态绑定数据，就是先有数据再绑定，比html5要慢一个过程，这也是小程序嵌入的逻辑问题

### 同层渲染
- [小程序同层渲染原理剖析](https://developers.weixin.qq.com/community/develop/article/doc/000c4e433707c072c1793e56f5c813)

部分组件没有使用WebView渲染，而是由客户端原生渲染，所谓的native-component。这种就是多个图层叠加出最后的效果，由客户端不同实现也可能不同。

[native-component](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)能提供一些html5不能实现的功能，对用户的体验流畅度非常好，如音频视频等，还减少进程间通信开销。

### [wxss](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。

### [Image](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)
为了性能，小程序默认死Image的宽高


### Skyline
新增的一个Skyline渲染引擎

### 扫码关注
- 先获取一个tick数据，是str
- 轮询去检查这个str对应的图像被扫码不
    - 扫码，返回openid，属于关注成功
    - 为得到openid，重复轮询check

## 支付宝小程序

## 文档参考

- [关于小程序隐私，2023-9-15之后必须主动弹窗获取](https://developers.weixin.qq.com/community/develop/doc/00042e3ef54940ce8520e38db61801)

- [weui官方文档，可支持扩展原生支持](https://wechat-miniprogram.github.io/weui/docs/#weui%E7%BB%84%E4%BB%B6%E5%BA%93%E7%AE%80%E4%BB%8B)
- [TDesign文档](https://tdesign.tencent.com/)
- [微信的FormData对象](https://github.com/lmj01/wx-formdata)
- [小程序canvas 缩放/拖动/还原/封装和实例--开箱即用](https://blog.csdn.net/iamlujingtao/article/details/128289849)
- [优秀实践教程推荐](https://github.com/TencentCloudBase/Good-practice-tutorial-recommended)

- [官方的小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&volumn=1&lang=zh_CN&book=miniprogram&docid=0008aeea9a8978ab0086a685851c0a)
- [微信小程序开发教程手册文档](https://www.w3cschool.cn/weixinapp/9wou1q8j.html)

