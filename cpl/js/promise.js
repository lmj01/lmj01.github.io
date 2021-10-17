const dataList = [
    {id: 1, name: 'name1'},
    {id: 2, name: 'name2'},
    {id: 3, name: 'name3'},
]
const asyncIterable = {
    [Symbol.asyncIterator]() {
        return {
            i: 0,
            next() {
                if (this.i < 3) {
                return Promise.resolve({ value: this.i++, done: false });
                }

                return Promise.resolve({ done: true });
            }
        }
    }
}
async function call1() {
    for await (let num of asyncIterable) {
        console.log(num)
    }
}
// method 2
function calcFunc(num1, num2) {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) resolve(num1 + num2)
        else reject('not success')
    })
}
async function call2() {
    for (let i = 0; i < 10; i++) {
        try {
            let res = await calcFunc(i, i+1)
            console.log('success', i, res)
        } catch(err) {
            console.log(err, i,)
        }
    }
}

// call1()
call2()