# JavaScript 

这里记录工程化相关的东西

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