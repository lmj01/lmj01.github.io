# ModelFile

- [draco](/cg/library/draco.md)
- [file format documentation](https://docs.fileformat.com/)
media-types.xhtml)
模型文件格式
- [Kaitai Struct是开发二进制结构解析器的工具。它提供了一种类似YAML的语言，可以简洁地定义二进制结构](http://kaitai.io/#what-is-it)

## STL

- [stl format](http://www.fabbers.com/tech/STL_Format)
- [STL (STereoLithography) File Format, Binary](https://www.loc.gov/preservation/digital/formats/fdd/fdd000505.shtml)
- [What Is an STL File? – The STL Format Simply Explained](https://all3dp.com/1/stl-file-format-3d-printing/)
- [stl parse library](http://formats.kaitai.io/stl/javascript.html)

文本ASCII格式
```js
solid name
     facet normal ni nj nk
         outer loop
             vertex v1x v1y v1z
             vertex v2x v2y v2z
             vertex v3x v3y v3z
         endloop
     endfacet
     ...xxxx // facet repeat
endsolid name
```
二进制binary格式
```js
UINT8[80] – Header// 80个字节的文件名
UINT32 – Number of triangles// 4个字节的面数
foreach triangle
REAL32[3] – Normal vector// normal,3个4个字节的浮点数
REAL32[3] – Vertex 1// x,3个4个字节的浮点数
REAL32[3] – Vertex 2// y,3个4个字节的浮点数
REAL32[3] – Vertex 3// z,3个4个字节的浮点数
UINT16 – Attribute byte count// attribute byte counted 2个字节
end
```
总的大小字节数为80+4+50*facetCount

### Tessellation

Tessellation is the process of tiling a surface with one or more geometric shapes so there are no overlaps or gaps. 

The basic idea was to tessellate the two-dimensional outer surface of 3D models using tiny triangles (also called “facets”) and store information about the facets in a file.

#### The Vertex Rule

The vertex rule states that each triangle must share two vertices with its neighboring triangles.

![](../images/cg/stl-valid-and-invalid-tessellation.png)

#### The Orientation Rule
The orientation rule says that the orientation of the facet (i.e. which way is “in” the 3D object and which way is “out”) must be specified in two ways.

![](../images/cg/stl-orientation-%20of-the-facet.png)

## [DICOM](https://dicom.nema.org/medical/dicom/final/sup205_ft_DICOM_Encapsulation_of_STL_Models_for_3D_Manufacturing.pdf)

In 2018, Working Group 17 for the Digital Imaging and Communications in Medicine (DICOM) standard published Supplement 205, DICOM Encapsulation of STL Models for 3D Manufacturing, which allows for the wrapping of a binary STL file in the standard DICOM container used for the communication and management of medical imaging information and related data. The supplement states, "The goal of encapsulating a Stereolithography (STL) 3D manufacturing model file inside a DICOM instance rather than transforming the data into a different representation is to facilitate preservation of the STL file in the exact form that it is used with extant manufacturing devices, while at the same time unambiguously associating it with the patient for whose care the model was created and the images from which the model was derived."

## [glTF](https://github.com/KhronosGroup/glTF)

- .gltf 还有额外的texture，material，animation等就需要使用gltf和Draco是最好的选择
- .glb 所有数据都以二进制存储
- draco 只对geometry感兴趣的就可以独立使用


- [Header only C++ tiny glTF library(loader/saver)](https://github.com/syoyo/tinygltf)



## 资源与参考

- [The Stanford 3D Scanning Repository斯坦福的3D扫描库](https://graphics.stanford.edu/data/3Dscanrep/)