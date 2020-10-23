# Element UI

## 源码分析

在src/index.js中可以看到element-ui的逻辑，还是一个独立的组件，通过install可以安装所有的组件，也可以默认一个个组件的导入
每个组件也是一个独立的组件，通过提供了一些配套的色彩与事件来完成效果

## Loading

分两种，一种是指令方式；一种是服务方式，也可单独引入组件进行
以服务方式的对象是一个单实例singleton

如果引入全部的Element-UI，在Vue的prototype上有一个全局的
```javascript 
Vue.prototype.$loading,

import { Loading } from 'element-ui';
export default {
    methods: {
        method1() {
            this.$loading(options);
        }
    }
}
```

## 注意事项

### Message组件

消息组件相关的，如Message，Notification之类的，如果单独使用，会出现一个问题，就是组件本身的mounted事件发生时会默认执行一些
按照官方的说明来，要按照一个babel-plugin-component后再配置.babelrc文件

### Form组件

在form中使用select的下拉框选项时，最后一个总是无效

表单的缓存机制，产生了一个问题，第二次使用时产生问题


### 打包

定制element-ui库
修改全局变量后,来设置库

```bat
npm run build:theme // 生成带主题的theme-chalk库
```

