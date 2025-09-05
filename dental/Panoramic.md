# Panoramic

## 3D slicer

- [3D Slicer Curved Planar Reformat](https://github.com/PerkLab/SlicerSandbox?tab=readme-ov-file#curved-planar-reformat)

## MIP(Maximum Intensity Projection)

- 把体数据存储为webGL纹理
- 在fragment中沿视线方向做光线的投射并求取最大值
- 把渲染结果保存为一张equirectangular全景图


- 牙弓曲线，根据牙弓曲线的MIP图像集合成全景图像

```js
// 数据提供
const tex3D = new THREE.DataTexture3D(data, width, height, depth);
tex3D.format   = THREE.RedFormat;
tex3D.type     = THREE.UnsignedByteType;
tex3D.minFilter = THREE.LinearFilter;
tex3D.magFilter = THREE.LinearFilter;
tex3D.needsUpdate = true;
// 放置目标
const rt = new THREE.WebGLRenderTarget(4096, 2048, {
  type: THREE.FloatType   // 保留 HDR 值
});
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
const scene  = new THREE.Scene();
// fragmentShader
uniform sampler3D volumeTex;
uniform vec3      volumeSize;   // 体数据分辨率
uniform float     stepSize;     // 步长
varying vec2      vUv;

vec3 uvToDir(vec2 uv) {
    float lon = (uv.x - 0.5) * 2.0 * 3.1415926;
    float lat = (uv.y - 0.5) * 3.1415926;
    return normalize(vec3(
        cos(lat) * sin(lon),
        sin(lat),
        cos(lat) * cos(lon)
    ));
}

void main() {
    vec3  rayDir = uvToDir(vUv);
    vec3  rayPos = vec3(0.5);               // 把体数据归一化到 [0,1]
    float maxVal = 0.0;
    for (int i=0;i<512;i++) {               // 512 步
        float val = texture(volumeTex, rayPos).r;
        maxVal = max(maxVal, val);
        rayPos += rayDir * stepSize;
        if (any(lessThan(rayPos,vec3(0.0))) ||
            any(greaterThan(rayPos,vec3(1.0)))) break;
    }
    gl_FragColor = vec4(vec3(maxVal/255.0), 1.0);
}
// 保存为图片
renderer.readRenderTargetPixels(rt, 0,0,4096,2048, buffer);
const canvas = document.createElement('canvas');
canvas.width = 4096; canvas.height = 2048;
const ctx = canvas.getContext('2d');
const imgData = ctx.createImageData(4096,2048);
imgData.data.set(buffer);
ctx.putImageData(imgData,0,0);
canvas.toBlob(b=>saveAs(b,'mip-panorama.png'));
```

## vtk-js

vtk-js也是有CPR的功能
- [vtkOpenGLImageCPRMapper](https://kitware.github.io/vtk-js/api/Rendering_OpenGL_ImageCPRMapper.html)
- [vtkCPRManipulator](https://kitware.github.io/vtk-js/api/Widgets_Manipulators_CPRManipulator.html)

- [Part of the volume inside polydata disappear when volumerendering image along with polydata ](https://github.com/Kitware/vtk-js/issues/3228)
- [Rendering of multiple volumes not sorted correctly](https://github.com/Kitware/vtk-js/issues/2086)
Also I'll probably tweak the intermixing of MIP and composite a bit. Right now it blends MIP/Average/etc on top of composite but I may try to do something more complex in the future. Depth based pixel by pixel mixing of MIP and composite looked horrible (I had it coded that way originally) as the depth of a MIP is a mess. I thought it might look cool, nope, just doesn't make sense. But the MIP on top of composite looks pretty good and works.

- [How to use ImageCPRMapper to get CPR on the transverseplane](https://discourse.vtk.org/t/how-to-use-imagecprmapper-to-get-cpr-on-the-transverseplane/13234)

## 参考

- [Panoramic View: Making Panoramic View and Getting Slices from the Panoramic View](https://discourse.vtk.org/t/panoramic-view-making-panoramic-view-and-getting-slices-from-the-panoramic-view/14346/3)
    - [VTK9.4rc2中支持的CPR](https://www.kitware.com/activiz-9-4-curved-planar-reformation/)

- [1339](https://github.com/cornerstonejs/cornerstone3D/issues/1339)
- [vtkKinship](https://github.com/djelouze/vtkKinship)

### Curved Planar Reformation (CPR) 

- [CPR Curved Planar Reformation](https://www.cg.tuwien.ac.at/research/vis/adapt/Vis2002/AKanitsar_CPR.pdf)
    - [你真的了解曲面重建（CPR）吗？](https://www.cn-healthcare.com/articlewm/20220709/content-1397639.html)
    - 曲面重建， CPR本质上是一种曲面的多平面重建技术，MPR(multi-planar reformation/reconstruction)是常用的后处理技术，MPR涉及将在某个平面(通常是轴位)获取的成像模式中的数据转换到另一个平面的过程。**reformation与reconstruction的区别是：reformation是在原来的技术上对信息整合，不会有更多信息，reconstruction会获取更多的信息提供**
    - [github的实现](https://github.com/PerkLab/SlicerSandbox?tab=readme-ov-file#curved-planar-reformat)

