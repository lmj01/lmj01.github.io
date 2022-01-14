/**
 * 判断对象是否有某个字段、函数等
 */
let foo = {
    // hasOwnProperty: function() {
    //     return false;
    // },
    bar: 'Hello'
};
// 函数判断
console.log(foo.hasOwnProperty('bar'));
// 原型链上的判断
console.log(({}).hasOwnProperty.call(foo, 'bar'));
console.log(Object.prototype.hasOwnProperty.call(foo, 'bar')); // true

let s = [];
let c = s.push.bind(s);
console.log(c);
c(2)
console.log(s);
    
let funcList = [function(e,t,n){}, function(e,t,n){return 3}];
console.log(funcList[0].toString())

console.log(void 0 !== 5);

function m27Anonymous(e) {
    e[e.Continue = 0] = "Continue",
    e[e.Finish = 1] = "Finish"
    return e;
}
let m27a = m27Anonymous({});
console.log(m27a)

let o1 = (e = {}) => Object.assign({
    id: '',
    upper: {
        handle: '',
        arm: '',
    }
}, e);
let o2 = Object(o1)();
console.log(o1, o2);