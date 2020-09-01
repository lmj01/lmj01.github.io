console.log('main start');

// macrotask宏任务
setTimeout(() => {
    console.log('setTimeout');
    process.nextTick(() => console.log('process.nextTick 3'));
}, 0);

// microtask微任务
process.nextTick(() => {
    console.log('process.nextTick 1');
    process.nextTick(() => console.log('process.nextTick 2'));
});

console.log('main end');
