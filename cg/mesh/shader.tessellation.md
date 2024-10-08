# Tessellation

Tessellation is the process of breaking a high-order primitive (which is known as a
patch in OpenGL) into many smaller, simpler primitives such as triangles for rendering.

The process of breaking down a complex polygon or analytic surface into
a mesh of convex polygons. This process can also be applied to separate a complex
curve into a series of less complex lines.

## Tessellation control shader
A shader that runs before fixed-function tessellation
occurs. It executes once per control point in a patch primitive and produces
tessellation factors and a new set of control points as an output primitive

## Tessellation evaluation shader
A shader that runs after fixed-function tessellation
occurs. It executes once per vertex generated by the tessellator