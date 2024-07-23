# [Shader](https://threejs.org/docs/index.html?q=material)

- [[SOLVED] Why does object get dimmer/darker when light gets closer to it?](https://discourse.threejs.org/t/solved-why-does-object-get-dimmer-darker-when-light-gets-closer-to-it/3475)

## linear workflow

在r152中引入这个概念，

- [The Importance of Being Linear](https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear)
- [Updates to Color Management in three.js r152](https://discourse.threejs.org/t/updates-to-color-management-in-three-js-r152/50791)
- [Updates to lighting in three.js r155](https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733)
- [Shadow and color problems going from v64 to v161](https://discourse.threejs.org/t/shadow-and-color-problems-going-from-v64-to-v161/61640)


```js
```

## fog

The fog is a low-res RenderTarget, i use the height of the terrain (contribution inceasing by distance) and depth-buffer in the post shader to blend it with the atmosphere then, which is rendererd in a separate smaller target. So you basically render the fog in a mask to blend the scene with the background if any.

For extending the default fog in the shaders without any postprocessing, you could use just the Y axis for the height if that already fits your needs.

It would require some changes to use this with the THREE.EffectComposer, sorry. I’m using a custom framework on top of THREE, not the EfffectComposer for example.

- [描述fog的一个思路应用，效果很好](https://discourse.threejs.org/t/tesseract-open-world-planetary-engine/1473/7)