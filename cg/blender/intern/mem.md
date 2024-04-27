
# MEM module

c-style guarded memory (de)allocation, provides guarded malloc//calloc calls. All memory is enclosed by pads, to detect out-of-bound writes. All blocks are placed in a linked list, so they remain reachable at all times. There is no back-up in case the linked-list related data is lost.

这段话总结了blender内部内存使用的模式


## memutil

***
### cache limiter
the generic memory cache management system to limit memory usage to a fixed global maximum. 有C和C++两个版本
利益好缓存，对程序的性能有非常大的提升，非常值得借鉴类似的技术运用在程序中
```c++
class BigFatImage {
public:
      ~BigFatImage() { tell_everyone_we_are_gone(this); }
};
void doit()
{
    MEM_Cache<BigFatImage> BigFatImages;
    MEM_Cache_Handle<BigFatImage>* h = BigFatImages.insert(new BigFatImage);
    BigFatImages.enforce_limits();
    h->ref();
    // work with image...
    h->unref();
    // leave image in cache.
}
```
### reference counting
Base class for objects with reference counting.对象创建时refCount=1，当refCount为时自己析构掉自己。不能再堆栈上创建。
