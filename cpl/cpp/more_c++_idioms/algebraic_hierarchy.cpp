#include <iostream>

struct BaseConstructor
{
    BaseConstructor(int=0) {}
};

class RealNumber;
class Complex;
class Number;

class Number 
{
    friend class RealNumber;
    friend class Complex;
public:
    Number & operator = (const Number &n);
    Number (const Number &n);
    virtual ~Number();

    virtual Number operator+(Number const &n) const;
    void swap(Number &n) throw ();

    static Number makeReal(double r);
    static Number makeComplex(double rpart, double ipart);

protected:
    Number();
    Number(BaseConstructor);

private:
    void redefine(Number *n);
    virtual Number complexAdd(Complex const &n) const;
    virtual Number realAdd(RealNumber const &n) const;

    Number *rep;
    short referenceCount;
};

class Complex : public Number
{
    friend class RealNumber;
    friend class Number;

    Complex(double d, double e);
    Complex(const Complex &c);
    virtual ~Complex();

    virtual Number operator+(Number const &n) const;
    virtual Number realAdd(RealNumber const &n) const;
    virtual Number complexAdd(Complex const &n) const;

    double rpart, ipart;
};

class RealNumber : public Number
{
    friend class Complex;
    friend class Number;

    RealNumber(double r);
    RealNumber(const RealNumber &r);
    virtual ~RealNumber();

    virtual Number operator+(Number const &n) const;
    virtual Number realAdd(RealNumber const &n) const;
    virtual Number complexAdd(Complex const &n) const;

    double val;
};

/// used only by the letters 
Number::Number(BaseConstructor) : rep(0), referenceCount(1) {}

/// used by static factory functions
Number::Number() : rep(0), referenceCount(0) {}

/// used by user and static factory functions 
Number::Number(const Number &n) : rep(n.rep), referenceCount(0)
{
    std::cout << "Constructing a Number using Number::Number" << std::endl;
    if (n.rep) n.rep->referenceCount++;
}

Number Number::makeReal(double r)
{
    Number n;
    n.redefine(new RealNumber(r));
    return n;
}

Number Number::makeComplex(double rpart, double ipart)
{
    Number n;
    n.redefine(new Complex(rpart, ipart));
    return n;
}

Number::~Number()
{
    if (rep && --rep->referenceCount==0)
        delete rep;
}

Number & Number::operator=(const Number &n)
{
    std::cout << "Assigning a Number using Number::operator=" << std::endl;
    Number tmp(n);
    this->swap(tmp);
    return *this;
}

void Number::swap(Number &n) throw ()
{
    std::swap(this->rep, n.rep);
}

Number Number::operator+(Number const &n) const 
{
    return rep->operator+(n);
}

Number Number::complexAdd(Complex const &n) const 
{
    return rep->complexAdd(n);
}

Number Number::realAdd(RealNumber const &n) const 
{
    return rep->realAdd(n);
}

void Number::redefine(Number *n)
{
    if (rep && --rep->referenceCount==0) delete rep;
    rep = n;
}


Complex::Complex(double d, double e)
    : Number(BaseConstructor()),
    rpart(d), 
    ipart(e)
{
    std::cout << "Constructing a Complex" << std::endl;
}

Complex::Complex(const Complex &c)
    : Number(BaseConstructor()),
    rpart(c.rpart),
    ipart(c.ipart)
{
    std::cout << "Constructing a Complex using Complex::Complex" << std::endl; 
}

Complex::~Complex()
{
    std::cout << "Inside Complex::~Complex" << std::endl;
}

Number Complex::operator+(Number const &n) const 
{
    return n.complexAdd(*this);
}

Number Complex::realAdd(RealNumber const &n) const 
{
    std::cout << "Complex::realAdd" << std::endl;
    return Number::makeComplex(this->rpart+n.val, this->ipart);
}

Number Complex::complexAdd(Complex const &n) const 
{
    std::cout << "Complex::complexAdd" << std::endl;
    return Number::makeComplex(this->rpart + n.rpart, this->ipart + n.ipart);
}


RealNumber::RealNumber(double r)
    : Number(BaseConstructor()),
    val(r)
{
    std::cout <<"Constructing a RealNumber" << std::endl;
}

RealNumber::RealNumber(const RealNumber &r)
    : Number(BaseConstructor()),
    val(r.val)
{
    std::cout << "Constructing a RealNumber using RealNumber::RealNumber" << std::endl;
}

RealNumber::~RealNumber()
{
    std::cout << "Inside RealNumber::~RealNumber" << std::endl;
}

Number RealNumber::operator+(Number const &n) const 
{
    return n.realAdd(*this);
}

Number RealNumber::realAdd(RealNumber const &n) const 
{
    std::cout << "RealNumber::realAdd" << std::endl;
    return Number::makeReal(this->val + n.val);
}

Number RealNumber::complexAdd(Complex const &n) const 
{
    std::cout <<"RealNumber::complexAdd" << std::endl;
    return Number::makeComplex(this->val + n.rpart, n.ipart);
}

namespace std {
    template<>
    void swap(Number &n1, Number &n2)
    {
        n1.swap(n2);
    }
}

int main()
{
    Number n1 = Number::makeComplex(1, 2);
    Number n2 = Number::makeReal(10);
    Number n3 = n1 + n2;

    std::cout << "Finished: " << std::endl;

    return 0;
}