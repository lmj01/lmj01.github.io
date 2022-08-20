fb: fb.l fb.y
	bison -d fb.y
	flex fb.l
	cc -o $@ fb.tab.c lex.yy.c -lfl
