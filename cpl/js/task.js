console.log('main start');

// macrotask宏任务
setTimeout(() => {
    console.log('setTimeout');
    process.nextTick(() => console.log('process.nextTick 3'));
}, 0);

// microtask微任务
// 微任务之间也是有优先级的
// promise 比 process.nextTick还要低一级
Promise.resolve(2.1).then(res=>{
    console.log('Promise.resolve().then', res);
})

process.nextTick(() => {
    console.log('process.nextTick 1');
    process.nextTick(() => console.log('process.nextTick 2'));
});


console.log('main end');
