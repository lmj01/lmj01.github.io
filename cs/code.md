# 编码

计算机很多时候就是在解码与编码，特别是特定领域有很多各自的编码规则和规范，这也是私有格式众多的原因。

## [ASTC Compressed Texture Image Formats](https://registry.khronos.org/DataFormat/specs/1.3/dataformat.1.3.html#ASTC)

[Why does ASTC use ISE when almost nothing else does?](https://fgiesen.wordpress.com/2026/05/29/why-does-astc-use-ise-when-almost-nothing-else-does/) 这篇文章解读了ASTC Compressed Texture Image Formats就有一个特定编码，integer sequence encoding来传输小的整数
比如传入字符a,b,c。如果前提知道内容，那么就只需要传0,10,11三个两位的数就可以作一个映射了。