def iter(num)
   num.to_s.split('').map {|s| s.to_i }.sum
end

def add_digits(num)
    while num > 9
       num = iter(num) 
    end
    num
end