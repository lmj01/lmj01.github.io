const iterable = ['a', 'b']
const iterator = iterable[Symbol.iterator]()
// let tmp = iterator.next()
// do {
//     console.log(tmp)
// } while(tmp.value)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())