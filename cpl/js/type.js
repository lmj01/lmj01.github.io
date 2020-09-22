/**
 * 类型转换
 * 引用类型转换为基本类型
 * 转为字符串
 *      1. 调用toString, 如果返回的是primitive，以字符串返回
 *      2. 调用valueOf, 如果返回的是primitive，以字符串返回
 *      3. 报错
 * 转为数字
 *      1. 调用valueOf, 如果返回的是primitive，以数字返回
 *      2. 调用toString, 如果返回的是primitive，以数字返回
 *      3. 报错
 */
let tmp1 = 2 == [[[2]]], 
    tmp2 = 2 == [[2]], 
    tmp3 = 2 == [2];
console.log(tmp1, tmp2, tmp3);

let url = '/images/pre/front.svg';
console.log(url.match(/\/pre\//ig), url.includes('/images/pre/'));
