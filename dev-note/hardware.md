# 硬件

## 镭波（Rabook）品牌的“火蝙蝠”（Firebat）
- 英特尔第四代酷睿i7处理器
- GTX 970M (笔记本显卡)
    - 1344个流处理器，3GB显存

## Dell Inspiron-3568
> 老婆的大学时期的笔记本

按照Linux系统的过程
启动时F2或F12都会进入BIOS设置


- BIOS模式-UEFI【传统与统一可扩展固件接口 】
- Settings -> General -> SATA Operation -> AHCI模式
- win+R输入msconfg，关闭引导服务，去掉安全引导
- BitLocker是硬盘加密，这个电脑没有
- Settings -> General -> Boot Sequence -> 设置， 目前没有看到其他模式，存在问题

- [如何在戴尔计算机上安装 Ubuntu Linux ](https://www.dell.com/support/kbdoc/zh-cn/000131655/%E5%A6%82%E4%BD%95-%E5%9C%A8-%E6%88%B4%E5%B0%94-pc-%E4%B8%8A-%E5%AE%89%E8%A3%85-ubuntu-linux)

## 网络

### 组网 多台路由器
家庭组网，可以保证两台路由器的SSID(WiFi名称)、密码和协议完全一致，设备基本可以实现自动无缝切换。

| 方案 |优点  | 缺点 |
|---|---|---|
| Mesh组网 | 无缝漫游，自动管理  | 需要全套设备支持  |
| 路由器桥接（AP 模式） | 同网段，漫游体验好  | 子路由器失去路由功能  |
| 路由器中继 | 配置简单  | 独立网段，漫游时 IP 会变  |

关键处是
- SSID(WiFi名称)、密码和协议完全一致
- 让它们同属一个网段，切换时IP不变

[家庭组网踩坑：用两台路由器实现 iPhone 无缝漫游](https://popring.cn/blog/home-network-issues)

### 交换机
希力威视的SR-S25G1206F-N交换机，
家里已经有运营商提供的光猫，交换机只是用来扩展内网，买一对和光纤类型匹配（比如多模）的万兆SFP+光模块

### 组网 一台路由器
从光猫出来的两根线，一根走路由，一根走家里主卧。

要在一个网段，先把路由器的DCHP关闭后，设置同一个网段的IP
192.168.1.100
255.255.255.0
192.168.1.1

这样所有的设备都是相同的ip网段。

## 工具

- [Create bootable USB drives the easy way](https://rufus.ie/en/)


