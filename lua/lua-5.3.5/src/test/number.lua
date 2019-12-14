
lua_pushNumber(L, 3)
lua_toString(L, -1)
print("%s\n", lua_typename(L, lua_type(L, -1)))

lua_pushNumber(L, 3)
print("%d\n", lua_objlen(L, -1))
print("%d\n", lua_typename(L, lua_type(L, -1)))

