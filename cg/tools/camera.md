# Camera


## 插值

要实现缩放动画并应用插值，修改camera的以下属性值，并逐步更新这些值就形成了动画的缩放
- fov（视场角，对于透视相机
- zoom（缩放级别，对于正交相机）属性

- Zooming and changing the FOV is the same thing, but they are very different to getting near/far. 

## dolly zoom
What is the dolly zoom? Also known as the contra zoom or Vertigo shot (as it was first used to magnificent effect by Alfred Hitchcock in his 1958 thriller film Vertigo), the dolly zoom is a camera movement that's quick yet effective at disorienting viewers.

Dolly-Zoom，也被称为“Vertigo effect”或“zolly”，是一种电影拍摄技巧，通过同时进行推拉镜头和改变镜头焦距来保持画面中主体的尺寸不变，从而在背景上产生一种扭曲的视觉效果，这种效果可以创造出一种令人迷惑的感觉。这种技术经常被用来在视觉上表现角色的心理状态，比如突然的领悟、震惊或恐惧感

Dolly-Zoom一般分为两种类型：

- 外退内进（Dolly-out & Zoom-in）：摄像机往后退，同时焦距往前进，使得背景看起来逐渐变大，而主体大小保持不变。
- 外进内退（Dolly-in & Zoom-out）：摄像机往前进，同时焦距往后退，使得背景看起来逐渐变小，同样主体大小保持不变。


实现Dolly-Zoom效果，需要保存开始缩放时物体位置处的frustum高度，然后随着相机的移动，找到新的距离，并调整FOV以保持物体在物体位置处的相同高度，这样就可以实现Dolly-Zoom效果

## 参考

- [The Dolly Zoom Effect, Explained (And 7 Examples in Movies)](https://whatnerd.com/contra-zoom-film-technique-explained-examples/)