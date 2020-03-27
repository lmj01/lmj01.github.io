# scene

场景

## 透明

在多个场景进行绘制时，需要设置
```javascript
renderer.autoClear = false;
```
因为如果主动清楚时，绘制第二个scene时就会刷新之前的scene中的结果。
特别是对于多个scene时，一般有两个需求
1. scene 主场景
2. scene-ui 用户界面 

主要scene-ui层的近远平面的值与scene的值的关系，谁包含谁，谁就在最前面！

```javascript
renderer.clear();
renderer.setViewport(0, 0, app.fullWidth, app.fullHeight);
renderer.render(scene, camera);
				
renderer.clearDepth();
renderer.setViewport(0, 0, 150, app.fullHeight);
renderer.render(uiScene, uiCamera);			
```