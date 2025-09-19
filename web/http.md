# Http

## fetch

[HTTP-network-or-cache fetch](https://fetch.spec.whatwg.org/#http-network-or-cache-fetch)

cache mode的状态决定了浏览器的操作行为，这是httpRequest的参数决定了是否进行操作的逻辑

## header

### [Content-Disposition]()

Content-Disposition是MIME协议扩展，指示如何显示附加的文件

Content-Disposition:'attachment=filename;'。

Response.AppendHeader("Content-Disposition","attachment;filename=FileName.txt");
attachment会以附件方式下载
阿里云的OSS有一个政策就是对这个进行了控制，导致显示不能直接在浏览器中打开

### [Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)

用于控制浏览器在发生跳转请求时，将当前页面的URL信息如何包含在Referrer首部字段中，

- Referrer是 HTTP 请求的一个首部字段，它用于指示请求是从哪个页面跳转而来的。
- Referrer Policy是一种安全策略，允许网站控制浏览器在发送请求时，是否将当前页面的 URL 信息包含在 Referrer 首部中，以及如何包含。这有助于保护用户的隐私和提高安全性。

要设置 Referrer Policy，您需要在服务器端配置您的网站或应用程序的

### methods
- [optiosn](https://evertpot.com/discovering-features-with-http-options/)

## HTTPS

[A curated list of free courses & certifications](https://github.com/cloudcommunity/Free-Certifications)
[Create Your Secure Online Presence with Our Self-Certified HTTPS Certificate Generator ](https://github.com/selfcertificationhub/selfcertificationhub)
[自签名HTTPS证书生成器, 适用于产品发布前需要HTTPS验证的场景](https://selfcertificationhub.github.io/selfcertificationhub/generate)

### [mkcert](https://github.com/FiloSottile/mkcert)

使用Go写的一个工具，A simple zero-config tool to make locally trusted development certificates with any names you'd like.

自编译后使用工具，是学习的一个Go的案例
```shell
mkcert-v1.4.4-windows-amd64.exe -install
mkcert-v1.4.4-windows-amd64.exe -CAROOT
mkcert-v1.4.4-windows-amd64.exe localhost 127.0.0.1 ::1 192.168.0.138 // 生成自签证书
```

## [Media Types MIME](https://www.iana.org/assignments/media-types/media-types.xhtml)

- [common media types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types)
- [sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types#mime_sniffing)
- [各种文件类型及文件头标识大全（十六进制）](https://zhuanlan.zhihu.com/p/571208394)