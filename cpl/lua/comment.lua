
-- xxx single line comment

--[[ 
  xxx 
  block comment
]] 

/* 
  like c comment
*/

-- 模块与包

print(package.path) -- 编译后执行的路径，并未安装
-- /usr/local/share/lua/x.y/?.lua;/usr/local/share/lua/x.y/?/init.lua;/usr/local/lib/lua/x.y/?.lua;/usr/local/lib/lua/x.y/?/init.lua;./?.lua;./?/init.lua
-- 添加环境变量 export LUA_PATH="~/lua/?.lua;;" 最后的;;表示加上原来默认的路径


-- register based vm 调用方式不一样
-- add a b c
-- stack based vm 像汇编代码一样的逻辑
-- push b
-- push c
-- add
-- mov a


