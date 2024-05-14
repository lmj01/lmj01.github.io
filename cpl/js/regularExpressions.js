// 汉字、字母、数字、下划线
const re1 = /^[\u4E00-\u9FA5A-Za-z0-9]+$/i;
const re2 = new RegExp('^[\u4E00-\u9FA5A-Za-z0-9_]+$', 'i');
// 汉字
const re3 = /^[\u4e00-\u9fa5]{0,}$/i;
const re3a = /^([\u4e00-\u9fa5]{0,})/i;
const re3b = /[^\u4e00-\u9fa5]/g; // 提取汉字
const re3c = /[^\u4e00-\u9fa5A-Za-z]/g; // 提取汉字字母
// 邮件地址
const re4 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
/**
 * 正则表达式中的()作为分组来使用，获取分组匹配到的结果用Regex.$1 $2 $3....来获取
 * @deprecated RegExp.$1这种方式已经废弃了
 */
const re4a = /(\w+)@(\w+)\.(\w+)(\.\w+)?/i;
// 匹配特殊字符
const re5 = /[$]+/g; // 匹配一次
const re5a = /[$]{2,4}/g; // 匹配一次
const re5b = /\$\${2,}/g; // 匹配一次

// let str1 = 'abc123';
// console.log(1, 'match', '1', str1.match(re1), '2', str1.match(re2));
// console.log(2, 'replace', '1', str1.replace(re1,''), '2', str1.replace(re2, ''));

// let str3 = '我得数字1', str3a = '11汉字', str3b = '11汉字aa', str3c = 'bb11汉字aa';
// console.log(3, re3.test(str3), str3.match(re3), re3.test(str3a), str3a.match(re3))
// if (re3a.test(str3)) {
//     console.log(3, RegExp.$1, RegExp.$2);
// }
// if (re3a.test(str3a)) {
//     console.log('3a',RegExp.$1, RegExp.$2);
// }
// console.log('3b', str3.replace(re3b, ''), str3a.replace(re3b,''));
// console.log('3b', str3b.replace(re3c, ''), str3b.replace(re3c,''));
// console.log('3b', str3c.replace(re3c, ''), str3c.replace(re3c,''));

// let str4 = 'a@b.com', str4a = 'a.b.com';
// console.log(4, str4.match(re4), str4a.match(re4));
// if (re4a.test(str4)) {
//     console.log('4a1', RegExp.$1, RegExp.$2, RegExp.$3);
// }
// if (re4a.test(str4a)) {
//     console.log('4a2', RegExp.$1, RegExp.$2, RegExp.$3);
// }

let str5 = '$a=b+c$', str5a = `$$
a = b + c;
$$`;
console.log(5, re5.test(str5), re5a.test(str5), re5b.test(str5));
console.log('5a', re5.test(str5a), re5a.test(str5a), re5b.test(str5a));
console.log('5b', str5.match(re5), str5.match(re5a), str5.match(re5b));
console.log('5b1', str5a.match(re5), str5a.match(re5a), str5a.match(re5b));