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


