# Test 

“开发软件系统最困难的部分就是准确说明开发什么” (“The hardest single part of building a software system is deciding precisely what to build” — No Silver Bullet, Fred Brooks)

BDD(Behavior Driven Development), 提出者 Dan North 强调 BDD 不是关于测试的，它是在应用程序存在之前，写出用例与期望，从而描述应用程序的行为，并且促使在项目中的人们彼此互相沟通

测试相关的配置

vue创建工程时，有一个[Manually select features](https://lmiller1990.github.io/vue-testing-handbook/zh-CN/setting-up-for-tdd.html#%E5%AE%89%E8%A3%85-vue-cli)中可配置

## Vue Test Utils

the official unit testing utility library for Vue

组件对应的测试文件<Component Name>.spec.js


## Jest 


## Karma

npm install --save-dev karma karma-mocha karma-chrome-launcher karma-mocha-reporter karma-webpack mocha mocha-sinon sinon sinon-chai webpack karma-chai chai

运行
node .\node_modules\karma\bin\karma start
node .\node_modules\karma\bin\karma init 

- [karma.conf.js配置](https://karma-runner.github.io/5.2/config/configuration-file.html)
- [karma-coverage](https://github.com/karma-runner/karma-coverage)测试覆盖率

## webpack

需要打包vue组件
webpack karma-webpack 

使用bable处理ES6语法
babel-core babel-loader babel-preset-es2015

Vue-cli3开始把webpack.config.js隐藏在node_modules/@vue/cli-service/webpack.config.js 直接引用这个就可以了, **这一步很重要，否则webpack的配置很难处理**

## [Jasmine](https://github.com/jasmine/jasmine)

TDD(Test Driven Development)测试驱动开发的框架，

[Behavior-Driven JavaScript docs](https://jasmine.github.io/pages/docs_home.html)

[2.0 describe it and ...](https://jasmine.github.io/2.0/introduction.html)

[2.9](https://jasmine.github.io/2.9/introduction)


## [chai](https://github.com/chaijs/chai)

[document](https://www.chaijs.com/)


## 参考

- [BDD](https://insights.thoughtworks.cn/when-we-talk-about-bdd/)
- [vue unit test](https://vuejs.org/v2/cookbook/unit-testing-vue-components.html)