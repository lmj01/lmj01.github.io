
-- name 	    args		desc
-- OP_TFORCALL 	A C 		R(A+3),...,R(A+2+C):=R(A)(R(A+1),R(A+2))
-- OP_TFORLOOP 	A sBx 		if R(A+1)~=nil then {R(A)=R(A+1);pc+=sBx;}
--

for i,v in 1,2,3 do
    a = 1;
end

