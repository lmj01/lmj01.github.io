-- simple model

file = io.open("lua.txt", "a")
io.output(file)
io.write("-- test io file")
io.close(file)

file = io.open("lua.txt", "r")
io.input(file)
print(io.read())
io.close(file)

-- complete model

file = io.open("lua.txt", "r")
print(file:read())
file:close()

file = io.open("lua.txt", "a")
file:write("-- test complete model")
file:close()

