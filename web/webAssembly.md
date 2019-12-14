
# webAssembly
> 跨平台的一种编码

***
## WebAssembly
> WebAssembly并不是要替换JavaScript,而是用来增强JavaScript和Web平台的能力, 适合用于写模块,承接各种复杂的计算,如图像处理,3D运算,语音识别,视频编码解码等工作, 主体还是使用JavaScript,都是通过JavaScript调用WebAssembly的代码. 

The WebAssembly JavaScript object acts as the namespace for all WebAssembly-related functionality.

### emscripten
> 注意Emscripten还只是MVP, 接口不稳定, 随时可能在改变. 需要自己去文档和代码中找逻辑,根据自己的需求来定制,查阅文档是唯一方式,只能谦虚地继续学习.
emcc是emscripten工具链替换掉gcc或clang的角色, 主要是参数的设置比较费脑! 主要一个是 -s Options, 这个需要查询emscripten的src/setting.js文件,里面描述了当前版本的可选参数.
- *遇到的问题*
    1. 编译c文件时,生成的binary可以随意放置位置,但是编译cpp的文件,使用了extern修饰函数,生成的binary文件必须把html与wasm和js放置在一起,否则会提示找不到.
- *内存*: js call c malloc to get memory on heap.所有内存都在堆栈,所以编译前就需要预设内存空间大小,便于WebAssembly在足够的内存上进行操作.
    1. emcc -s TOTAL_MEMORY=512*1024*1024 to set memory space(Module.HEAPU8.buffer)
    2. js set data source space,30 float data: var data = new Float32Array(30);
    3. get data byte size, allocate memory on emscripten heap, and get pointer, var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
    4. var dataPtr = Module._malloc(nDataBytes);
    5. bind data to the memory on emscripten heap, js use TypedArray(buffer, byteOffset, length) to contain data: var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);dataHeap.set(new Uint8Array(data.buffer));
    6. js send data to c function, byteOffset is offset(in bytes) from the start of its ArrayBuffer, here is the emscripten heap, Module.HEAPU8.buffer, so the dataHeap.byteOffset is the pointer in c style, Module._CWithParameterFunction(dataHeap.byteOffset);
    7. free memory: Module._free(dataPtr);
    
***

## 库,框架
- [WAPM](https://wapm.io/) is the WebAssembly Package Manager

***

