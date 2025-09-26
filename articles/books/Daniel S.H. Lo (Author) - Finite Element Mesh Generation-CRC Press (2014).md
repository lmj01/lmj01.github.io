# [Finite Element Mesh Generation-CRC Press (2014)](https://book.douban.com/subject/32825551/)

## Chapter 1 Introduction
## Chapter 2 Fundamentals

- MG(Mesh Generation)
- FE(Finite Element)

### 2.3.4
However, apart from the geometrical aspects, FE meshes are meshes to support numerical computations, which are stricter in the following aspects:
- FE meshes have to be compatible, i.e. an edge in 2D and a face in 3D can only be shared by two elements except for the specially designed elements, which could still converge without full compatibility, as shown in Figure 2.1.
- The shape qualities of the elements in an FE mesh have to be optimised to reduce discretisation error; in particular, inverted and degenerate elements are not allowed.
- The size and shape of the elements have to comply with the specified node spacing function or metric.
- The node numbering and orientation have to be consistent.
- Some nodal points, edges and faces have to be generated at specified positions.

### 2.3.10

- In MG, a domain to be meshed is often defined by its boundary.