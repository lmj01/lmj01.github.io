
# bootstrap

[documents](https://getbootstrap.com/docs/versions/)
[中文文档](https://www.bootcss.com/)
[bootstrap icons](https://icons.getbootstrap.com/)


## 隐藏

d-none
d-block
d-{sm,md,lg,xl}-none
d-{sm,md,lg,xl}-block

```pug
.d-none.d-md-block.d-xl-none // 除md和lg可显示，其他都隐藏
.d-block.d-md-none // sm和md可见，其他隐藏
```



从移动端的样式发展起来，[可参考使用](https://github.com/lmj01/masteralign-web.git)

## 源码解读

git clone https://github.com/twbs/bootstrap.git
npm install
npm run dist // 不要release，因doc生成要依赖大量其他的工具，很难配置

### variables

### breakpoints
bootstrap/scss/mixins/_breakpoints.scss

### data属性


## Vue

