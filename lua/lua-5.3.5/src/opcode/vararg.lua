
-- name 	    args		desc
-- OP_VARARG	A B 		R(A),R(A+1),...,R(A+B-2):=vararg
-- vararg是运算符...，将B-1个参数拷贝到从寄存器A开始的后续寄存器
-- 如果不足，nil补充，如果B为0，表示拷贝实际的参数数量
--

local a = ...;

f(...);

