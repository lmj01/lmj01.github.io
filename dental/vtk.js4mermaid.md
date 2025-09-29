# vtk.js

<pre class="mermaid">
    graph TD
        A[Source] --> B0[Common]
        A[Source] --> B1[Filters]
        A[Source] --> B2[Imaging]
        A[Source] --> B3[Interaction]
        A[Source] --> B4[IO]
        A[Source] --> B5[Proxy]
        A[Source] --> B6[Rendering]
        A[Source] --> B7[Testing]
        A[Source] --> B8[Widgets]
        A[Source] --> B9[interface.d.ts]
        B9 --> B90[vtkAlgorithm]
        B9 --> B91[vtkObject]
        B9 --> B92[vtkOutputPort]
        B9 --> B93[vtkSubscription]
        B9 --> B94[vtkProperty]
</pre>

<pre class="mermaid">
    graph TD
        A[Rendering] --> B0[Core]
        A[Rendering] --> B1[Misc]
        A[Rendering] --> B2[OpenGL]
        A[Rendering] --> B3[Profiles]
        A[Rendering] --> B4[SceneGraph]
        A[Rendering] --> B5[WebGPU]
        A[Rendering] --> B6[WebXR]
</pre>

<pre class="mermaid">
    graph TD
        A[vtkAlgorithm] -- "getOutputPort()" --> B[vtkAbstractMapper]
        B -- "render backend" --> C[vtkOpenGL**Mapper]
        C -- "draw"--> D[vtkRenderer]
        D -- "present" --> E[vtkOpenGLRenderWindow]
        A -- "getOutputData()" --> F[vtkImageData / vtkPolyData]
</pre>

