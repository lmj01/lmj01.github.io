# 微信
> 网页开发中，很多地方会用到微信，记录一下相关过程

## 扫码关注
- 先获取一个tick数据，是str
- 轮询去检查这个str对应的图像被扫码不
    - 扫码，返回openid，属于关注成功
    - 为得到openid，重复轮询check