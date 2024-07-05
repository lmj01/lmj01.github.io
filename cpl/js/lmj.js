const q2in2024 = {
    p: [
        0.15,
        0.15,
        0.35,
        0.05,
        0.10,
        0.10,
        0.05,
        0.03,
        0.02,
    ],
    r: [
        70, 
        70,
        90, // 暂停
        90, // 暂停
        95,
        90,
        100,
        100,
        100,
    ],
}
const q1in2024 = {
    p: [
        0.20,
        0.30,
        0.15,
        0.05,
        0.10,
        0.10,
        0.05,
        0.03,
        0.02,
    ],
    r: [
        90, 
        80,
        40, // 暂停
        30, // 暂停
        90,
        100,
        100,
        100,
        100,
    ],
}
const q4in2023 = {
    p: [
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
    ],
    r: [
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
    ],
}
const arrayList = [q2in2024, q1in2024, q4in2023];
function toScroe(data) {
    console.log('one-quater-year')
    return data.p.reduce((pv,cv,i)=>{
        const r1 = cv * data.r[i];
        const r2 = pv + r1;
        console.log(i, r1, r2)
        return r2;
    }, 0)
}

console.log('total -- ', arrayList.map(e=>toScroe(e)));