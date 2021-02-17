# camera

开始分析camera是因为想了解正交投影下的那个grid是如何做到缩放的。

在three-js中的orthographic的camera的zoom就是通过缩放zoom来调整left,top,right,bottom的值来重新构建project matrix的过程。

zooming a perspective camera with lock camera to view moves the camera closer, like walking closer to the target so it fills the frame. with orhtographic camera there's no depth, so moving the camera closer in that view doesn't fill the frame. Orhtographic camera has orthographic scale setting to fill the frame, which is equivalent to zooming by changing the focal length width perspective camera.
