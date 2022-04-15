class SomeClass<T> {
    constructor(public arr: Array<T>) {}
}

function filter <R> (fn: (r: R) => boolean) {
    return function (obj: SomeClass<R>) : SomeClass<R> {
        return new SomeClass(obj.arr.filter(fn));
    }
} 

/* How to replace i: unknown with i: number? */
let r = filter<number>(i => i >= 2) (new SomeClass([1, 2, 3]))
console.log(r);