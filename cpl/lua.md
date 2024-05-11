# [lua](http://www.lua.org/)

- [注释](/cpl/lua/comment.lua)

## 模块与包

lua的模块是由变量，函数等组成的table，其是加载机制通过require来导入

require的路径是全局变量package.path中的，lua启动后，有三个大致范围

C包，使用C为lua写包，是动态库的调用方式

# lua-src

lua把虚拟机执行代码的效率作为一个设计目标。lua的vm是Register based VM。

## lopcodes

> 理解lua，直接从这里开始，是最好的，特别是有汇编，C语言的功底后，就相当于先理解lua的汇编指令，再去理解lua的逻辑。
>
> > 汇编的本质是CPU二进制指令的文本形式

lua virtual machine op-codes， 指令是一个32bit的unsigned int

|       | 31-24    | 23-16    | 15-8    | 0-7      |
| ----- | -------- | -------- | ------- | -------- |
| iABC  | B:9      | C:9      | A:8     | Opcode:6 |
| iABx  | Bx:18-1  | Bx:18-2  | A:8     | Opcode:6 |
| iAsBx | sBx:18-1 | sBx:18-2 | A:8     | Opcode:6 |
| iAx   | Ax:26-1  | Ax:26-2  | Ax:26-3 | Opcode:6 |

基本的四个指令形式，iABC，iABx，iAsBx，iAx。sBx表示signed int，

```c
pow(2,18)=262144 => [0, 262143] 
0 use 131071, -1=-1+0=131070, +1 = +1+131071=131072. // 进行了一个变换，类似二进制取补
```

生成代码对应的指令

```shell
luac -l -l src.lua
```

## 编译系统

编译系统就是将符合语法规则的chunk转成可运行的closure， 即chunk作为输入，closure作为输出。

### 主要概念

#### closure

closure对象是lua运行期一个函数的实例对象，

#### proto

proto对象是lua内部代表一个closure原型的对象，有关函数的大部分信息都保存在它里面

- instructions指令列表，函数编译后生成的虚拟机指令
- constant table常量表，运行期的所有常量，在指令中，常量通过id在常量表中索引
- child proto table子proto表，所有内嵌于函数的proto列表，指令OP_CLOSURE的proto就是在这个表中通过id索引
- local var desc局部变量描述，函数使用的所有局部变量名称，以及生命周期
- upvalue desc，函数使用到的Upvalue的描述

#### chunk

代表一段符合lua语法的代码，lua_load会对chunk编译生成一个mainfunc proto，内部的所有函数都对应一个proto。整个过程就是生成以mainfunc为根节点的proto树结构

注意，lua编译过程中是一次遍历就生成指令，并没有对源码和语法结构多次遍历，是通过指令回填技术来实现支持的。

### 实现逻辑

lua没有使用llex和yacc生成，而是完全手写的词法和语法分析器，按功能划分，主要有三个模块


![lua-opcode](/images/lua_opcode.png)


```c
// in lopcodes.c
#define opmode(t,a,b,c,m) (((t)<<7)|((a)<<6)|((b)<<4)|((c)<<2)|(m))
```

- t，表示为test，其后的一定是OP_JMP，共五个指令OP_EQ,OP_LT,OP_LE,OP_TEST,OP_TESTSET
- a，是否为寄存器操作，1表示寄存器
- b，B参数，OpArgMask类型
- c，C参数，OpArgMask类型
- m，op model，就是iABC,iABx,iAsBx,iAx

这里存在些疑惑，Opcode只占6bit，而opmode中的值占8bit，令人不解，多出来的一个bit是什么地方来的？

## 参考
- [Lua Awesome-lua官方链接上的记录](https://github.com/LewisJEllis/awesome-lua)
- [Quickly view and test GLSL fragment shaders while allowing lua scripting to modify uniforms ](https://github.com/nevilc/ShaderPreview)
- [luafxbuilder is a proof of concept test to use lua as effect file format primarily for shaders](https://github.com/pixeljetstream/luafxbuilder)
- [lua-cpp一个用C++11封装lua的库](https://gitee.com/linuxtongyong/lua-cpp-wrapper)
- [LuaChat is an example of how to combine modern C++ and Lua 5.3/5.4. In particular, LuaChat implements a library of C++ primitives called actions.](https://github.com/bluwireless/LuaChat)
- [探索Lua5.2内部实现](https://blog.csdn.net/yuanlin2008/article/category/1307277)
