def merge(nums1, m, nums2, n)
    max_space=m+n
    merged=[]
    nums1.delete(0)
     nums2.delete(0)
    
    while nums1.length>0 && nums2.length>0 
       nums1.first<nums2.first ? merged<<nums1.shift : merged<<nums2.shift
    end
    puts "merged #{merged}"
    puts "nums1 #{nums1}"
    puts "nums2 #{nums2}"
    merged+=nums1
    merged+=nums2
    merged
end

