
function myfunc()
    print(debug.traceback("Stack trace--begin"))
    print(debug.getinfo(1))
    print("Stack trace--end")
    return 10
end

myfunc()
print(debug.getinfo(1))

print('------------------------------')

function newCounter()
    local n = 0
    local k = 0
    return function()
        k = n
        n = n + 1
        return n
    end
end

counter = newCounter()
print(counter())
print(counter())

local i = 1;
repeat
    name, val = debug.getupvalue(counter, i)
    if name then 
        print("index", i, name, "=", val)
        if (name == "n") then 
            debug.setupvalue(counter, 2, 10)
        end
        i = i + 1
    end 
until not name 
print(counter())

