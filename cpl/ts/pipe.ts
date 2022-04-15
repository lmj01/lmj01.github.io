const pipe = <A, B>(fn: (a: A) => B) => {
    return {
        f: function<C>(g: (x: B) => C) { return pipe((arg: A) => g(fn(arg)))},
        build: () => fn
    }
}

const compose = <A, B>(fn: (a: A) => B) => {
    return {
        f: function<C>(g: (x: C) => A) { return compose((arg: C) => fn(g(arg)))},
        build: () => fn
    }
}


const add = (x: number) => (y: number) => x + y
const format = (n: number) => `value: ${n.toString()}`
const upper = (s: string) => s.toUpperCase()

const process = pipe(add(2))
  .f(add(6))
  .f(format)
  .f(upper)
  .build()


const process2 = compose(upper)
  .f(format)
  .f(add(6))
  .f(add(5))
  .build()


console.log(process(6))
console.log(process2(6))

const pipe2 = <A, B>(fn: (a: A) => B) => {
    return {
        f: function<C>(g: (x: B) => C) { return pipe((arg: A) => g(fn(arg)))},
        build: () => fn
    }
}
type AnyPipeFunc = (...args: any) => any;
const addMem = (k:string, v:number) => (a:any) => a[k]=v;
let tmp = {};
const process3 = pipe2(addMem('a', 3))
    .build();
console.log(process3(tmp), tmp);
const addFuncB = (v:AnyPipeFunc) => (a:AnyPipeFunc) => {a.prototype.b=v};
function tmp1() {    
}
const process4 = pipe2(addFuncB(function() {console.log('add prototype b')}))
    .build();
process4(tmp1);
console.log(tmp1)
console.log(tmp1.prototype)
tmp1.prototype.b()