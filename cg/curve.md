# Curve

## bezier

## Catmull-Rom 

- uniform
- chordal
- centripetal

过四个点的曲线(p0,p1,p2,p3)的曲线方程为B(t)=a+b*t+c*t^2+d*t^3
其切线方程为C(t)=b+2c*t+3*d*t^2
满足以下条件
- B(0) = p1 => a = p1
- C(0) = (p2 - p1) / 2, => b = (P2 - p1) / 2
- B(1) = p2 => a + b + c + d = p2
- C(1) = (p3 - p1) / 2 => b + 2c + 3d = (p3 - p1) / 2
由上面的条件得出
- a = p1
- b = (p2 - p1) / 2
- c = (2p0 - 5p1 + 4p2 - p3) / 2
- d = (-p0 + 3p1 - 3p2 + p3) / 2

[On the Parameterization of Catmull-Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf)

