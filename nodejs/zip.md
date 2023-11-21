# 压缩
> js压缩

## jszip

```js
new Promise(()=>{

}).then(res=>{
    // 字符串
    if (res.byteLength < 100) {
        const tmp = JSON.parse(new TextDecoder().decode(new Uint8Array(res)));
    } else {
        const zip = new JSZip();
        zip.loadAsync(res).then(zip=>{
            let i = 0;
            for (const fname in zip.files) {
                zip.file(fname).async('arraybuffer').then(img=>{
                    const blob = new Blob([img]);
                    i++;
                    if (i == 4) {
                    }
                });    
            }
        });
    }
})
```
