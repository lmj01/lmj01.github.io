# Stomatological

- [口腔解剖图集](https://www.imaios.com/cn/e-anatomy/4/4)
- [CT相关](../cg/ct.md)
    - [cornerstonejs](../cg/library/cornerstonejs.md)
- [微笑美学](../articles/2023/smile.md)

## 概念

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

## 参考

- [3DSlicer -- Coordinate systems](https://www.slicer.org/wiki/Coordinate_systems)