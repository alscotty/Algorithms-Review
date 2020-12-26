# @param {Integer[]} bits
# @return {Boolean}

# one bit character, always: 0

def is_one_bit_character(bits)
    
    while bits.length > 1
       if bits[0..1] == [1,0] ||  bits[0..1] == [1,1]
          2.times {bits.shift}  
       else
           bits.shift
       end
    end
    
    bits == [0]
end

