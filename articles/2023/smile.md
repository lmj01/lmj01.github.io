# Smile
> 微笑美学是口腔正畸学、修复学、医学美学等学科共同关注的热点，具有美学特征额微笑应该具有协调的唇齿关系、微笑曲线以及颊廊间隙等软硬组织关系。

## 术语

### Incisal Edge
切缘下唇曲线

- Cervical，颈缘上唇曲线
- 微笑窗，按照下唇曲线来移动
- 图片旋转，是为了让中线，垂直于两瞳孔之间连线的线，与图片保持一致

### 长度
即牙齿高度，以患者实际牙齿的高度，高低偏移30%的值为最值
因为有两个1号，取最高值的算长度初始值

- 长宽比，如果是对称的，就算一个

长度变化，对所有牙齿都有相同的偏移, 保持牙齿轮廓线底部不改变
- 长宽比在范围内，宽度不变，ratio变化
- 长宽比达到极值，ratio不变，宽度变化

### buccal corridor

颊廊，将其定义为人笑时，上颌可见后牙颊侧面与口角之间的间隙，也称为负性间隙

调整456牙号的宽度改变

### distal
远中

### mesio
近中

### 唇侧
labial

## 接口

### 2-factor

- 传8个数值,对称时左右相等,不对称时可能不相等
- 未修改时,默认传1;有修改时,就说修改后的值与原始值的比值 modify/origin
- 

## 参考

- 口腔固定修复中的美学重建 第1卷
- [临时网页内容](https://www.sohu.com/a/205746991_377312)
- [catmull](https://github.com/actionnick/cat-rom-spline)
- [gl-vec2](https://github.com/stackgl/gl-vec2)