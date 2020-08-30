/**
 * 柯里化函数是接收参数返回新的函数，新的函数又可以返回新函数，直到最后的值
 * 柯里化函数的优势就是可以部分应用partial Application函数的参数，生成新的函数
 */

/**
 * 定义一个函数add,满足如下性质
 * add(1) == 1
 * add(1)(2) == 3
 * add(1)(3)(3) == 6
 * ...
 * var g = add(1)(2)
 * g(100) == 103
 * g(200) == 203
 * ...
 */
/**
 * 这里与柯里化不一样的地方是使用了JavaScript的valueOf属性，当将一个对象与一个primitive进行比较时，
 * JavaScript会调用对象的valueOf方法获取一个Primitive值 
 */
let a = {};
a.valueOf = function() { return "hello world" }
console.log(a == "hello world"); // true
console.log(a === "hello world"); // false, 严格模式操作符会比较数据类型

function total(args) {
    return [].slice.call(args).reduce((t,c) => t + c, 0)
}

function add() {
    function factor(value) {
        let result = function() {
            return factor(value + total(arguments))
        }
        result.value = value;
        result.valueOf = function() { return this.value }
    }
    return factor(total(arguments));
}