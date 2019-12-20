# Rust



## 安装

在指定目录下安装，不进入环境变量中改变，只在当前终端中起作用

```shell
@echo off
cd /d %~dp0

call:set_absolute_path USERPROFILE .\.portable\User
call:set_absolute_path HOMEPATH .\.portable\Home
call:set_absolute_path APPDATA .\.portable\User\AppData\Roaming
call:set_absolute_path CARGO_BIN d:\rust\.portable\cargo\bin
rem 这里要设置绝对路径，不然每次进入不同的目录会重新重新需要设置toolchain
set CARGO_HOME=d:\rust\.portable\cargo
set RUSTUP_HOME=d:\rusut\.portable\rustup
set path=%CARGO_BIN%;%path%
start rustup-init.exe %1
exit
```

安装好后，因为没有使用系统环境变量，可能会出现rustc no default toolchain configured错误，需要设定

```shell
rustup toolchain link mytoolchain "d:\rust\.portable\rustup\toolchains\nightly-x86_64-pc-windows-msvc"
rustup default mytoolchain
rustc --version // 如果输出结果就对啦
rustup toolchain list // 列出当前已安装的
rustup default xxx // list中的名字替换为xxx，设置为默认的
```

### 加入编辑器

下载一个vscode在当前目录下，把安装时的rustup-init.exe换成Code.exe，调用VSCode进行执行，就可以得到想要的结果啦。

### racer

```shell
rustup component add rust-src // 添加源代码组件
git clone xxx.racer.git
cd racer && cargo build --release
set RUST_SRC_PATH // 设置环境变量，执行rust源码的地方
```

## webassembly

```cmd
rustup update
rustup target add wasm32-unknown-unknown
wasm-pack build
```

## 语言特性

## 概念

### 绑定binding
rust并不像C/C++那样，变量是内存块，就存在一个不可避免的问题，内存块的数据初始化的问题，变量拥有的是随机的，或者之前的旧数据，而rust避免了它。

rust明确规定变量的初始化值必须由程序员自己赋值，变量成了一个标识符，在需要时通过let关键字来绑定它与值，内存块的关联

### 移动语义move
把资源的所有者ownership从一个绑定binding移动move到另一个绑定上

这也是rust安全的原因，只有资源的所有者销毁后才释放内存，同一时刻一个值只能属于一个ownership，这样资源的内存也只被释放一次。

#### 具有Copy特性trait
```rust
let x : T = something;
let y = x;
```
如果类型T没有实现Copy特性，x所有权移动到y；

如果类型T实现了Copy的特性，拷贝x的绑定的资源为新资源，并把新资源binding到y。

形式相同，却具有不同的语义，这就是需要概念清晰，认清本质。

### 可变性mutable
这个概念能说明rust中的变量与值是分离的，像C/C++中的那样变量是可以直接修改的，因为它就是对内存块的操作，可是rust不行，绑定时就决定了这个标识符具有的特性，是把变量binding到标识符，并不表示可以对标识符修改就可以改变值的内存块啦！

这也是标识符与值的内存块是分离的，只是在语言层面有了这样的规范来保证语言的安全性。这与其他编程语言中const概念是完全的不同概念，汉语中的这个字是很容易等效的，也是很容易把错误混淆的。


### 借用Borrowing
借用，是指向所有者ownership借用它的使用权，这个机制类似其他编程语言中的读写锁的概念，同一时刻，只能拥有一个写锁，或只能拥有多个读锁，不允许同时出现读写锁。rust在编译期完成borrowing的检查，这也是它保证安全的原因，避免死锁或野指针出现。
- 只能有一个&mut T，且资源的拥有者是mutable的
- 可有多个&T
- 离开作用域，归还给资源的拥有者
- 在&mut T归还前不可访问资源的拥有者

相比引用Reference，借用是需要归还的，而引用没有保证引用的有效性。

### 生命周期Lifetime
不仅仅是作用域，在整个编译期都需要的一个概念，它是一个标识符，形如
```rust
fn foo(x: &str)->&str {
    x
}
fn bar<'a>(x:&'a str)->&'a str {
    x
}
fn test<'a, 'b:'a>(x:&'a str, y:&'b str)->&'a str {
    if (true) {
        x
    } else {
        y
    }
}
```
函数foo是隐性的生命周期，函数bar是显式的生命周期。其中的'a就是标识符，这里的a可以是任何的有效标识符。

函数test中的'a的生命周期要长于'b，否则编译期不能推导出现返回值的生命周期。

Lifetime推导的规则
- 输出值（返回值）依赖输入值
- 输出值的Lifetime是各个输入值的子集，即输入值的求交的Lifetime

编译期能自动推导出的Lifetime，不建议显式的指定Lifetime标识符，会降低程序的可读性

## 特性traits

### 闭包
就是一个traits，是一个rust的语法糖

