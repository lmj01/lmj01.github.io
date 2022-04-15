function funcO(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
}
/**
 * 
undefined has normal variable semantics that not even strict mode can fix and requires run-time look-up. It can be shadowed like any other variable, and the default global variable undefined is not read-only in ES3.
void 0 is effectively a compile time bulletproof constant for undefined with no look-up requirements. It is like writing null or true, instead of looking up a variable value. It works out of the box without any safety arguments and is shorter to write. It is better in every way.
 */
// void是JavaScript的一个operator，
// void anything, return undefined
console.log(void 0);
console.log(void(0))
console.log(void "hello")
console.log(void (new Date()))

// Symbol.toStringTag
// JavaScript内置对象都可以通过Object.prototype.toString.call获得特定类型标签
// 对于自定义的，可以自行添加标签
class c1 {}
console.log(Object.prototype.toString.call(new c1()));
class c2 {
    get [Symbol.toStringTag]() {
        return 'myC2';
    }
}
console.log(Object.prototype.toString.call(new c2()));
function f1(e) { console.log('fun1', e); return e; }
function f2(e,t) { console.log('fun2', e, t); return {e:e,t:t} }
const testF12 = (f1,f2);
console.log('comma effect', testF12);

const fO = (e,t) => n => {
    n(f1(e));
    n(f2(e,t));
}
const fN = fO(1, 2);
console.log('fO', fN, fN((r)=>{console.log('recall', r)}))