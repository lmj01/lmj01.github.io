# events

事件系统是一个交互库必备，threejs的event使用了js的event事件

src\core\EventDispatcher.js 

## JavaScript

在EventDispatcher.d.ts文件中有一个example的使用例子
```javascript
	// defines the object car
	class Car extends EventDispatcher {
		constructor() {
			super();		
		}
		toggle() {
			this.dispatchEvent( {type: 'start', message: 'start event message'} );
		}
	}
	class Car2 extends Object3D {
		constructor() {
			super();
		}
		toggle() {
			this.dispatchEvent({type:start2', message:'start2 message'});
		}
	}
	// use example 
	let car = new Car();
	car.addEventListener('start', function(event){
		alert(event.message);
	});
	car.toggle();
```

仔细想想，任何具有面向对象编程的语言，都可以按照这个逻辑实现事件系统

