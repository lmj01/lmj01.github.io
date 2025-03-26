# VFS(Virtual FilesyStems)

之前接触PDF[js-pdf](https://parallax.github.io/jsPDF/docs/module-vFS.html)时，也遇到加载[字体时，也有这个概念virtual-fs](https://github.com/bpampuch/pdfmake/blob/master/src/virtual-fs.js)

看到[云风博客](https://blog.codingnow.com/2024/02/vfs_plan.html#more)上说他们游戏使用VFS来加载文件，坐版本关联也是如此，类似git的文件管理模式

- [Virtual File Systems with a node fs-like API ](https://github.com/kba/vfs)
- [github VFS - Virtual File System, This module is a vfs implementation for node.js. Originally it was created for our internal needs at Cloud9IDE. ](https://github.com/c9/vfs)
- [In-memory filesystem written in JavaScript for Node.js and Browsers ](https://github.com/MatrixAI/js-virtualfs)
- [go github A FileSystem Abstraction System for Go 抽象的VFS](https://github.com/spf13/afero)
- [相比afero，增加了其他云平台的继承，如S3，Azure](https://github.com/C2FO/vfs)


## Merkle tree

- [hash](/cpl/data.structure/hash.md)

Merkle tree,也称Hash Tree，就是存储hash的一棵树，叶子是数据块（如文件或文件集合等）的hash值，非叶子节点对应子节点串联字符串的hash

在点对点网络中作数据传输时，会同时从多个机器上下载数据，很多机器可以认为是不可信或不稳定的，为了校验数据的完整性，把大文件分割成小的数据块，如分割成2k数据块，这样的好处就是损坏文件只需从新下载坏的数据块。需要为每个数据块作hash，BT下载时会先下载一个Hash List，这个Hash List是把每个数据块的hash拼接在一起，再一起作一个root hash，这样保证了下载的Hash List是正确的，再对每个数据块的hash进行确认。

Merkle tree是Hash List的泛化，即Hash List的树高为2的多叉结构。

Merkle tree是把相邻的两个hash合并成一个字符串，再对这个字符串作hash，就是一个标准的二叉树结构了，最后得到一个root hash，称为Merkle root。p2p网络下载就是先获取可信的Merkle tree root的hash。相比Hash List只能下载完成后才能验证hash，Merkle tree可以每个分支下载后可以立即验证这个分支。

应用区域
### 数字签名

Merkle Signature Scheme

### P2P网络

BT下载就是采用P2P技术来让客户端数据传输，一来加快速度，一来减轻服务器负担。BT(BitTorrent)是一种中心索引式的P2P文件分发通信协议。

先获取一个种子文件，扩展名为.torrent的文件，文件包含了要分享的信息
- 文件名
- 大小
- 文件的hash
- 指向Tracker的URL

### Trusted Computing

可信计算

### IPFS

InterPlanetary File System是很多互联网技术的综合体，如分布式hash表Distributed HashTable，Git版本控制系统

### BitCoin和Ethereum
比特币和以太坊