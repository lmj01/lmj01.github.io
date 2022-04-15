using namespace std;
template<typename T>
struct Base
{
public:
    T& that()
    {
        T& derived = static_cast<T&>(*this);
        return derived;
    }
private:
    Base(){};
    friend T;
};

struct app1 : Base<app1> {
    void test1() {
        std::cout << "test1" << std::endl;
    }
};

