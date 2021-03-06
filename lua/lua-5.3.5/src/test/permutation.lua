
function permgen(a, n)
	n = n or #a
	if n <= 1 then 
		coroutine.yield(a)
	else
		for i=1, n do 
			a[n], a[i] = a[i], a[n]
			permgen(a, n-1)
			a[n], a[i] = a[i], a[n]
		end
	end
end

function prints(a)
	for i=1, #a do 
		io.write(a[i], "")
	end
	io.write("\n")
end

function perm(a)
	local co = coroutine.create(function() permgen(a) end)
	return function()
		local code, res = coroutine.resume(co)
		return res
	end
end

local count = 0;
for p in perm({"a", "b", "c", "d"}) do
	prints(p)
	count = count + 1
end

print('the total order is ', count)


