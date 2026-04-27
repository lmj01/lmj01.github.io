# 口腔


## 概念

- [解剖学和放射学医学图谱数字资源](https://www.imaios.com/cn)

### Longitudinalis长轴

Longitudinal planes refer to the vertically-oriented planes which are aligned along the long axis of the body. These could be sagittal or coronal.

Both sagittal and coronal longitudinal planes perpendicularly intersect the transverse (or horizontal) plane.

#### Coronalis冠状
Coronal plane (a.k.a. frontal plane) refers to a vertically-oriented, side-to-side plane which, when passes through the body in its anatomical position, divides it into anterior and posterior parts.

The coronal plane lies at right angle to the vertically-oriented sagittal plane, while it perpendicularly intersects the transverse (a.k.a. horizontal) plane.
冠状面Coronal section，又称额状面frontal plane，即从左右方向，沿人体的长轴将人体纵切为前、后两部分的切面。这种提法是为了在临床中将器官位置描述的更具体。

Coronal与Frontal是因为解剖对象是站立或趴着

#### Sagittal矢状
Sagittal plane refers to a vertically-oriented, antero-posterior plane which, when passes through the body in its anatomical position, divides it into right and left parts.

The sagittal plane lies at right angle to the vertically-oriented coronal plane, while it perpendicularly intersects the transverse (a.k.a. horizontal) plane.
矢状面Median sagittal section就是把人体分成左右两面的解剖面，与这个面平行的也是矢状面

### Axialis短轴
上下方向的切割平面
Axial (a.k.a. transverse) plane refers to a horizontally-oriented plane which, when passes through the body in its anatomical position, divides it into upper and lower parts.

The axial plane is intersected at right angles by the vertically-oriented coronal (side-to-side) and sagittal (antero-posterior) planes.

#### Transversus横
Transverse (a.k.a. axial) plane refers to a horizontally-oriented plane which, when passes through the body in its anatomical position, divides it into upper and lower parts.

The transverse plane is intersected at right angles by the vertically-oriented coronal (side-to-side) and sagittal (antero-posterior) planes.
水平位Transversus section，又称横断位。

### 坐标系
xyz是世界坐标系

#### 解剖坐标系
医学成像技术最重要的模型坐标系是解剖空间，也称患者坐标系。

解剖空间由三个平面组成，用于描述人类的标准解剖位置

- axial 平面平行于地面，将上下分开
- coronal 平面垂直于地面，将前后分开
- sagittal 平面垂直于地面，将左右分开

不同的医疗应用使用3D的基础有不同的定义， 但它们都是右手坐标系

- LPS，左Left、后Posterior、上Superior，用于DICOM映像和ITK工具包
- RAS，右Right、前Anterior、上Superior，类似于LPS，前两个轴翻转并由3D切片器使用

注意，有表示出发from的方向和达到to方向的，LPS会写成RAI，如ITK-Snap软件中Tools->Image Information->Orientation就是RAI，表示from RAI -> to LPS。

#### 图像坐标系IJK
图像坐标系描述了如何获取相对于解剖结构的图像。医疗扫描仪创建从左上角开始的点和细胞的常规矩形阵列。
I轴向右增大，J轴向右增大，K轴向后增大。除了每个体素的强度值IJK之外，还存储解剖坐标的原点和间距。使用原点和间距可以计算出每个图像坐标体素在解剖坐标系中的相应位置。

## 牙齿编号

### FDI

FDI，世界牙科联盟World Dental Federation, 来自法文Federation Dentaire Internationale.
分ABCD四个区，恒牙1X，2X，3X，4X， 乳牙5X,6X,7X,8X编号法

### Universal Number System
恒牙1-32号，乳牙A-T号，美国系统，北美使用

### Palmar Notation
象限 + 数字 / 字母，用 “┘└┐┌” 符号分区，多见于英联邦国家、部分教科书

- palmar，与部位法类似，乳牙使用A到E的数字表示


## 颌平面

颌平面是指，从双侧上颌中切牙近中邻接点至双侧第一磨牙的近中颊尖顶所构成的假象平面。

![occlusal plane](./images/occlusal_plane.png)

颌平面是在牙尖交错位时代表上下颌牙齿颌面的一条抽象线，颌平面有两个特性：

- 水平高度
- 斜度

如图所示。

## 牙列期

dentition

## 适应症

轻度间隙slight gap
轻度拥挤slight crowding
轻中度开颌mild moderate openbite
中度间隙moderate gap
中度拥挤moderate crowding
轻中度深覆合mild moderate deep-overbite   
轻度反颌slight crossbite
轻中度龅牙mild moderate buckteeth
复发palindromia

## 其他
邻面去釉interproximal stripping
gingiva牙龈，齿龈

### TMD
颞下颌关节紊乱病， 咬合干扰是TMD的重要诱因之一，可能导致关节弹响、疼痛、张口受限以及咀嚼肌群的疲劳、酸痛。

- 紊wen

### 附件
附件是粘接在牙齿表面的树脂突起，用于增强矫治器对牙齿的控制力
附件有不同的形状

| 枚举值                             | 含义                                    |
| ------------------------------- | ------------------------------------- |
| **Rectangular（矩形）**             | 传统矩形附件，分为水平放置和垂直放置，用于控制伸长、压低、旋转等      |
| **Ellipsoidal（椭圆形/椭球形）**        | 椭圆或半椭球形附件，常用于转矩控制                     |
| **Optimized Extrusion（优化伸长附件）** | Invisalign 等系统的优化设计附件，专为牙齿伸长移动定制形状和位置 |
| **Optimized Rotation（优化旋转附件）**  | 专为牙齿旋转移动优化的附件设计，如用于尖牙、侧切牙等            |
| **Power Arm（力臂/Power Ridge）**   | 设置在矫治器上的功能结构，类似水平椭圆附件，用于产生力偶控制转矩      |
| **Other（其他）**                   | 其他类型附件                                |


## 参考

- [Dental Anatomy牙科解剖学，Physiology生理学，Occlusion颌平面](http://what-when-how.com/category/dental-anatomy-physiology-and-occlusion/)
- []()