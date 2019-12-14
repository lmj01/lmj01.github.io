
-- name 	args		desc
-- OP_UNM	A B 		R(A):=-R(B)
-- OP_NOT	A B 		R(A):=notR(B)
-- 
-- 在编译或指令生成阶段，一元，二元操作符表达式的常量表达式折叠优化
-- const expression folding
-- 即直接计算结果，不生成相应的指令
--

local a = 1;
local b = not a;
local c = -a;
local d = 1 + 1;
local e = not 1;
