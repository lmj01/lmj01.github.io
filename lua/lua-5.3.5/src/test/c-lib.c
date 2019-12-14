
/*
 * this is a c libaray template for lua
 *
 * step 1 write the lua function
 * step 2 construct the struct of the c lib infomation
 * step 3 definition a function to call the struct
 *
 * */

#include <stdio.h>
#include <math.h>
#include <stdarg.h>
#include <stdlib.h>
#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>

/*
 * lua c register function prototype is 
 * typedef int (*lua_CFunction)(lua_State *L)
 * */
static int mj_sin(lua_State *L)
{
	double d = luaL_checknumber(L, 1);

	lua_pushnumber(L, sin(d));
	//lua_pushstring(L, "test");
	// can return multi-result, do this
	// lua_pushxxx

	return 1; // number of results
}

static const struct luaL_Reg lib[] = {
	{"mjsin", mj_sin},
	{NULL, NULL}
};

extern int luaopen_clib(lua_State *L)
{
	luaL_newlib(L, lib);
	return 1;
}

