# [node]()

## update

```js
npm install -g n 非window上使用n来管理
```

# [npm](https://docs.npmjs.com/)

```bat
node --harmony script.js --version --help
--harmony 传递给node参数的修饰
```

```javascript
npm init
vim index.js
node index.js
npm init -w ./packages/a // 创建子包
npm install libraryX --workspace packages/pA // 子工作区按照特定依赖
npm i libraryX -w packages/pA
```

包管理

```shell
npm install --registry=https://registry.npm.taobao.org 指定淘宝源的安装
npm install XXX 安装但不写入package.json
npm install XXX --save 安装且写入package.json中的dependencies
npm install XXX --save-dev 安装且写入package.json中的devDependencies
npm install xxx@a.b.c --save-dev // 安装指定版本
npm install update xxx --save-dev 指定升级某个包
npm install xxx@latest --save-dev 安装最新版本
npm install -ddd // 可以查看安装的细节
npm install relative-path // 把某个本地包安装进当前工程
npm lx xxx 查询依赖的库信息
```

npm已经发展几个版本了，npm5发布于2017年，增加了package-lock.json文件，它对应node_modules中目录文件层结构是对应的，是锁定依赖安装结构

清除node_modules目录的在非window的命令可参考

```shell
find . -name "node_modules" -print | xargs rm -rf
```

## 配置

### proxy

```shell
npm config get proxy
npm config get https-proxy
// 确定没有设置代理， 返回为null， 否则强制设置为null
npm config set proxy null
npm config set https-proxy null

npm config get registry
npm config delete registry

```


### cnpm
为解决国内网络环境的问题，需要使用稳定的网络源
[淘宝镜像](https://npm.taobao.org/)

```javascript
npm install -g mirror-config-china --registry=https://registry.npm.taobao.org
npm install -g cnpm --registry=https://registry.npm.taobao.org
ln -s xxx/cnpm /usr/bin/cnpm

```

### install failure

npm 有9层日志行为
silent, error, warn, notice, http, timing, info, verbose, silly

合并代码时，总是被他人的package.json与package-lock.json产生的冲突问题

源可能存在问题，如设置淘宝的源，就需要删除registry使用默认的

npm cache clean --force
npm config list
npm install -ddd 查看安装细节卡住哪里


# [pnpm](https://pnpm.io/)

```javascript
pnpm i // 按照依赖
pnpm add libName --save // 按照库
```

[配置Configuring](https://pnpm.io/configuring)
因为是portable版的vscode？就容易出错？
```js
pnpm // 回显用法
pnpm store status // 会出现问题，
pnpm store prune // 删除有问题的
pnpm i // 重新按照
```

# [Yarn is a package manager](https://yarnpkg.com/)
```js
yarn install
```

# 打包工具

## [Rollup](https://rollupjs.org/introduction/)

## [webpack](https://www.webpackjs.com/)
