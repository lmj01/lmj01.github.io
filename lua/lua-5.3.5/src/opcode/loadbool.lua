
-- name 	args		desc
-- OP_LOADBOOL	A B C 		R(A):=(Bool)B; if (C) pc++
-- 将B的Boolean值装载到寄存器A中，B使用0表示false，1表示true，
-- C也是一个Boolean值，如果C为true，跳过下一个指令
-- 

local a = true;
local b = 1 < 2;
--[[
-- 直接上会认为是先得出 1 < 2 的Boolean值，再赋值给b，
-- 实际上的逻辑是
--
-- 1  [1] LT 		1 -1 -2 ; 1 2
-- 2  [1] JMP		0 1	; to 4
-- 3  [1] LOADBOOL	0 0 1
-- 4  [1] LOADBOOL	0 1 0
-- 5  [1] RETURN 	0 1
-- constants (2) for xxx:
-- 1	1
-- 2 	2
-- 注意到，3和4的指令的作用，如果小于直接跳到4， 如果大于执行3，且跳过下一条指令4
-- 逻辑或关系表达式时故意设计成这样的，是优化了if或循环语句，
--   不用求出值后再判断跳转路径，而是计算过程中就开始跳转，节省很多指令
-- 伪码为
-- local a;
-- if 1 < 2 then
-- 	a = true;
-- else 
-- 	a = false;
-- end
-- 
--]]
