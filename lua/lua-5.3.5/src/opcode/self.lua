
-- name 	    args		desc
-- OP_SELF  	A B C 		R(A+1):=R(B); R(A) = R(B)[RK(C)]
-- 运算符 : ，从寄存器B表示的table中，取出C作为key的closure，存入寄存器A中
-- 再将table自己存入到寄存器A+1中，为调用closure做准备
--
-- 运算符:是一个优化的操作，比起常规的表达式要少一个指令
--

a:b();

-- equal to 

a.b(a);

