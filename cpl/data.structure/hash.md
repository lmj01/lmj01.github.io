# Hash

散列，也称哈希。 其思想是根据结点的关键码值来确定其存储地址，以关键码key为自变量，通过函数关系h(key)，称散列函数，计算出对应函数值来，把这个值解释为结点的存储地址。检索时，用同样的方法计算地址，得到地址去取节点。 散列是一种重要的存储方式，也是一种快速检索方法。

称这种存储结构为散列表Hash Table。散列表中的一个位置称为槽slot，散列函数hash function是这种技术的核心。

散列表的一般以数组实现，地址就是散列表的下标。以空间换取检索效率的数据结构。

## Hash Function

因关键码长度，散列表大小，关键码分布情况，记录的检索频率等因素决定使用什么散列函数。

### 除余法

h(key) = key mod M，M为散列表长度

### 乘余取整法

h(key) = _LOW(n x (A x key % 1))， 取小数部分是A x key % 1 = A x key - _LOW(A x key)，而_LOW(x)表示对x取下整数

### 平方取中法

通过求关键码key的平方，扩大相近数的差别，然后根据表长度取中间几位数作为散列函数值，往往是取二进制的比特位，因为一个乘积的中间几位数与乘数的每一数位都相关，由此产生的散列地址比较均匀。

### 数字分析法

### 基数转换法

### 折叠法

## Collision

哈希冲突，也称哈希碰撞，通过不同的key得到相同的value的情况。

开散列法把发生冲突的关键码存储在散列表主表之外，闭散列法把发生冲突的关键码存储在表中的另一个槽内。

### Closed Hashing
闭散列法， 也称开发定址发open addressing

当冲突发生时，递归循环hash剩下的空余空间，直到找到空的并插入。这样有个不足之处是插入数据一定要小于hash空间。

### Open Hashing

开散列法, 也称拉链法separate chaining

当发生冲突时，在源地址新建一个链表，把相同的结果以链表节点存储起来。

HashMap