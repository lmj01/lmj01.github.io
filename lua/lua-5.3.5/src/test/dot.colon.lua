
local test = {}
function test:func(arg1, arg2)
    print(arg1, arg2, self)
end

function test.func1(arg1, arg2)
    print(arg1, arg2, self)
end


print('arg1 \t arg2 \t self')

test:func(1,2) -- arg1=1,arg2=2                   1,2,table
test.func(1,2) -- self=1,arg1=2,arg2=nil          2,nil,1

test:func1(1,2) -- arg1=table,arg2=1              table,1,nil
test.func1(1,2) -- arg1=1,arg2=2                  1,2,nil

--[[
-- dot点运算符相当于静态方法
-- colon冒号相当于成员方法,省略第一个self参数
--]]
