

## Structural type System
it also called property-based type system), is a major class of type system in which type compatibility and equivalence are determined by the type's actual structure or definition and not by other characteristics such as its name or place of declaration

structural systems are used to determine if types are equivalent and whether a type is a subtype of another


## nominative systems
comparisons are based the names of the types or explicit declaration
Nominal typing is useful at preventing accidental type equivalence, which allows better type-safety than structural typing. The cost is a reduced flexibility, as, for example, nominal typing does not allow new super-types to be created without modification of the existing subtypes.

## duck typing
the part of the structure accessed at runtime is checked for compatibility

## languages use types
the language use
- typescript, use structural type system
- C++ template functions exhibit structural typing on type arguments
- Java & C#, use nominal type system

inheritance is not subtyping in structurally-typed OO languages
> Cook, W.R.; Hill, W.L.; Canning, P.S. (January 1990). "Inheritance is not subtyping". Proceedings of the Seventeenth Annual ACM Symposium on Principles of Programming Languages. San Francisco, California: 125–135. doi:10.1145/96709.96721. ISBN 978-0897913430.



## 
[Lambda the Ultimate, the programming languages weblog](http://lambda-the-ultimate.org/)
- Pierce, Benjamin C. (2002). "19.3". Types and Programming Languages. MIT Press. ISBN 978-0-262-16209-8.