# [WebAssembly](https://webassembly.org/)

- [github WebAssembly Design Documents](https://github.com/WebAssembly/design)

EMSCripten pipeline

## 其他

### [Wasm is not quite a stack machine](https://purplesyringa.moe/blog/wasm-is-not-quite-a-stack-machine/)
执行2*3+5*7的机器执行，在register machine与stack machine机制下分别是这样的

| 步骤 | register | stack |
|-------|-------|-------|
| 1 | a=2 | push(2) |
| 2 | b=3 | push(3) |
| 3 | c=a*b | mul() |
| 4 | d=5 | push(5) |
| 5 | e=7 | push(7) |
| 6 | f=e*d | mul() |
| 7 | g=c+f | add() |

### [WebAssembly Troubles part 1: WebAssembly Is Not a Stack Machine ](http://troubles.md/posts/wasm-is-not-a-stack-machine/)
