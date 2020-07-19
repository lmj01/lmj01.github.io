# Tool
    

## Subversion

- svn up(update) 
- svn update -r r644 切换到版本644
- svn co(checkout) svn-path
- svn add file
- svn commit -m "message"
- svn st(status)
- svn diff
- svn revert
- svn merge -r 608:602 "" 从r608回滚到r602
- svn info


### VSCode
- 编辑页面切换 Alt + num

***

## 常用命令

### window的cmd中
1. echo %XXX-path% 打印环境变量
2. netstat -aon | findstr "9090" 查看端口号

### Linux
- 

### grep
1. **grep -rn "xxx"**递归查找字符串xxx
2. **--exclude=*.{min.js}**排除文件类型
3. **-w,-word-regexp** 精准匹配
### compress
1. xz -d xxx.tar.xz and tar xvf xxx.tar分两步解压 
2. tar xvf xxx.tar -C /path 确保指定目录/path已存在
3. gunzip xxx.tar.gz and tar xvf xxx.tar
4. ln -s src/bin/exe dst/bin/exe创建软连接

### pacman包管理

- pacman -Sl | grep XXX 查询
- pacman -S XXX

***

## 软件开发工具
### 图形生成工具

#### [Graphviz](<http://graphviz.org/>) 

graphviz是一个集成化的工具，包含了各种功能在里面

##### dot

是一种图形描述语言，可以把图形渲染成png，jpg，pdf等类型

### 三维软件
#### blender
#### Houdini
电影特效魔术师,创意高级视觉效果的有效工具
#### Substance Designer
Substance Designer is the Ultimate 3D Material Authoring and Scan Processing Tool. It has become the standard in the entertainment industry for PBR material authoring.

### Toolchain

-  [Rome前端工具](https://romefrontend.dev/) 将所有JavaScript开发工具集中在一个软件包里面。


***

## linux系统管理
- service
    * sudo service --status-all 查看服务列表

## 免费开源软件

### GIMP

#### normal map

法线贴图的制作

一般用黑白来表示凹凸，白色就是凹下部分，黑色就是凸出部分

#### specular map

一般用红色，表示接受光的作用，黑色表示不受光的部分


### Blender

## 常用工具
- [typora](https://www.typora.io):markdown跨平台的免费编辑软件
- IrfanView: win10自带的图片浏览器 太难用啦!这个免费的,性能还行,也有绿色版,不用安装的
- [draw.io](https://www.draw.io/) 在线图表，流程图，UML等
- [I18n Translation Search](https://i18ns.com/)用于翻译各种文字的网站
- [WebGL支持](http://webglreport.com)
- [在线编译器,多语言,多平台](http://godbolt.org)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/):检查UI颜色的对比度的,有一定的参考价值
- [Learning Search Anything](https://learn-anything.xyz):搜索一系列知识体系的查询服务
- [arxiv](https://arxiv.org/)公开论文查询
- [scholar pedia](http://www.scholarpedia.org/article/Main_Page)学术百科全书,由同行评审的开放,旨在通过提供对属性和科学领域主题的深入学术处理
- [Wolfram MathWorld](http://mathworld.wolfram.com/)线上数学百科
- [Encyclopedia of Mathematics](https://www.encyclopediaofmath.org/index.php/Main_Page)
- [libgen](http://libgen.io/)电子书的查询和下载
- [many pixels](https://gallery.manypixels.co/)一个收集无版权插图的网站，提供 SVG / PNG 格式下载，并且允许更改颜色
- [勾勾](https://github.com/zenuo/gogo)，搜索结果基于谷歌，安全和简洁
- [kindle电子书分享网](https://kindle.51nazhun.pub/)
- [ConEmu](https://www.fosshub.com/ConEmu.html)window上的终端，合并了几个，可以方便使用
- [百度地图开发](http://lbsyun.baidu.com/index.php?title=%E9%A6%96%E9%A1%B5)， 经度，左减右加，维度，上加下减

