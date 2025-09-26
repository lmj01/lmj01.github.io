# [Slice](https://faculty.washington.edu/chudler/slice.html)

<div class="d-flex flex-wrap w-100 m-auto">
<img class="m-auto" src="/dental/images/direct.gif" style="width:400px;" >
<img class="m-auto" src="/dental/images/slice.gif" style="width:400px;" >
<img class="m-auto" src="/dental/images/axial_sagittal.webp" style="width:400px;" >
</div>

方向术语
- 冠状面coronal/frontal plane，前后，纵切，把人体分成前、后两部分
- 矢状面sagittal plane，sagittal来自拉丁文sagitta箭，对应中文就是矢，左右，侧切，把人体分成左、右两部分
- 水平面transverse/horizontal plane，横切，把人体分成上、下两部分
- superior上方，朝向身体的顶部
- dorsal背侧，朝向背部
- inferior下方
- ventral腹侧, 朝向腹部
- rostral头部(anterior前部)，朝向鼻子
- caudal尾部(posterior后部),
- lateral外侧，远离中线
- medial内侧，朝向中线
- bilateral双侧
- lpsilateral 同侧
- contralateral 对侧

## 切片

在vtk中有三个轴对齐的切片，如果不是轴对齐的切片，必须保证volume的scale在三个轴上是一致的，否则会有偏差。

M = ⎡1  0  0  0⎤
    ⎢0 –1  0  0⎥
    ⎢0  0 –1  0⎥
    ⎣0  0  0  1⎦
yz平面关于原点180°旋转，


### 全景图

- 定义坐标轴XY，宽由牙弓曲线的采样点来决定，设定800，高由图片张数来决定

- 生成牙弓曲线上，均匀采样点，即等距曲线，
- 相邻采样点算出切线tangent
- 由tangent与Z轴的法线up[0,0,1]叉乘得到采样点的法线
- 有采样点到采样中点之间的法线距离来计算两条最远的距离，
- 宽度就是最远法线的2倍，高度就是采样点的最高与最低的Y轴的差值

M = ⎡1  0  0  0⎤
    ⎢0  0  1  0⎥
    ⎢0 -1  0  0⎥
    ⎣0  0  0  1⎦

- 三线性插值在边缘处会造成黑色变，是因为周边像素的值为0，返回无，即黑色。

上面是按照算法来计算的，内部提供了CPR曲线重建的方法，需要构造一条线的点数据和对应点的朝向

### 矢状图

- 由等距曲线算出几何中心，
- 由相邻采样点得到切线tangent，由Z轴up[0,0,1]得到采样点的法线
- 把采样点与几何中心连线，把线条投影到法线方向，

上面这个方法不能实时的，只是按照算法自己来实现，真正实时的需要利用内部的结构，直接使用reslice的.setResliceAxes(matrix)。

构造好matrix就可以实现了。
