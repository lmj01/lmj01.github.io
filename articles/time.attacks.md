# 计时攻击

Java的[Play Framework](https://github.com/playframework/play1/blob/b01eb02eb8df2e94cac2793c028dd9c4c5a57b31/framework/src/play/mvc/CookieDataCodec.java#L82)代码用来验证cooike(session)的数据是否合法，代码如下,
```java
boolean safeEqual(String a, String b) {
    if (a.length() != b.length()) {
        return false;
    }
    int equal = 0;
    for (int i=0; i<a.length(); i++) {
        equal |= a.charAt(i) ^ b.charAt(i);
    }
    return equal == 0;
}
```
代码中为什么需要遍历完所有的字符呢？而不是只要有一个字符不相等就可以判断了吧，这样做的原因是什么呢？为什么要遍历每一字符呢？

这就要谈谈计时攻击了，它是Side Channel Attack侧信道攻击的一种，SCA是一种针对软件或硬件设计缺陷，通过功耗、时许、电磁泄漏等方式达到破解目的，这种攻击方法的有效性远高于去针对技术原理破解。但它不同于社会学工程欺骗，这是一种黑盒的攻击，针对黑盒本身携带的信息来攻击的方法。

上面的例子就是可以通过多次尝试并根据反应时间差来判断两个字符串是否相等，如密码判断是否相等, 如计时两字概括一样，虽然是理论上，但这就是安全代码的要求呀，首先要保证代码的正确性。如果按照这个逻辑去分析，上面的长度信息也是一个因素。

## 感受

通过上面的分析知道，为什么代码要考虑各种问题，有时候时间信息也会泄漏也是非常严重的，别人为什么知道这些呢？说明有过人通过这个方法达到了目的，如引用中的学术文章也说明这个问题了。如果对方知道API的调用方式，就可以通过API反应的时间来破解，完全不关心你API实现时使用什么方法，什么技术，通过一个API与你交互就可以得出某些信息。可见安全的要求有多高。

## 引用

- [酷壳-计时攻击](https://coolshell.cn/articles/21003.html)
- [Remote Timing Attacks are Practical](http://crypto.stanford.edu/~dabo/papers/ssl-timing.pdf)