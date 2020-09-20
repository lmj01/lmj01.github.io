/**
 * 生成预处理文件
 * gcc -std=c11 -E xxx.c
 * 
 * https://en.cppreference.com/w/c/preprocessor
 * https://en.cppreference.com/w/cpp/preprocessor
 * 
 */ 

#define StringPattern(instr) printf("the input string is:\t%s\n", #instr);
// some macros in compiler, __XXX__, XXX like FILE, LINE, FUNCTION, TIME, DATE 
#define PositionInFile(x) printf("the "#x" in %s,%s", __FILE__, __LINE__)
// the connect marco
#define Conn(x,y) x##y
#define ToString(x) #x 
// not found the document about this using style
#define ToChar(x) #@x

// the variadic macros ... and __VA_ARGS__
#define PR(x, ...) printf("Message" #x ":" __VA_ARGS__)
#define VA(x, y, ...) printf(#x" "#y" "#__VA_ARGS__)

// common function， generate getter or setter
#define NameFactory(name) Get##name 
#define GetNameInst(name) NameFactory(name)()

#define DeclareGetNameInst(type, name) type GetNameInst(name)
#define DefineGetNameInst(type, name) \
DeclareGetNameInst(type, name) \
{ \
    return name; \
}

typedef struct command {
    char *name;
    void (*func)(void);
}command;

#define COMMAND(name) { #name, name ## _command }

PR(1, "%s, %s\n", "Hello", "Macro");
VA(I, am, Superman);

StringPattern(abc);
PositionInFile(5);

int a = Conn(12, 34);
char *str = ToString(123456);
char a = ToChar(12345);

DeclareGetNameInst(int, Flower);
DefineGetNameInst(int, Flower)

command commands[] = {
    COMMAND(quit),
    COMMAND(help),
};
