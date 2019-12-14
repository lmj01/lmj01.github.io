
-- name 	args		desc
-- OP_TAILCALL	A B C 		return R(A)(R(A+1),...,R(A+B-1))
-- 与Call一样，C永远为0，
-- tailcall只对lua closure进行处理，对c closure与call没区别

return f();

