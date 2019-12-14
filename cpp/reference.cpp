
#include <iostream>
#include <utility>

void reference(int& v) {
    std::cout << "argument is lvalue" << std::endl;
}
void reference(int&& v) {
    std::cout << "argumnet is rvalue" << std::endl;
}
template<typename T>
void pass(T&& v) {
   std::cout << "common parameter:";
   reference(v);
    
   std::cout << "std::move parameter:";
   reference(std::move(v));

   std::cout << "std::forward parameter:";
   reference(std::forward<T>(v));

   std::cout << "static_cast parameter:";
   reference(static_cast<T&&>(v));
}
int main() {
    std::cout << "pass rvalue" << std::endl;
    pass(1);

    std::cout << "pass lvalue" << std::endl;
    int v = 1;
    pass(v);
    int&& v2 = 1;
    std::cout << "pass rvalue" << std::endl;
    pass(v);

    return 0;
}
