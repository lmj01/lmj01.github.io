
# 获取图片信息
```javascript
let img = new Image();
img.onload = function() {
    w = this.width;
    h = this.height;
}
img.src = '/path/image/file'; 
```
这样获取的数据是对的，但对应竖着拍照和横着拍照的情况就没法区分，需要额外的信息
需要读取图像的元数据Exif.js就是这样一个库
