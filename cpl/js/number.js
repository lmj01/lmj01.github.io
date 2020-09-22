/**
 * 先获取科学计算法中 小数点的字符和指数后面的数字，就是有三个d
 * 通过第二个和第三个确定是几位小数
 * 再转换为fxied就可以了
 */
function toNonExponential(num) {
    let m = num.toExponential().match(/\d(?:\.(\d*))?[eE]([+-]\d+)/);
    // console.log(m);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

// console.log(toNonExponential(3.3e-7));     // "0.00000033"
// console.log(toNonExponential(3e-7));       // "0.0000003"
// console.log(toNonExponential(1.401E10));   // "14010000000"
// console.log(toNonExponential(0.0004));
// console.log(toNonExponential(-1.8369701987210297e-16));

let mat = [
    'matrix(-1.8369701987210297e-16, -1, 1, -1.8369701987210297e-16, 0, 0)',
    'matrix(1, 0, 0, 1, 0, 0)',
    'matrix(6.123233995736766e-17, 1, -1, 6.123233995736766e-17, 0, 0)',
    'matrix(0.9, 0, 0, 0.9, 0, 0)',
    '1,0,0,-1,0,0',
    '0.9,0,0,0.9,0,0',
    '1.1,0,0,1.1,0,0',
    '-1.1,0,0,1.1,0,0',
    '-0.9,0,0,0.9,0,0',
    '0,-1.4641000000000006,1.4641000000000006,0,0,0'
];
mat.forEach(m=>{
    // console.log(m.match(/[-|\s]([.|\d]*?[eE][+-]\d+)+/g));
    // let mStr = m.match(/[-|\s]*(([.|\d|\s]*?[eE][+-]\d+)+|\d)/g); 
    // let mStr = m.match(/-{0,1}(\d(\.{0,1}\d)|\d)/g); 
    let mStr = m.match(/-{0,1}((\d\.\d+[eE][+-]\d+)+|(\d(\.{0,1}\d+)|\d))/g); 
    console.log(mStr);
    if (mStr) {
        let res = mStr.map(e=>parseFloat(e)).map(e=>{if(Math.abs(e) < 1e-10) return 0; else return e;});
        // let res = mStr.map(e=>parseFloat(e)).map(e=>e.toFixed());
        console.log(res);    
    }
})

// let n = -1.8369701987210297e-16;
// console.log(n.toFixed(), typeof (n.toFixed()));
