# Fractional Indexing

小数索引技术

图形对象会使用 index 属性表示顺序，记录自己在同级图形中的位置, index的值为0到1，不包含边界值，

figma处理时丢掉前面的0.，把小数部分转换为ascii中可打印的字符，共95个。 如0.2，0.3，之间就是0.25。 如果只是这样算，就想得太轻松了，数值计算从来不是小事。

精度问题，两个小数之间求中间点，多进行几次就会造成误差，与预期的产生错觉, 当然可以根据使用场景实际判断是否更改。

针对这个问题，就是用无限精度的类型，字符串来表示。可参考[David Greenspan](https://observablehq.com/@dgreensp/implementing-fractional-indexing)，有人根据他的文章写了一个[npm库](https://github.com/rocicorp/fractional-indexing)

## 参考

- [Figma 使用了 “Fractional Indexing”（小数索引） 技术](https://www.figma.com/blog/realtime-editing-of-ordered-sequences/#fractional-indexing)