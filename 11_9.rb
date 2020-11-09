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
