
function string.split(str, delimiter)
    if str == nil or str == '' or delimiter == nil then
        return nil
    end
    local results = {}
    for match in (str .. delimiter):gmatch('(.-)' .. delimiter) do
        print(match)
        table.insert(results, match)
    end
    return results
end

--[[
-- (str .. delimiter):gmatch(s,pattern) is string.gmatch(s,pattern)
--]]


for i,v in pairs(string.split('a,b,c', ',')) do
    print(i, v)
end

    
