# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num):

class Solution(object):
    def gen_array(self, min_n,n):
        array = []
        num_to_add = min_n
        while num_to_add <= n:
            array.append(num_to_add)
            num_to_add += 1
        return array
        

    def guessNumber(self, n, min_n = 1):
        """
        :type n: int
        :rtype: int
        """
        nums_range_list = self.gen_array(min_n,n)
        middle_idx = len(nums_range_list) // 2
        middle_num = nums_range_list[middle_idx]
        current_guess_return_val = guess(middle_num)


        if current_guess_return_val == 0:
            return middle_num
        elif current_guess_return_val == -1:
            return self.guessNumber(middle_num-1)
        elif current_guess_return_val == 1:
            return self.guessNumber(n, middle_num)

    
    # Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def searchBST(self, root, val):
        if not root:
            return None

        if root.val == val:
            return root

        return self.searchBST(root.left,val) or self.searchBST(root.right,val)