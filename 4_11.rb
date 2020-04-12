# def merge(nums1, m, nums2, n)
#     max_space=m+n
#     merged=[]
#     nums1.delete(0)
#      nums2.delete(0)
    
#     while nums1.length>0 && nums2.length>0 
#        nums1.first<nums2.first ? merged<<nums1.shift : merged<<nums2.shift
#     end
#     puts "merged #{merged}"
#     puts "nums1 #{nums1}"
#     puts "nums2 #{nums2}"
#     merged+=nums1
#     merged+=nums2
#     merged
# end

# def merge(nums1, m, nums2, n)
  
#     while nums2.length > 0
#        merged_el = nums2.shift
#        (0...nums1.length).each do |idx|
#         if merged_el <= nums1[idx]
#             p "nums1[idx] #{nums1[idx]}"
#             p "merged_el #{merged_el}"
#               last_half = nums1[idx+1..-1]
#               nums1 = nums1[0...idx] + [merged_el] + last_half
#               p "SWEAPPPPP"
#           elsif idx == nums1.length-1
#               nums1[-1] = merged_el
#           end 
#        end
#     end
#     p nums1
# end


# merge([1,2,3,0,0,0],3,[2,5,6],3)
# expected answer: [1,2,2,3,5,6]

def remove_duplicates(nums)

    (0...nums.length).each do |curr_idx|
       curr_el = nums[curr_idx]
        (curr_idx+1...nums.length).each do |next_idx|
           next_el = nums[next_idx]
            nums=nums[0...next_idx]+nums[next_idx+1..-1] if curr_el == next_el
        end
        
    end
    
    nums
end

p remove_duplicates([1,1,2])