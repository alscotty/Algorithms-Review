# @param {Integer[]} target
# @param {Integer[]} arr
# @return {Boolean}

# [1]

# [1,2]
# [2,1]

# [1,2,3]
# [1,3,2]
# [3,2,1]

# permutations, O(n!)

def can_be_equal(target, arr)
    return true if target == arr 
    permutations = [target,target.reverse]
    size = target.length

   (0...size).each do |idx|
        el = target[idx]
        (0...size).each do |pos|
            permutations << target[0...pos] + [el] + target[pos+1..-1]
        end
   end
    p permutations
    permutations.include?(arr)
end


# @param {Integer[]} target
# @param {Integer[]} arr
# @return {Boolean}

# permutations, O(n!)

def can_be_equal(target, arr)
    return true if target == arr 
    permutations = target.permutation(target.size).to_a
    
    permutations.include?(arr)
end

def can_be_equal(target,arr)
    target.sort == arr.sort
end