# npm

```javascript
npm init
vim index.js 
node index.js
```

安装包

```shell
npm install xxx	// 安装默认
npm install xxx@a.b.c // 安装指定版本
```

## 常用命令

### proxy

```shell 
npm config get proxy 
npm config get https-proxy 
// 确定没有设置代理， 返回为null， 否则强制设置为null
npm config set proxy null 
npm config set https-proxy null 

```


## cnpm
为解决国内网络环境的问题，需要使用稳定的网络源
[淘宝镜像](https://npm.taobao.org/)

```javascript
npm install -g mirror-config-china --registry=https://registry.npm.taobao.org
npm install -g cnpm --registry=https://registry.npm.taobao.org
ln -s xxx/cnpm /usr/bin/cnpm
```

