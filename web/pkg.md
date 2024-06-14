# [node](https://nodejs.org/en)

- [api doc](https://nodejs.org/docs/latest/api/)

```js
node --watch index.js // v18.15.0后增加的，可以不用每次都输入，直接关联某个文件的变化
node --harmony script.js --version --help --harmony 传递给node参数的修饰
node -p // node REPL 交互环境
```

## 包管理

### [npm](https://docs.npmjs.com/)

[npm-config](https://docs.npmjs.com/cli/v10/commands/npm-config)

```shell
npm init // 初始化工程
npm init -w ./packages/a // 创建子包
npm install libraryX --workspace packages/pA // 子工作区按照特定依赖
npm install libraryX --save-dev --workspaces // 安装
npm i libraryX -w packages/pA
npm install XXX 安装但不写入package.json
npm install XXX --save 安装且写入package.json中的dependencies
npm install XXX --save-dev 安装且写入package.json中的devDependencies
npm install xxx@a.b.c --save-dev // 安装指定版本
npm install update xxx --save-dev 指定升级某个包
npm install xxx@latest --save-dev 安装最新版本
npm install -ddd // 可以查看安装的细节， 查看安装细节卡住哪里
npm install relative-path // 把某个本地包安装进当前工程
npm lx xxx 查询依赖的库信息
// proxy代理设置
npm config get proxy
npm config get https-proxy
// 确定没有设置代理， 返回为null， 否则强制设置为null
npm config set proxy null
npm config set https-proxy null
// 镜像设置
npm config get registry // 获取
npm config delete registry // 删除注册表
npm config set registry https://registry.npmmirror.com // 使用镜像源
npm config set registry https://registry.npmjs.org // 官方源
npm install -g mirror-config-china --registry=https://registry.npm.taobao.org
npm install --registry=https://registry.npm.taobao.org 指定淘宝源的安装
// 清理
npm config get cache // 缓存路径
npm cache clean --force
npm config list
```
#### 2024-6-7
```json
"script":{
    "dev": "cross-env VITE_APP_VERSION=$(node -p \"require('./package.json').version\") vite --mode localdev",
}
```
在sprintRay的一个AICAD中，通过这样来获取环境变量，其实

### [pnpm](https://pnpm.io/)

- [中文文档](https://pnpm.io/zh/motivation)

```shell
pnpm i // 安装依赖
pnpm add libName --save // 按照库
pnpm store status // 会出现问题，
pnpm store path // 缓存路径
pnpm store prune // 删除缓存
// 工作区
pnpm add react -w // 全局公共依赖
pnpm add react --filter pkg1 // 指定项目按照
pnpm config set store-dir e:\dev-data\.pnpm-store\v3 --global // 设置存储目录
```

### [Yarn is a package manager](https://yarnpkg.com/)

- [yarn add](https://classic.yarnpkg.com/en/docs/cli/add)

```shell
yarn install
yarn install --registry https://registry.npm.taobao.org
yarn install --force // 强制按照
// 清除缓存
yarn cache dir  // 查看路径
yarn cache clean // 清理
yarn config set cache-folder e:\dev-data\.yarn-store\v6 // 设置缓存路径
// 镜像设置
yarn config get registry
yarn config set registry https://registry.npmmirror.com
yarn config set registry https://registry.yarnpkg.com
yarn config delete registry
// 安装库时指定镜像位置
yarn add libraryName -W --registry https://registry.npm.taobao.org
```

## 打包工具

### [Rollup](https://rollupjs.org/introduction/)
Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

### [webpack](https://www.webpackjs.com/)
需要打包vue组件
webpack karma-webpack 

使用bable处理ES6语法
babel-core babel-loader babel-preset-es2015

Vue-cli3开始把webpack.config.js隐藏在node_modules/@vue/cli-service/webpack.config.js 直接引用这个就可以了, **这一步很重要，否则webpack的配置很难处理**


### [Parcel](https://parceljs.org/docs/)

Parcel is a zero configuration build tool for the web
Parcel默认把所有文件打包进js包中，不存在单独的静态文件目录，需要借助插件来完成[parcel-reporter-static-files-copy](https://www.npmjs.com/package/parcel-reporter-static-files-copy)

### [Lerna](https://lerna.js.org/)

Lerna is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.

[github](https://github.com/lerna/lerna)

## 相关库

### [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

[windows安装nvm的两种方式](https://www.jianshu.com/p/1d80cf35abd2)参考了noinstall的方式，还是会报错
执行nvm root f:/dev/nvm就可以安装了
- 右键以管理员的身份运行install.cmd, 会提示设置目录
- NVM_HOME， NVM_SYMLINK，PATH:%NVM_HOME%;%NVM_SYMLINK% 环境变量的设置

### sharp
```shell
yarn config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
yarn config set sharp_libvips_host "https://npm.taobao.org/mirrors/sharp-libvips"
```

### [Husky](https://typicode.github.io/husky/)

它可以在项目中植入你设定的 git hooks，在 git 提交代码的前后，你预设的 git hooks 可以得到执行，以对代码、文件等进行预设的检查，
一旦检查不通过，就可以阻止当前的代码提交，避免了不规范的代码和 git 提交出现在项目中

[github](https://github.com/typicode/husky)

用来提交是可以编译，这样部署上去的代码才不能编译报错！
```shell
# 安装
pnpm add --save-dev husky # 安装
pnpm exec husky init # 配置

# 脚本1
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
# 分支名字
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
echo $current_branch

exec < /dev/tty
# 测试能编译否
pnpm test-build
# 正常退出
exit 0
```
