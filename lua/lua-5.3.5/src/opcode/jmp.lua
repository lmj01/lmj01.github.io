
-- name 	    args		desc
-- OP_JMP     	A sBx 		pc+=sBx;if(A) close all upvalues >= R(A)+1
-- 跳转指令，sBx表示偏移量，被加在当前指令的下一条指令上
-- sBx为0，表示不跳转，为1表示跳转到下一条指令，-1表示重新执行当前指令
-- A>0，表示需要关闭所有从寄存器A+1开始的所有local变量，只对UpValue有效
--

::label::
goto label;

do 
    local a;
    function f() a = 1 end
end


