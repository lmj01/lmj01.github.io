# DevTools

浏览器的开发工具

遍历一个对象
```javascript
let visit = (o)=>{for(let it in o) {console.log(it, o[it]); if(typeof o[it]=='object') visit(o[it]);}}
```