
gcc c-lib.c -I../ -fPIC -shared -o clib.so -Wall
gcc c-call-lua.c -I ../ -fPIC -Wall -L .. -llua -lm -ldl
