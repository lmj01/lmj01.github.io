type AnyTest2Func = (...args: any) => any;
function c2(e:any) {
    return e;
}
function c(e:any) {
    return 0 === e.length ? c2 : 1 === e.length ? e[0] : function(t:any) {
        return e.reduce((function(e:any, t:any) {
            return t(e)
        }
        ), t)
    }
}
interface TypeM92a2u {
    lift:(any)=>TypeM92a2u,
    pipe:() => any,
}
const m92a2u:TypeM92a2u = new class {
    constructor() {
        function e(e:any) {
            this._isScalar = false;
            if (e) this._subscribe = e;
        }
        e.prototype.lift = function(t:any) {
            var n = new e(undefined);
            return n.source = this,
            n.operator = t,
            n
        }
        e.prototype.pipe = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return 0 === e.length ? this : c(e)(this)
        }
    }
}();

console.log('1', m92a2u)
console.log('2', m92a2u.prototype)
console.log('3', m92a2u.prototype.toString())
// console.log('4', m92a2u.lift);