
-- name 	args		desc
-- OP_NEWTABLE	A B C 		R(A):={}(size=B,C)
-- 在寄存器A处创建一个table对象，B和C分别用来存储table的数组部分和hash部分的初始大小
-- 初始大小是在编译期计算出来并生成到这个指令中的，避免table填充数据时造成rehash问题
-- B和C使用 floating point byte来表示成(eeeeexxx)的二进制形式
-- 其实际值为(1xxx)*2^(eeeee-1)
-- 

local a = {};
local b = {a};

