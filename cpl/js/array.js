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

// unique the array 
function unique(arr) {
    return arr.filter((v,i,a)=>{
        return a.indexOf(v, 0) === i;
    })
}
function unique2(arr) {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
}
tmp1 = '["id_add_patient","id_add_patient","id_add_patient"]';
tmp2 = JSON.parse(tmp1);
console.log(tmp2, unique(tmp2));

tmp1 = '["id_add_patient","id_add_patient","id_add_patient", "id_query_advance"]';
tmp2 = JSON.parse(tmp1);
console.log(tmp2, unique2(tmp2))