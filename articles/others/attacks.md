# Attacks

- [计时攻击，依据调用的时间差来攻击](../articles/time.attacks.md)
- [网站gzip炸弹,可以用来报复爬虫软件](http://da.dadaaierer.com/?p=577)
    1. 就是利用HTTP/1.1规定了使用GZIP压缩数据传输的技术，后台以GZIP格式压缩，浏览器主动解压缩GZIP，用户无感知
    2. 利用压缩技术，增加压缩比，比如全是1的数据，两百个1的压缩比高达95以上，捏造1G的数据，压缩比就达99%以上了。
    3. 炸弹发生时就是浏览器解压GZIP时，内存崩溃，如果担心一下子没有这么多内存，可以放置多个小文件，足够消耗爬虫机器。
- [Cross-site scripting (XSS)跨站脚本攻击](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting)
    1. 通过嵌入代码获取cookie等信息，可修改数据