# Python

## Python环境搭建

从官网下载web安装包，定制化安装

- python -m xxx  内部执行
- pip install virtualenv安装virtualenv到系统python全局下
- virtualenv --no-site-packages envNewAlonePython  参数--no-site-packages不拷贝python安装的第三方包
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


## 概念

- PEP python的增强建议书
