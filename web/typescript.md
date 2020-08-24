
# typescript
> javascript的超集，更加面向对象的编程语言，可以便宜为纯Javascript


## 特性

### union
```typescript
type1 | type2 | type3
```
### interface
Typescript的interface比起C#或Java来说时有区别的，Typescript更加广泛，
```typescript
interface SomePoint {
	x: number; 
	y: number;
}
interface SomePoint {
	z: number;
}
```
接口合并后增加了扩展性

### class

标准模式
```typescript
class A {
	static st:string;
	inst: number;
	constructor(m: any){}
}
```
分解模式

```typescript
interface A_Static {
	new(m: any): A_Instance;
	st: string;
}
interface A_Instance {
	inst: number;
}
declare var A: A_Static;
```
内心时讨厌这种语法的，就是所学其他语言那样，变着花样让我去理解，很容易让人找不到头脑的，但是有时候又特别有用。

***

## [Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

用来定义类型信息及接口规范，当使用扩展的JS库或插件API时，需要使用声明文件来描述库的类型。比如编辑器需要给引用库的提示，就需要类型信息与接口。所以早期的Javascript 库时没有类型定义信息的，需要创建一个对应的d.ts文件，如three-js这样的库。

### 流程

写*.d.ts的流程，尽量从文档入口，不要被细节影像。


## 参考

- [typescript官网文档](https://www.typescriptlang.org/docs)