let p2023Q4 = [
    0.3,
    0.05,
    0.03,
    0.15,
    0.20,
    0.12,
    0.05,
    0.05,
    0.03,
    0.02,
];
let r2023Q4 = [
    90,
    100,
    100,
    50,
    0,
    98,
    100,
    100,
    100,
    100,
]
const score = p2023Q4.reduce((pv,cv,i)=>{
    const r1 = cv * r2023Q4[i];
    const r2 = pv + r1;
    console.log(r1, r2);
    return r2;
}, 0)
console.log('total -- ', score);