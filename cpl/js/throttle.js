/**
 * 节流，函数式编程中的概念
 * 触发事件，在规定时间间隔内无法连续调用
 */
function throttle(fn, wait) {
    let timer;
    return function(...args) {
        if (!timer) {
            timer = setTimeout(()=>timer=null, wait);
            console.log(timer);
            return fn.apply(this, args);
        }
    }
}

const fn = function() { 
    console.log('btn clicked');
}
const btn = document.getElementById('btn');
btn.onclick = throttle(fn, 5000);

/**
 * 防抖函数
 * 触发事件停止一定时间后才会执行响应的函数，
 */
function debounce(fn, wait, immediate) {
    let timer;
    let debounced = function() {
        let ctx = this;
        if (timer) clearTimeout(timer);

        if (immediate) {
            let callNow = !timer;
            if (callNow) fn.apply(ctx, arguments);
            timer = setTimeout(()=>{
                timer = null;
            }, wait);
        } else {
            timer = setTimeout(() => {
                fn.apply(ctx, arguments);
            }, wait);
        }
    }
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}

let func = debounce(()=>{
    console.log('call the functioin again!');
}, 1000, true);

let div = document.getElementById('div');
div.onmousemove = func;
btn.onclick = func.cancel();