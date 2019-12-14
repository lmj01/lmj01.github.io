# Vue

## 注意
- 使用多个组件components时，data的层次较深，不能自动更新，需要设置. 尽量不通过props进行向下传递，而直接使用method进行设置 
```javascript
this.$refs.child.$forceUpdate();
```
- ss