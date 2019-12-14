
-- name 	args		desc
-- OP_SETLIST	A B C 		R(A)[(C-1)*FPF+i]:=R(A+i),1<=i<=B
-- 配合NEWTABLE来使用，初始化表的数组部分使用的
-- A为table的寄存器的位置，SETLIST将A紧接着的寄存器列表(1--B)
-- 中的值逐个设置给表的数组部分
-- C为是一个段值，数组很大时，会存储在多个段中，
-- 在lopcodes.h中定义了LFIELDS_PER_FLUSH每段中存储的数量
-- 如果超出C的表示范围，C会置0，会生成一个EXTRAARG指令，用Ax存储数量
--
-- 

local a = {1, 1, 1};

