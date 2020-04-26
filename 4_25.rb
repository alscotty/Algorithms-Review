# @param {Integer[]} nums1
# @param {Integer} m
# @param {Integer[]} nums2
# @param {Integer} n
# @return {Void} Do not return anything, modify nums1 in-place instead.

# continually compare the first elements of each array, add in accordingly
#
# regular merge sort helper method
# merged=[] 
# while nums1.length && num2.length
#   nums1.first >= nums2.first ? merged<<nums2.shift : merged<<nums1.shift
# end
# merged.concat(nums1).concat(nums2)

# Input:
# nums1 = [1,2,3,0,0,0], m = 3
# nums2 = [2,5,6],       n = 3


def merge(nums1, m, nums2, n)
  num_inserts = n
    
    nums1.each_with_index do |num1,idx|
       if nums2.first <= num1
           p 'swapp'
          nums1 = nums1[0...idx] + [nums2.shift] + nums1[idx...-1] 
       end
    end
    
    if nums2.length
       length = nums2.length
        nums1= nums1[0...length] + nums2
    end
    
    
    p nums1
end



# big O/edge cases/optimize


# @param {Integer[]} nums
# @return {Integer}
def single_number(nums)
   hash=Hash.new(0)
    nums.each do |num|
       hash[num]+=1 
    end
    hash.invert[1]
end

# @param {Integer[]} nums1
# @param {Integer[]} nums2
# @return {Integer[]}

def intersect(nums1, nums2)

    if nums1.length >= nums2.length
        min_arr = nums2
        max_arr =  nums1
    else
        min_arr = nums1
        max_arr = nums2
    end
    
    size = max_arr.length
    while min_arr.length>0
        
       if min_arr.all? {|el| max_arr.include?(el)}
           return min_arr
       else
          min_arr.pop 
       end
    end
    []
end

# @param {Integer[]} nums
# @return {Void} Do not return anything, modify nums in-place instead.

def move_zeroes(nums)
  zero_count = nums.count(0)
    nums.delete(0)
    nums.concat(Array.new(zero_count,0))
    
end 