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


## cargo 

cargo build --release  // 默认编译为debug模式

## config

在cargo/config文件中可配置不同源

```
[source.crates-io]
#replace-with = "rustcc"
registry = "https://github.com/rust-lang/crates.io-index"

[source.rustcc]
registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
```
