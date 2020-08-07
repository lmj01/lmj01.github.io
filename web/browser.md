# Browser

## 认证与登录

CAS(Central Authentication Service)旨在为Web应用系统提供一种可靠的单点登录解决方法，属于Web SSO

SSO(Single Sign-On)是服务于企业业务整合的解决方案之一，SSO使得多个应用系统中，用户只需要登录一次，
就可以访问所有互相信任的应用系统。

## 缓存

浏览器会保存页面的特定的资源在硬盘上，

- images：picture，background，logos
- css
- html
- javascript


## Chrome

[Chrome Devtools](https://developers.google.com/web/tools/chrome-devtools/open)

### waterfall
在console的Network中，waterfall可以直观来分析web页面加载的体验
1. 减少资源加载时间，瀑布图的宽度越窄越快
2. 减少请求数量，瀑布图高度越矮越好
3. 优化资源请求顺序，绿色部分是开始渲染页面

### network 

默认调整页面后，console会被清空，勾选**Preserve log**就可以保留

Online可以设置网速

![network throttling](./images/chrome-network-throttling.png)


# 参考

- [CAS实现SSO](http://www.coin163.com/java/cas/cas.html)
