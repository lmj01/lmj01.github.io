const a1 = [1, 2, 3, 4];

let tmp1 = [].slice.call(a1),
    tmp2 = a1.slice();
console.log(tmp1, tmp2);

tmp1 = a1.reduce((acc, cur, idx, src)=>{
    console.log('reduce', 'acc', acc, 'cur', cur, 'idx', idx, 'src', src);
    return acc += cur;
});
console.log(tmp1);

tmp1 = '1,0,0,1,0,0';
console.log(tmp1.split(',').map(e=>parseFloat(e)));