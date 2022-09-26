class Solution(object):
    def sortArrayByParity(self, nums):
        next_swapped_idx = 0
        idx = 0
        
        while idx < len(nums):
            num = nums[idx]
            if num % 2 == 0:
                temp = nums[next_swapped_idx]
                nums[next_swapped_idx] = num
                nums[idx] = temp
                next_swapped_idx+=1
            idx += 1
            
        return nums
        
        
        
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        


