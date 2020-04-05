# @param {Integer[]} nums
# @return {Integer}
  #  (0...nums.length-1).each do |idx|
   #     curr_product =  nums[idx]*nums[idx+1]
    #    max = curr_product if curr_product > max 
    # end

def nums_product(nums)
   product = nums.inject {|el,acc| acc*el} 
end

def max_product(nums)
    max = nums.max
    
    (0...nums.length).each do |start_idx|
        (start_idx...nums.length).each do |end_idx|
            curr_product = nums_product(nums[start_idx..end_idx]) 
            max = curr_product if curr_product > max
        end
    end
    
    max
end

# @param {Integer} n
# @return {String[]}
def fizz_buzz(n)
    nums_arr = ("1"..n.to_s).to_a
    
    (0...nums_arr.length).each do |idx|
        if nums_arr[idx].to_i % 3 == 0 && nums_arr[idx].to_i % 5 == 0
            nums_arr[idx] = 'FizzBuzz'
        elsif nums_arr[idx].to_i % 3 == 0
            nums_arr[idx] = 'Fizz'
        elsif nums_arr[idx].to_i % 5==0
            nums_arr[idx] = 'Buzz'
        end
    end

    nums_arr
end

def is_power_of_three(n)
    test_num = 3
    
    while test_num < n
        test_num = test_num * 3
    end
    
    test_num == n || n == 1
end