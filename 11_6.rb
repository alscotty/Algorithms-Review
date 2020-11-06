# @param {Integer[]} nums
# @return {Integer}

def find_peak_element(nums)
    return 0 if nums.size == 1
    
    peak = nil
    
    (0...nums.length).each do |i|
       if nums[i-1] && nums[i+1] && nums[i] > nums[i-1] && nums[i] > nums[i+1]
          peak = i 
       elsif !nums[i-1] && nums[i+1] && nums[i] > nums[i+1]
           peak = i
       elsif !nums[i+1] && nums[i-1] && nums[i] > nums[i-1]
           peak = i
       end
    end
    
    peak
end

# @param {String} s
# @return {Boolean}

def build_repeat(s,l)
   concat = ""
    
    while concat.length < l
       concat += s 
    end
    
    concat
end

def repeated_substring_pattern(str)
    len = str.length
    
    (0...len).each do |start_i|
       (start_i...len-1).each do |end_i|
         word = str[start_i..end_i]
         if len % word.length == 0
            return true if build_repeat(word,len) == str
         end
       end
    end
    
    false
end