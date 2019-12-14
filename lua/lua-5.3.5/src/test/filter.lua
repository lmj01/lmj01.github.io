
function filter(t, a, r)
    print((t:gsub("[^" .. a .. "]", r)))
end

local allowed = "AbC"
local txt = "dDcCbBaA"

filter(txt, allowed, "")
filter(txt, allowed, "?")

s = "[" 
for i=0,255 do
    s = s .. "%" .. string.char(i) 
end
s = s .. "]"
print(s)
print("first type")
for m in ("xyzzy"):gmatch(s) do
    print(m)
end
print("second type")
for m in ("xyzzy"):gmatch( "[^" .. s:sub(2,-1)) do
    print(m)
end
print("third type")
string.gsub("abc", "[a]", print);
string.gsub("abc", "[%a]", print);

local function make_filter(valid_chars)
    return setmetatable({}, {
        __index = function(t, c)
            local r = string.find(valid_chars, c, 1, true) and c or ""
            t[c] = r
            return r 
        end,
        __call = function(t, s)
            return (string.gsub(s, '.', t))
        end
    })
end

local filter2 = make_filter("abc[]")
print(filter2("[abcABCabc]"))

