# [openCASCADE](https://dev.opencascade.org/)

## [OpenCascade.js](https://ocjs.org/)
Port of the OpenCascade CAD library to JavaScript and WebAssembly via Emscripten.

## 概念术语

术语same domain或其缩写SD，在src/ModelingAlgorithms/TKShHealing/ShapeUpgrade/ShapeUpgrade_UnifySameDomain.hxx中给出了其定义
```cpp
//! This tool tries to unify faces and edges of the shape which lie on the same geometry.
//! Faces/edges are considering as 'same-domain' if a group of neighbouring faces/edges
//! are lying on coincident surfaces/curves.
```
此类可以用来合并共线的边和共面的面。当相邻的面重叠或相邻的边共线时，面和边认为是Same Domain。