# WebGLProgram
在这里，会拼接完所有的shader的源码，因为在这里会attach到program上的
## getEncodingComponents
编码方式：THREE.LinearEncoding
color-space支持Linear， sRGB，RGBE(E for shared exponent)，RGBM(M for shared multiplier)，RGBD(D for shared divider)，LogLuv，Gamma
[rgbm介绍](http://lousodrome.net/blog/light/tag/rgbm/)

## getToneMappingFunction
这里有个中间层，通过字符串来拼接函数，这些函数时shader中的函数
- Linear
- Reinhard
- Uncharted2
- Cineon
- ACESFilmic

## generateExtensions
设置扩展的属性，shader的代码

## generateDefines
shader的宏替换

## fetchAttributeLocations
涉及函数有
- gl.getProgramParameter
- gl.getActiveAttrib
- gl.getAttribLocation

## parseIncludes
解析shader中的#include字段内容，持续递归调用！在compiler阶段，我一直好奇如何处理，原来就是这样一个递归的字符串操作而已！这就是知识点在了解前与了解后的心理变化吗？
```javascript
function parseIncludes(str) {
    let pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
	let replace = function(match, include) {
		let replace = chunkLib[include];
    	return parseIncludes(replace);
	}
	return str.replace(pattern, replace);
}
```

## unrollLoops
快速替换for循环中的snippet小段代码

## WebGLProgram
shadow map type
- SHADOWMAP_TYPE_BASIC
- SHADOWMAP_TYPE_PCF
- SHADOWMAP_TYPE_PCF_SOFT

环境映射
envMapXXX

webgl和webgl2的所有shader都在这个阶段进行了替换，只获取需要的shader代码，都是通过字符串的替换拼接等操作完成的。

涉及函数有
- gl.createProgram
- gl.attachShader
- gl.bindAttribLocation
- gl.linkProgram
- gl.getProgramParameter
- gl.deleteShader
- gl.deleteProgram

