
module = {}

module.constant = "constant value"

function module.func1()
    io.write("public function\n")
end

local function func2()
    print("local function\n")
end

function module.func3()
    func2()
end

return module

