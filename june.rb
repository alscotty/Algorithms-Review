# recursive fibonacci, want nth number
# [1,1,2,3,5,8,11]

def nth_fib(n, memo = {})
    return if n < 1
    return 1 if n == 1 || n == 2

    if memo[n-1]
        next_small_fib = memo[n-1]
    else
        memo[n-1] = nth_fib(n-1, memo)
        next_small_fib = memo[n-1]
    end
   
    if memo[n-2]
        next_med_fib = memo[n-2]
    else
        memo[n-2] = nth_fib(n-2, memo)
        next_med_fib = memo[n-2]
    end

    next_small_fib + next_med_fib     
end

# wanted fib(6)
# fib(4) + fib(5)
# fib(3)+fib(2)   &&   fib(4) + fib(3)
# 

# puts nth_fib(1) #=> 1
# puts nth_fib(4) #=> 3
# puts nth_fib(6) #=> 8
# puts nth_fib(100) #=> memoize!!