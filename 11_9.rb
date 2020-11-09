# @param {Integer[]} arr
# @return {Boolean}

def valid_mountain_array(arr)
   peak = arr.max
    peak_index = arr.index(peak)
    
    return false if arr.first == peak || arr.last == peak
    
    (0...peak_index-1).each do |up_idx|
        return false unless arr[up_idx] < arr[up_idx+1]
    end
    
    (peak_index...arr.length-1).each do |down_idx|
       return false unless arr[down_idx] > arr[down_idx+1]
    end
    
    true
end

# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer[]}

def two_sum(nums, target)
    hash = Hash.new {|h,k| h[k] = []}
    
    nums.each_with_index do |num,i|
       hash[num] << i
    end
        puts hash
    hash.keys.each do |num|
        complement = target - num
        if num == complement && hash[num].length > 1
            return hash[num]
        elsif !hash[complement].empty? && num != complement
           return [hash[num][0],hash[complement][0]] 
        end
    end
    
end

# faster/simpler
def two_sum(nums, target)
  dict = {}
  nums.each_with_index do |n, i|
    if dict[target - n]
      return dict[target - n], i
    end
    dict[n] = i
  end
end