
--[[
-- 访问变量a的顺序
-- 1. a是当前函数的local变量
-- 2. a是外层函数的local变量，那么a是当前函数的upvalue
-- 3. a是全局变量
--]]
-- 
-- name 	args		desc
-- OP_GETUPVAL	A B C 		R(A):=UpValue[B]
-- OP_SETUPVAL  A B 		UpValue[B]:=R(A)
-- OP_GETTABUP	A B C		R(A):=UpValue[B][RK(C)]
-- OP_SETTABUP  A B C 		UpValue[A][RK(B)]:=RK(C)
-- 将Bx表示的常量表中的常量值装载到寄存器A中
-- 

local a = 0;
function f()
	local loc;
	a   = 1;
	loc = a;
	g   = 1;
	loc = g;
end


