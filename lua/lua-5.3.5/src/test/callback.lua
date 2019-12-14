
local m = {}
local list = {name="hello", age = 12}
m.cb_print = function(id)
    print(id .. "-->" .. list[id])
end

m.add_list = function(key, value, cb)
    key = tostring(key)
    list[key] = value
    cb(key)
end

m.add_list("address", "chongqing", m.cb_print);

return m

