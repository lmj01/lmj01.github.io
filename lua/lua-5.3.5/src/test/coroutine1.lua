function foo(a)
    print("foo", a)
    return coroutine.yield(2 * a)
end

co = coroutine.create(function (a, b)
    print("co-body-1", a, b)
    local r = foo(a + 1)
    print("co-body-2", r);
    local r, s = coroutine.yield(a+b, a-b)
    print("co-body-3", r, s)
    return b, "end"
end)

print("main-1", coroutine.resume(co, 1, 10))

print("main-2", coroutine.resume(co, "r"))

print("main-3", coroutine.resume(co, "x", "y"))

print("main-4", coroutine.resume(co, "x", "y"))