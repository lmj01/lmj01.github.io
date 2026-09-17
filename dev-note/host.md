# host

直接配置IP地址，因为域名容易被墙



<details>
<summary> DNS</summary>

```json
{
   "inside": {
      "223.5.5.5": "阿里云DNS",  // https://dns.alidns.com/dns-query
      "223.6.6.6": "阿里云DNS", 
      "119.29.29.29": "腾讯DNSPod" // https://doh.pub/dns-query
   },
   "internal": {
      "1.1.1.1": "Cloudflare", // https://cloudflare-dns.com/dns-query
      "1.0.0.1":"Cloudflare",
      "8.8.8.8":"GoogleDNS", // https://dns.google/dns-query
      "8.8.4.4":"GoogleDNS",
      "9.9.9.9":"Quad9" // https://dns.quad9.net/dns-query
   }
}
```


## 绕开DNS劫持

使用监控软件后，wsl中的网络会出现问题，需要在网卡那里设置下加密DNS，绕开DNS劫持

首选 DNS 223.5.5.5 DNS over HTTPS 模板 https://dns.alidns.com/dns-query
备选 DNS 1.1.1.1   DNS over HTTPS 模板 https://one.one.one.one/dns-query

wls中会提示 %UserProfile%/.wslconfig中的hostAddressLoopback=true删除

[在Windows上设置了加密dns但是未生效怎么办？](https://learn.microsoft.com/zh-cn/answers/questions/5660739/windows-dns#1)

```shell
# powershell以管理员的身份运行
Get-DnsClientDohServerAddress # 获取被 Windows 系统识别为支持的 DoH 服务器
# 添加自定义 DoH 服务器
Add-DnsClientDohServerAddress -ServerAddress "223.5.5.5" -DohTemplate "https://dns.alidns.com/dns-query" -AllowFallbackToUdp $False -AutoUpgrade $True
Add-DnsClientDohServerAddress -ServerAddress "223.6.6.6" -DohTemplate "https://dns.alidns.com/dns-query" -AllowFallbackToUdp $False -AutoUpgrade $True
# 
netsh dns add encryption server=你的DNS服务器IP dohtemplate=https://你的服务商/dns-query autoupgrade=yes udpfallback=no
```

## 缓存清除

```shell
# window： 
ipconfig /flushdns
# 
sudo rcnscd restart
# 

# 处理网速的问题：
#  1. 获取网址IP #  使用[IPAddress](<https://www.ipaddress.com/>)查找对应的IP更新如下
github.com
github.global.ssl.fastly.net
codeload.github.com

# 2. 改写host
192.30.253.112, 192.30.253.113   github.com
151.101.185.194 github.global.ssl.fastly.net
192.30.253.120, 192.30.253.121   codeload.github.com

# 刷新DNS，
# window下
ipconfig /flushdns

# Linux下
sudo /etc/init.d/networking restart

```

</details>
