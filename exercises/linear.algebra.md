# Linear Algebra

线性代数

- [基](https://www.douban.com/note/774496194/)

## 域

## 矩阵

<details>
<summary>特征值与特征向量</summary>

### 特征值与特征向量

矩阵与向量相乘会产生另外一个向量，对于某些特定矩阵，存在一些向量，相乘后得到的向量方向不改变，此类向量称为给定矩阵的特征向量，而变换后的向量的缩放值被定义为与该特征向量对应的特征值。

$A\vec{v}=\lambda \vec{v}, \lambda \text{是特征向量}\vec{v}\text{对应的特征值}$

特征向量只能仅适应于方阵。特征向量所构成的空间（包含0向量）称为特征空间。

如果方阵可以写成下来式子，称为可对角化矩阵

$$
A=PDP^{-1} \newline
D=\begin{pmatrix}
    \lambda{1} & 0 & \cdots & 0 \newline
    0 & \lambda{2} & \cdots & 0 \newline
    \vdots & \vdots & \ddots & \vdots \newline
    0 & 0 & \cdots & \lambda{n} \newline
\end{pmatrix} \newline
D\text{是以特征值作为对角元素的对角矩阵}, P\text{是特征向量堆叠在一起的矩阵}
$$

$\text{矩阵等于其自身的转置称为对称矩阵}, A=A^{T}$

$\text{矩阵的逆等于其自身的转置称为正交矩阵}, A^{-1}=A^{T} or A^{T}A=I$

有很多关于特征值和特征向量的性质，比如：仅具有实数特征值，始终可对角化，具有正交特征向量。由于对称矩阵的的特征向量相互正交，对角化矩阵A中的矩阵P为正交矩阵，常常说任何对称矩阵都是正交对角化的。

$A=PDP^{-1}=PDP^{T}$

非对称方阵时，可能有复数的特征值。这就是其局限性，就需要奇异值分解了。

</details>

### 矩阵分解技术

<details>
<summary>特征值与特征向量</summary>

#### [奇异值分解SVD]()

[奇异值分解的简单想法](https://mp.weixin.qq.com/s/FwtDCVTiINpzP8tih0tu4w)

在大数据时代，数据集可以使用二维矩阵表示，有时使用矩阵中所有元素进行计算成本很高，就需要恰当的形式的矩阵方便计算。SVD将任何矩阵分解为三个通用矩阵。

$$
\text{设}A\text{是任意矩形（m,n）的矩阵，可以证明}A^{T}A和AA^{T}\text{分别是对称方阵（n,n）和（m,m）}. \newline
(A^{T}A)^{T}=A^{T}(A^{T})^{T}=A^{T}A \newline
(AA^{T})^=(A^{T})^{T}A^{T}=AA^{T} \newline
$$

还可以证明它们共享相同的特征值，但特征向量可能不同。根据对称矩阵正交对角化性质，矩阵可分解为

$$
A^{T}A=VDV^{T} \newline
AA^{T}=UDU^{T} \newline
D\text{为特征值的对角矩阵，}V,U\text{为正交矩阵}
$$

</details>
