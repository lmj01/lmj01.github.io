# Http

## fetch

[HTTP-network-or-cache fetch](https://fetch.spec.whatwg.org/#http-network-or-cache-fetch)

cache mode的状态决定了浏览器的操作行为，这是httpRequest的参数决定了是否进行操作的逻辑

## header
Content-Disposition是MIME协议扩展，指示如何显示附加的文件

Content-Disposition:'attachment=filename;'。

Response.AppendHeader("Content-Disposition","attachment;filename=FileName.txt");
attachment会以附件方式下载
阿里云的OSS有一个政策就是对这个进行了控制，导致显示不能直接在浏览器中打开

## response
