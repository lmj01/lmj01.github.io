%{
#include"fb.tab.h"
int yylval;
%}
%%
"+" {return ADD;}
"-" {return SUB;}
"*" {return MUL;}
"/" {return DIV;}
"|" {return ABS;}
"(" {return OP;}
")" {return CP;}
[0-9]+ { yylval = atoi(yytext); return NUMBER;}
\n {return EOL;}
[^ \t\v\f\r\f\n]+ {return EOL;}
"//".* {}
. {}
%%
