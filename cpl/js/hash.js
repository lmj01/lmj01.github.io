// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr; // (hash << 5 - hash)+char  is the same as hash * 31 + char
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

hashCode1 = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)

const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
}

TSH = s=>{for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9}

function getHash(str, algo = "SHA-256") {
    let strBuf = new TextEncoder('utf-8').encode(str);
    return crypto.subtle.digest(algo, strBuf)
      .then(hash => {
        window.hash = hash;
        // here hash is an arrayBuffer, 
        // so we'll connvert it to its hex version
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
    });
}

let strList = [
    'SALES_DIRECTOR', // 销售总监
    'REGIONAL_MANAGER', // 1大区经理
    'PROVINCIAL_MANAGER', // 省区经理
    'CITY_MANAGER', // 城市经理
    'AGENT', // 代理商
]
strList.forEach(str => {
    console.log(`${str}, length is ${str.length}, \n hashcode is ${str.hashCode()}, ${hashCode1(str)}, ${cyrb53(str)}`)
})
console.log('-------------------------', Date.now())
strList.forEach((str,idx) => {
    const begin = Date.now()
    const res = cyrb53(str, idx)
    const end = Date.now()    
    console.log(`${str}, length ${str.length}, hash is ${res}, cost is ${end - begin}`)
})
console.log('-------------------------', Date.now())
strList.forEach(str => {
    const begin = Date.now()
    const res = TSH(str)
    const end = Date.now()    
    console.log(`${str}, length ${str.length}, hash is ${res}, cost is ${end - begin}`)
})
console.log('-------------------------', Date.now())
if (false) {
    strList.forEach(str => {
        const begin = Date.now()
        const res = getHash(str)
        const end = Date.now()    
        console.log(`${str}, length ${str.length}, hash is ${res}, cost is ${end - begin}`)
    })
}   