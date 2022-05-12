class class0 {
    renderer;
    scene;
    constructor(e) {
        this.renderer = e;
        this.scene = 1;
    }
}
class Class1 {
    provider;
    constructor(e) {
        this.provider = new class0(e);
    }
    method1() {
        const {renderer: n} = this.provider;
        console.log(n);
    }
}

let c1 = new Class1(3);
c1.method1();

/**
 * {} is Object initializer
 */
class Tt extends class {
}
{
    constructor() {
        super(...arguments);
        this.a = 5;
    }
}
let c2 = new Tt();
console.log(c2.a, c2, Tt)

class Tt2 extends function() {

}{
    constructor() {
        super(...arguments);
        this.a = 5;
    }
}
let c3 = new Tt2();
console.log(c3.a, c3, Tt2)

const u = function(e) {
    return class extends e {
        hello() {
            console.log('hello in function')
        }
    }
}
class d extends u(class0) {

}
let d0 = new d();
d0.hello()
console.log(d, d0)

let c4 = class {
    constructor() {
        this.a = 5;
    }
    hello() {
        console.log('anonymouse class')
    }
}
let c4Instance = new c4();
c4Instance.hello();
console.log(c4Instance, c4);