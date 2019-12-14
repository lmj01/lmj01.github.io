
-- name 	args		desc
-- OP_LOADKx	A 		R(A):=Kst(extra arg)
-- 当生成指令LOADK时，如果索引常量的id超出Bx的范围，262143时，
-- 将生成一个LOADKX指令来取代LOADK，接着继续生成一个EXTRAARG指令
-- 并用Ax来存放这个id
-- 



