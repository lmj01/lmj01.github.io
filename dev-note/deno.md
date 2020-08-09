# deno

deno的目录需要定义一个路径变量DENO_DIR，这样deno执行时，下载的依赖库放置的未知，
否则就是系统默认的缓存位置。

在编译rust后可测试
./target/debug/deno run cli/tests/002_hello.ts

deno run welcome.ts

deno test 
自带测试模块，不需要第三方工具，对工作目录中所有以_test或.test或结尾且后缀为js,ts,jsx,tsx的文件