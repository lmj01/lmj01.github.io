
-- name 	    args		desc
-- OP_TEST     	A C 		if not(R(A)<=>C) then pc++
-- OP_TESTSET  	A B C 		if (R(B)<=>C) then R(A):=R(B) else pc++
-- test是testset的简化版，不需要赋值操作
-- 用于逻辑 and和or
--

local a,b,c;
a = b and c;

