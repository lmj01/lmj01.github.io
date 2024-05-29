# VFS(Virtual FilesyStems)

之前接触PDF[js-pdf](https://parallax.github.io/jsPDF/docs/module-vFS.html)时，也遇到加载[字体时，也有这个概念virtual-fs](https://github.com/bpampuch/pdfmake/blob/master/src/virtual-fs.js)

看到[云风博客](https://blog.codingnow.com/2024/02/vfs_plan.html#more)上说他们游戏使用VFS来加载文件，坐版本关联也是如此，类似git的文件管理模式

- [Virtual File Systems with a node fs-like API ](https://github.com/kba/vfs)
- [github VFS - Virtual File System, This module is a vfs implementation for node.js. Originally it was created for our internal needs at Cloud9IDE. ](https://github.com/c9/vfs)
- [In-memory filesystem written in JavaScript for Node.js and Browsers ](https://github.com/MatrixAI/js-virtualfs)
- [go github A FileSystem Abstraction System for Go 抽象的VFS](https://github.com/spf13/afero)
- [相比afero，增加了其他云平台的继承，如S3，Azure](https://github.com/C2FO/vfs)


## Hash List
Merkle tree,也称Hash Tree，就是存储hash的一棵树，叶子是数据块（如文件或文件集合等）的hash值，非叶子节点对应子节点串联字符串的hash
