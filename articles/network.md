# Network

网络

##





## DNS

谷歌全球通DNS
8.8.8.8
8.8.4.4

国内114
114.114.114.114
114.114.115.115

阿里云公共DNS
223.5.5.5
223.6.6.6

百度
180.76.76.76

## 反向代理

**NAT穿透**

PC一般都在路由器的内网当中，IP地址基本都是192.168.x.x,访问外网Google的时候如何处理呢？
设 PC的ip是192.168.0.100, 路由器LAN的ip是192.168.0.1， WAN的ip为211.22.145.234(运营商的公网IP)， Google的ip为74.125.204.101.

1. PC构建Http的packet请求,源ip为192.168.0.100:XXX,端口号XXX一般是随机生成的，目标ip为74.125.204.101:80(由Google.com查询DNS得到具体的ip值)
2. PC检查目标ip不在同一网段，数据包packet发给默认网关(192.168.0.1)
3. LAN收到数据包，构建NAT映射，随机生成端口YYY，即192.168.0.1:YYY -> 192.168.0.100:XXX
4. 路由器修改packet的源端口为YYY，源ip为WAN的ip(211.22.145.234), 这样数据包packet就由WAN的公网发送出去；如果WAN收到端口号为YYY的数据包，就会转换给内容LAN的192.168.0.1:YYY
5. Google服务器收到Http的packet，构建response的packet，地址信息是WAN(211.22.145.234:YYY)
6. 逆方向向WAN发生packet，直到PC收到response的Http。


### 软件

- FRP-Fast Reverse Proxy
    - [github](https://github.com/fatedier/frp)
- cpolar
- Ngrok
