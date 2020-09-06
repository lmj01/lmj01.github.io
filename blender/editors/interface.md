# Interface

UI接口
include/UI_xxx.h定义了各自接口

## Icons

由UI_init()进入UI_icons_init()

## undo

核心概念还是一个stack，Last-in First-out的操作，主要还是数据的备份处理。