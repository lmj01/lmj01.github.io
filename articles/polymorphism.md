# Polymorphism

多态是指一种相同的形式表现不同行为的概念，由Christopher Strachey在1976定义

- Ad-hoc Polymorphism, it is a dispatch mechanism, control moving through one named function is dispatched to various other functions without having to specify the exact function being called. Overloading allows multiple functions taking different types to be defined with the same name; the compiler or interpreter automatically ensures that the right function is called.
    - Ad-hoc Coercion特设强制多态
    - Ad-hoc Overloading特设重载多态 
- Universal Polymorphism
    - Parametric Polymorphism参数化多态,
    - Subtype Polymorphism子类型多态(Inclusion Polymorphism包含多态)

通常提到编程语言的多态，多指子类型多态。子类型Subtype与继承Inheritance是不同的概念，子类型一般用于表达接口的兼容性，继承则倾向于强调实现的重用。由B是A的子类型时，强调的是对A的操作都可以对B进行；由B继承A时，强调B用A的操作来实现自己的操作。

## 语言

- C，通过struct来模拟这些概念
    ```c
    struct animal {
        char name[20];
        void (*Speak)();
    }
    void AnimalConstructor(struct animal *this, const char*name, void(*fun)()) {
        strcpy(this->name, name);
        this->Speak = func;
    }
    void Introduce(struct animal *this) {
        printf("I'm a %s.\n", this->name);
    } 
    struct cat {
        struct animal base;
        char color[20];
    }
    struct dog {
        struct animal base;
    }
    void CatSpeak() {
        printf("miao---\n");
    }
    void CatConstructor(struct cat*this, const char*color) {
        AnimalConstructor((struct animal*)this, "cat", CatSpeak);
        strcpy(this->color, color);
    }
    ```
- C++，
    - 特设强制多态，是隐式转换的语义操作
    - 特设重载多态，是操作符重载，函数重载，模板的特化。
    - 子类型多态，标准的13.3 Virtual functions中 A class that declares or inherits a virtual function is called a polymorphic class. 
    - 参数化多态，是由隐式或显式的参数，使得相同名称的实体表现出不同的行为，就是模板。与其他语义中的泛型是有区别的。
- Javascript，
    ```javascript
    // operator + // 特设强制多态, JS has Type coercion    
    1 + 1 // Number + Number -> Number
    'hello' + ' world' // String + String -> String
    1 + 'up' // Number + String -> String

    // overloading function
    function volumeCuboid(length, breadth, height) {
        return length * breadth * height;
    }
    function volumeCube(length) {
        return length * length * length;
    }
    function calculateVolume(...args) {
        if (args.length==3) return volumeCuboid(...args);
        return volumeCube(args[0]);
    }
    // parameter polymorphism
    const doubled = [1,2,3].map(n=>n*2);
    const tostrings = [1,2,3].map(n=>`${n}`);
    // subtype polymorphism
    class Human {
        constructor(name) {
            this.name = name;
        }
        sayHi() {
            console.log(`Hi!, My name is ${name}`)
        }
    }
    class Developer extends Human {
        sayHi() {
            console.log('---');
        }
    }
    class Designer extends Human {}
    ```
- Java 



## 参考

- C. Strachey, Fundamental concepts in programming languages, Notes for the International Summer School in Computer Programming, Copenhagen (1967)
- [Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/)