
-- class
--
Shape = { area = 0 }

function Shape:new (o, side)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    side = side or 0
    self.area = side * side 
    return o
end

function Shape:printArea()
    print("area is ", self.area)
end

test = Shape:new(nil, 10)
test:printArea()

-- inherit
Square = Shape:new()

function Square:new(o, side)
    o = o or Shape:new(o, side)
    setmetatable(o, self)
    self.__index = self 
    return o
end

function Square:printArea()
    print("Square area is ", self.area)
end

test1 = Square:new(nil, 10)
test1:printArea()

Rectangle = Shape:new()
function Rectangle:new(o, width, height)
    o = o or Shape:new(o)
    setmetatable(o, self)
    self.__index = self 
    self.area = width * height
    return o
end

function Rectangle:printArea()
    print("Rectangle area is ", self.area)
end

test2 = Rectangle:new(nil, 10, 20)
test2:printArea()


