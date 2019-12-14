
-- assert type

local function add(a, b)
    assert(type(a) == "number", "a expects number")
    assert(type(b) == "number", "a expects number")
    return a + b 
end

-- error type
local function add2(a, b)
    error("add function error", 1)
    return a + b 
end

-- add(10)
--add2(10)

-- pcall type
if pcall(add, 10) then
    print("no error")
else 
    print("error on call")
    --error("add function err", 2)
end

-- xpcall type
function handler(err)
    print("handle error ", err)
end
function wrap()
    add2(10)
end

print(xpcall(wrap, handler)) 

