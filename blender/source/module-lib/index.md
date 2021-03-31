# source/blender/blenlib
> BLI module: 

## 文件
### BLI_alloca.h
alloca() is very useful if you can't use a standard local variable because its size would need to be determined at runtime and you can absolutely guarantee that the pointer you get from alloca() will **Never** be used after this function returns. you can be fairly safe if you
* do not return the pointer, or anything that contains it
* do not store the pointer in any structure allocated on the heap
* do not let any other thread use the pointer
```c
void DoSomthing() {
    wchar_t * pStr = alloca(100);
    //...
}
```
看了这个文件才知道居然有alloca这个功能,在堆栈上分配一块内存,当函数退出时2,系统堆栈指针的调整使得内存块被自动回收.现在使用得比较少了!



