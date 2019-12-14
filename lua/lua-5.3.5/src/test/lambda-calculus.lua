
--[[
-- functional programming
-- higher-order functions 
-- anonymous functions
--]]

-- Identity 
-- (lambda)x.x
function identity(x)
    return x;
end

print("identity")
print(identity(identity) == identity)
print(identity)

-- Self Application Function
function self_apply(s)
    return s(s);
end

print("self apply")
print(self_apply(identity) == identity);
print(self_apply)

-- Function Application Function
function apply(f)
    return (function(a)
        return f(a);
    end);
end

print("apply")
print(apply(identity)(identity) == identity);
print(apply(identity)(identity));


-- Boolean Values
function TRUE(f)
    return (function(s)
        return f;
    end);
end

function FALSE(f)
    return (function(s)
        return s;
    end);
end

print("boolean value")
print(TRUE(identity)(apply) == identity)
print(FALSE(identity)(apply) == apply)

-- Condition
function COND(t)
    return (function(f)
        return (function(b)
            return b(t)(f);
        end);
    end);
end

print("condition ")
print(COND(identity)(apply)(TRUE) == identity);

-- NOT
function NOT(b)
    return b(FALSE)(TRUE);
end

print("not ")
print(NOT(TRUE)==FALSE);
print(NOT(NOT(TRUE)) == TRUE);

-- AND
function AND(x)
    return (function(y)
        return x(y)(FALSE);
    end);
end

print("and")
print(AND(TRUE)(TRUE) == TRUE);
print(AND(TRUE)(FALSE) == FALSE);
print(AND(FALSE)(TRUE) == FALSE);
print(AND(FALSE)(FALSE) == FALSE);

-- OR
function OR(x)
    return (function(y)
        return x(TRUE)(y);
    end);
end

print("or")
print(OR(TRUE)(TRUE) == TRUE);
print(OR(TRUE)(FALSE) == TRUE);
print(OR(FALSE)(TRUE) == TRUE);
print(OR(FALSE)(FALSE) == FALSE);


-- Natural Numbers
--
local zero = identity;
function succ(n)
    return (function(b)
        return b(FALSE)(n);
    end);
end

print("natural number")
one = succ(zero);
print(one)

two = succ(one);
print(two)

three = succ(two)
print(three)

four = succ(three);
print(four)

five = succ(four);
print(five)


six = succ(six);
print(six)

seven = succ(six);
print(seven)

eight = succ(seven);
print(eight)

nine = succ(eight);
print(nine)

function iszero(n)
    return n(TRUE);
end

print(iszero(zero) == TRUE)
print(iszero(one) == FALSE)

function pred(n)
    return iszero(n)(zero)(n(FALSE));
end

print(pred(one) == zero)

-- LOOP

function recursive(f)
    return (function(x)
        return f(function(dymmy) return x(x) end)
    end )(function(x)
        return f(function(dummy) return x(x) end)
    end)
end

function stepper(next_step)
    return (function(n)
        return COND(function(dummy) 
            return zero 
        end)(function(dummy)
            print("one step");
            return next_step(identity)(pred(n))
        end)(iszero(n))(identity)
    end)
end

print("loop")
recursive(stepper)(five)



