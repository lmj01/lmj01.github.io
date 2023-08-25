# 打印机

工作场景中是开发的一个生产系统中，有个标签打印需求，原来客户使用的工业打印机Xprinter XP-H500E和ZDesigner GT800(EPL)，后者是专业打印机，没有系统驱动供打印，需要调用设备的驱动程序来打印，使用EPL打印指令。

与普通打印方式相比，采用打印语言的优点在于速度快，精度高。它们的工作原理其实很简单：利用这些编程语言，编辑好一个打印的指令集，发送给条码打印机，条码打印机就会按照你事先编辑的命令去进行打印的工作。但由于没有统一的标准打印语言，使得用户在使用不同机器时会产生一定的麻烦，比如现在我们想通过网页来开发打印，没有对应的操作系统的打印界面。

## 激光与喷墨

激光适合打印文档，喷墨适合打印照片，那是因为耗材不一样，激光使用碳粉，喷墨使用墨水，碳粉颗粒比墨水大

## 低分辨率打印增强

部分软件有一个功能，可以改善打印的清晰度，比如金山office中的PDF打印就有一个低分辨率打印增强，这个功能是不需要在驱动层去改变，应该是从图像层面来改善的，但具体的细节还不清楚

图像的分辨率是有单位的，一般使用DPI像素每英寸来表征。提高分辨率的方法就是

- 要么增大像素
- 要么减少面积

成像设备通过变焦来拍摄高低分辨率照片
- 拉近镜头，视野变大zoom out，分辨率降低
- 视野变小zoom in，分辨率提高

多数打印机均有两个主要部件：
- 形成输出位图的光栅图像处理器RIP
- 用于产生印点的引擎

RIP -> 位图 -> 缓存 -> 引擎

使用DDA法的打印结构

RIP -> 反走样图像 -> 缓存 -> 印点调节器 -> 引擎

使用PPAA的打印结构

RIP -> 位图 -> 缓存 -> PPN -> 反走样图像 -> 印点调节器 -> 引擎


- [ZPL 、EPL与TSPL指令区别](http://www.feyin.cn/blog/2019/12/08/differences-between-zpl-epl-and-tsc-instructions/)
- [打印机分辨率增强技术](https://www.docin.com/p-878782126.html)
- [Inkjet Printer Print Quality Enhancement Techniques](https://www.hpl.hp.com/hpjournal/94feb/feb94a5.pdf)

## 3D打印机

- [切片原理](https://support.snapmaker.com/hc/en-us/articles/4409195239575--Slicing-and-G-Code-The-Bridge-Between-3D-Model-and-3D-Printer)

## 参考
- [paper size打印纸张大小](https://www.papersizes.org/a-paper-sizes.htm)