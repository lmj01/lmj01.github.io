
-- name 	    args		desc
-- OP_EQ     	A B C 		if((RK(B)==RK(C))~=A) then pc++
-- OP_LT     	A B C 		if((RK(B)< RK(C))~=A) then pc++
-- OP_LE     	A B C 		if((RK(B)<=RK(C))~=A) then pc++
-- 关系指令
-- 常与JMP指令配合使用，实现程序的跳转指令
-- test指令与jmp配合使用时，都会接着生成两个分支的指令区域
-- true的指令与false的指令
-- 当为true时，pc++，跳过后面的JMP指令，继续执行
-- 当为false时，执行JMP指令，跳转到false的指令区域
-- 
--

local a,b,c;
a = b < c;

