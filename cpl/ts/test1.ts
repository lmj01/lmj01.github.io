type Func1 = (...args: any) => any;
  
interface Function {
    applyParams(params: any): void;
}
Function.prototype.applyParams = function (params: any) {
    this(...params);
};

interface Function1 {
    append(params: any): void;
}

const func = function () { console.log(arguments); };
function myOtherFunc() {
    console.log(arguments);
}

func.applyParams([1, 2, 3]);
myOtherFunc.applyParams([1, 2, 3]);