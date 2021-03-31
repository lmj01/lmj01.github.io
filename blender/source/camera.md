# camera

开始分析camera是因为想了解正交投影下的那个grid是如何做到缩放的。

在three-js中的orthographic的camera的zoom就是通过缩放zoom来调整left,top,right,bottom的值来重新构建project matrix的过程。

zooming a perspective camera with lock camera to view moves the camera closer, like walking closer to the target so it fills the frame. with orhtographic camera there's no depth, so moving the camera closer in that view doesn't fill the frame. Orhtographic camera has orthographic scale setting to fill the frame, which is equivalent to zooming by changing the focal length width perspective camera.

2020-2-23
今天公司有人使用Qt的QML实现了网格的效果，从2D入手，这样就解释通了后面的文字是如何处理的逻辑，就是简单的二维绘制，但是那个比例的来源让我还是非常不理解，没有看到过相关的公式来关联2D与3D的单位与像素间的关系，后面慢慢地分析一下这个内容。

3D的场景不能全是3D的，还能是2D的，而浏览器中的canvas如何做到多个canvas叠加了？又与浏览器的实现canvas的WebGL的实现原理了，还需要花时间去理解。
