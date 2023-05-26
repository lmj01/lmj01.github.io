# [Python](https://www.python.org/)

## Python环境搭建

从官网下载web安装包，定制化安装
或从window得store中安装

- python -m xxx  内部执行
- pip install virtualenv    安装virtualenv到系统python全局下 可能没有加入path中，需要找一找
- cd parent-folder
- virtualenv --no-site-packages envNewAlonePython 参数--no-site-packages不拷贝python安装的第三方包
- Script\activate启动当前环境
- Script\deactivate关闭当前环境

### pip

- pip install -r requirement.txt
- pip install xxx -i https://pypi.tuna.tsinghua.edu.cn/simple

pip的源设置
也可通过配置文件
window在%APPDATA%目录中添加文件
C:\Users\Administrator\AppData\Roaming\pip\pip.ini
Linux在~/.pip/pip.conf

```ini
[global]
index-url = http://pypi.douban.com/simple
[install]
trusted-host=pypi.douban.com
```

国内源有
https://pypi.tuna.tsinghua.edu.cn/simple

#### opengl

pip install pyopengl
默认安装的是32位的， 需要手动安装64位的
[py libary](https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyopengl)
安装后执行 python python/ogl.py测试一下

### 常用包
<!-- opencv的包有几种类型，注意安全需要的 -->
- pip install opencv-contrib-python -i https://pypi.tuna.tsinghua.edu.cn/simple
<!-- 处理图像的 -->
- pip install pillow // 
- pip install redis
- pip install matplotlib // matplotlib是一个python 2D绘图库，利用它可以画出许多高质量的图像

## python anaconda

这是一个比较独立的环境，连安装包都是独立的

_conda.exe --version
_conda.exe env list
Scripts\activate 进入当前环境中base
condabin\conda create -p d:\anaconda3\envs\realSR // 新建一个环境
Scripts\activate realSR // 进入当前环境


## 概念

- PEP python的增强建议书
- print(dir(moduleLib)) 查看当前模块库的接口
