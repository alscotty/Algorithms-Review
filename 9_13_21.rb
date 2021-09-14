# @param {String} s
# @param {String} goal
# @return {Boolean}

def my_shift(str)
   str[1..-1] + str[0] 
end

def rotate_string(s, goal)
    max_shifts = s.length
    num_shifts = 0
    
    while num_shifts < max_shifts
       return true if s == goal
        s = my_shift(s)
        num_shifts += 1
    end
    
    false
end

# @param {Integer[]} nums
# @return {Integer[]}
def majority_element(nums)
    times = nums.length / 3.0
    
    counter_hash = Hash.new(0)
    final_set = Set.new()
    
    nums.each do |num|
       counter_hash[num] +=1
        if counter_hash[num] > times
           final_set.add(num) 
        end
    end
    
    final_set.to_a
end