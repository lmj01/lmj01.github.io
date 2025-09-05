
# web

## API

### OPFS文件系统

- [Web 文件系统（OPFS 及工具）介绍](https://hughfenghen.github.io/posts/2024/03/14/web-storage-and-opfs/)

## 认证机制


目前可参考的方案

- session与数据库配合
    - 很多框架使用的方案,比较老旧，前后端未分离前的主流方案
    - 利用cookie存储与后端的session，需要每次做判断
- token
    - 有点类似客户端的心跳包一样，登录后给信任权，自由度更高
    - token在后台可不存储，只需判断是否过期或被篡改否
    ![preflight request](../dia/token.png)

### 跨域隔离(Cross Origin Isolation)

```html
<script src="a.js" crossorigin></script>
<!--  -->
<!-- cross-origin-resource-policy:cross-origin -->
```
// 使用*允许所有域名，或者只允许你需要的域名，只能写一个域名，不能有通配符，如有多个域名可通过脚本控制返回
Access-Control-Allow-Origin:https://www.example.com

### [An Illustrated Guide to OAuth解释OAuth为什么这样实现](https://www.ducktyped.org/p/an-illustrated-guide-to-oauth)
- Twitter wanted a way to allow third-party apps to post twets on users's behalf.才引入这个概念


## SPA

single page application单页面应用， 动态重写页面与用户交互，不需要重新加载整个页面，实现前后端分离，后端处理数据提供接口，页面逻辑与渲染留给前端处理。

选择何种架构，还与SEO(Search Engine Optimization)搜索引擎优化有关，SEO只与识别HTML中的内容，这就是产生很多页面的原因了。

- SSR，Server Side Render，服务端生成DOM树后返回给前端
- CSR，Client Side Render，渲染过程全部由浏览器进行处理，服务器不参与任何渲染，如Vue框架
- Prerender，预渲染，打包阶段就预先渲染页面，如Angular框架 

### SSR
大致流程
1. 浏览器请求HTTP-GET(url) => 服务器进行路由分析与渲染，返回HTML首屏
2. 浏览器请求HTTP-GET的bundle.js资源 => 服务器返回bundle.js
3. 浏览器进行路由分析，生成DOM => diff & patch DOM and bind event => 更新渲染

### CSR
大致流程
1. 浏览器请求HTTP-GET(url) => 服务器返回HTML模板
2. 浏览器根据模板中的bundle.js资源 HTTP-GET => 服务器返回bundle.js资源
3. 浏览器执行路由分析与渲染，得到首屏

### Prerender
大致流程
1. 浏览器请求HTTP-GET(url) => 服务器返回预渲染的HTML
2. 浏览器请求HTTP-GET的bundle.js资源 => 更新渲染

## 记住密码

做网站时会碰到要实现记住密码，下次自动登录，一周内免登录等这种需求，一般都是通过cookie来实现的。用户成功登录后，存储一个实现自动登录的cookie数据到数据库，作为下次登录时验证使用，验证通过就自动登录，否则需要输入用户名和密码进行登录。
