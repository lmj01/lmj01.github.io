# Cache

## 表单缓存
```javascript
document.yourFormName.reset();
```

## 资源缓存

### 手动
对浏览器进行清除缓存

### meta方法
```html
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
<meta http-equiv="expires" content="0">
```

### 强制请求
资源文件后面添加一个随机参数，每次请求都不一样了，保证资源的最新
```html
<link rel='stylesheet' type='text/css' href='/css/file.css?t=222'>
<script src='/js/file.js?random=111'></script>
<div style='background:url(/path/resource/file.png?222'></div>
```