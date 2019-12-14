class nonaddressable
{
public:
    typedef double useless_type;
private:
    useless_type operator&() const;
};

template <class T>
T * addressof(T & v)
{
    return reinterpret_cast<T *>(& const_cast<char&>(reinterpret_cast<const volatile char&>(v)));
}

int main()
{
    nonaddressable na;
    nonaddressable * naPtr = 
                        //&na;
                        addressof(na);
}
