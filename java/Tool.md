
# Develop Tools

## eclipse 
### JSHint：
1. 通过Install New Software，输入http://github.eclipsesource.com/jshint-eclipse/updates/ 然后选择安装JSHint Eclipse Integration就可以了。
2. 设置配置，
```js
{
  "boss":      true,
  "node":      true,
  "eqeqeq":    true,
  "strict":    true,
  "newcap":    false,
  "undef":     true,
  "unused":    true,
  "onecase":   true,
  "lastsemic": true,
  "es5" : 	   true,
  "esnext":    true    
}
```
3. 选中工程项目，选择属性，设置JSHint应用到当前工程


## Maven
- Failure to transfer org.apache.maven.plugins:这类错误是maven包出错,删除出现下载
- 工程文件路径发送变化，需要maven工程更新
- 如果工程不放在默认位置，导入的src文件需要设置一下buildpath,需要在src根目录设置