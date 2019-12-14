
-- name 	    args		desc
-- OP_FORLOOP  	A sBx 		R(A)+=R(A+2);if (R(A)<?=R(A+1) then {pc+=sBx; R(A+3)=R(A)}
-- OP_FORPERP  	A sBx 		R(A)-=R(A+2);pc+=sBx;
-- 循环环分两类numeric和generic
-- 对使用者不可见的是FORPERP， 用于准备循环，生成for index, for limit, for step,
-- 局部变量i不是循环计数器，它只是初始值
--

local a;
for i = 1, 10 do 
    a = i;
end

