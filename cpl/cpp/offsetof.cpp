#include <assert.h>
#include <stdio.h>

/*
 * 这是blender中处理链表的verify逻辑，很值得借鉴
 * 
 *  .....
 * |_____|m3
 * |_____|m2
 * |_____|m1
 * |_____|0
 * 逻辑上就是从0的位置开始解析struct对象中的成员位置，这就算出了成员的相对值
 * 把地址0解析成struct XXX*，这样就得到物理地址AAAA(=0)
 * 在对struct XXX*取成员变量，并得到它的物理地址BBBB
 * 把地址转换为size_t的整数值，得到的就是一个相对的偏移值
 * 
 * https://en.cppreference.com/w/c/types/offsetof
 * 
 * for c++, need the standard layout type, if not the behavior is undefined * 
 * https://en.cppreference.com/w/cpp/types/offsetof
 * 
 */

// c-style
#define offsetof1(s, m) (size_t)((char*)(&((s*)0)->m))
// cpp-style
#define offsetof2(s, m) (reinterpret_cast<size_t>(&reinterpret_cast<const volatile char&>(static_cast<s*>(nullptr)->m)))

typedef struct Link {
    struct Link *next, *prev;
} Link;

typedef struct LinkData {
    struct LinkData *next, *prev;
    void *data;
} LinkData;

typedef struct ListBase {
    void *first, *last;
} ListBase;

int main(int argc, char **argv) 
{
    assert( offsetof1(struct Link, next) == 0);
    assert( offsetof1(struct Link, prev) == 8);
    assert( sizeof(struct Link) == 16);

    assert( offsetof2(struct Link, next) == 0);
    assert( offsetof2(struct Link, prev) == 8);    

    assert( offsetof1(struct LinkData, next) == 0);
    assert( offsetof1(struct LinkData, prev) == 8);
    assert( offsetof1(struct LinkData, data) == 16);
    assert( sizeof(struct LinkData) == 24);

    assert( offsetof2(struct LinkData, next) == 0);
    assert( offsetof2(struct LinkData, prev) == 8);
    assert( offsetof2(struct LinkData, data) == 16);    

    assert( offsetof1(struct ListBase, first) == 0);
    assert( offsetof1(struct ListBase, last) == 8);
    assert( sizeof(struct ListBase) == 16);

    assert( offsetof2(struct ListBase, first) == 0);
    assert( offsetof2(struct ListBase, last) == 8);
    
    return 0;
}