# [draco](https://google.github.io/draco/)

- [github](https://github.com/google/draco)
- [测试](https://github.com/lmj01/meijie-wasm)
- [spec规范](https://google.github.io/draco/spec/)

特点
- 有损压缩
- 通过 Edge breaker 3D 压缩算法改变了模型的网格数据的索引方法，缺少了原来的网格顺序；
- 通过减少顶点坐标、顶点纹理坐标等信息的位数，以减少数据的存储量


## 参考

- [压缩算法的论文--3D Compression Made Simple: Edgebreaker on a Corner-Table](https://faculty.cc.gatech.edu/~jarek/papers/CornerTableSMI.pdf)
用 edge breaker 算法去压缩面的信息，并产生 CornerTable，用平行四边形差分方式压缩顶点属性信息


