
-- name 	args		desc
-- OP_GETTABLE	A B C 		R(A):=R(B)[RK(C)]
-- OP_SETTABLE  A B C		R(A)[RK(B)]:=RK(C)
-- 

local a = {};
a.x = 1;
local b = a.x;

