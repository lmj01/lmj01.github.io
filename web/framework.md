# framework

协同开发时，package-lock.json文件不用上传

记录NodeJS有关的问题记录：

## Webpack

### WDS

WDS是webpack-dev-server的意思,用来自动刷新
可以看到在local storage中有一个值
loglevel:webpack-dev-server --> SILENT

控制台报错: [WDS] Disconnected!

是因为电脑设置了全局代理,把host:'0.0.0.0'改成'127.0.0.1'即可.


## axios

使用axios向后端发送数据时，如果是Date类型时，参数会自动转换时区。
从东8区中国北京时间自动转换为0时区格林威治。

解决办法是使用moment组件，在传输参数前进行格式化处理。
npm install --save moment

const outDate = moment(inDate).format('YYYY--MM-DD HH:mm:ss');
