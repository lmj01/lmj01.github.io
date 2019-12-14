# host

直接配置IP地址，因为域名容易被墙

## 清楚dns缓存
window： 
ipconfig /flushdns

sudo rcnscd restart


- 处理网速的问题：

    1. 获取网址IP

    2. ```c
       github.com
       github.global.ssl.fastly.net
       codeload.github.com
       ```

       使用[IPAddress](<https://www.ipaddress.com/>)查找对应的IP更新如下

       ```c
       192.30.253.112, 192.30.253.113   github.com
       151.101.185.194 github.global.ssl.fastly.net
       192.30.253.120, 192.30.253.121   codeload.github.com
       ```

    3. 刷新DNS，window下`ipconfig /flushdns`，Linux下`sudo /etc/init.d/networking restart`
