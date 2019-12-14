
local newProductor

function productor()
    local i = 0
    --while true do 
    while i < 10 do 
        i = i + 1
        send(i) -- send productor to consumer 
    end
end

function consumer()
    local res = true;
    while res do 
        local i = receive() -- get from productor
        print(i)
        print(type(i))
        if (type(i) ~= "number") then res = false end 
        -- assert(type(i) == "number", "expects a number")
    end
end

function receive()
    local status, value = coroutine.resume(newProductor)
    return value 
end

function send(x)
    coroutine.yield(x) -- send the productor and yield 
end

newProductor = coroutine.create(productor)
consumer()


