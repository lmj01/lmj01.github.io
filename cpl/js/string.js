const str1 = "I'am a Englisher"
const str2 = "我是中文的"
const str3 = "我是中文I'm a Englisher"

function string2Unicode(str) {
    // let strBuffer = new Uint16Array(str.length)
    // Array.prototype.forEach.call(strBuffer, function(el, idx, arr) {
    //     let code = str.charCodeAt(idx)
    //     // let code16 = code.toString(16)        
    //     // if (code < 0xfff) {
    //         // res += code
    //         arr[idx] = code
    //     // } else {
    //     //     // 非英文字母
    //     //     console.log(idx, code16)
    //     //     // res += `\\u${code16}`
    //     //     arr[idx] = `\\u${code16}`
    //     // }    
    //     // arr[idx] = str.charCodeAt(idx)
    // })
    // return new Uint8Array(strBuffer)
    let tmp1 = ''
    let tmp2 = ''
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i)
        let code16 = code.toString(16)
        if (code < 0xff) {
            tmp1 += str[i]
        } else if (code < 0xfff) {
            tmp1 += `\\u0${code16}`
        } else {
            tmp1 += `\\u${code16}`
        }
        console.log('charCodeAt', i, code, code16)
        let point = str.codePointAt(i)
        if (point < 0xffff) {
            tmp2 += String.fromCodePoint(point)
        } else {
            tmp2 += String.fromCodePoint(point)
        }
    }
    return `${tmp1}, ${tmp2}`
}

console.log(str1, ' to ', string2Unicode(str1))
console.log(str2, ' to ', string2Unicode(str2))
console.log(str3, ' to ', string2Unicode(str3))