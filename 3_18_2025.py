class ParkingSystem:

    def __init__(self, big: int, medium: int, small: int):
        self.parking_lot = [big, medium, small]
        
    def addCar(self, carType: int) -> bool:
        car_type_index = carType - 1
        if self.parking_lot[car_type_index] > 0:
            self.parking_lot[car_type_index] = self.parking_lot[car_type_index] - 1
            return True
        else:
            return False


# Your ParkingSystem object will be instantiated and called as such:
# obj = ParkingSystem(big, medium, small)
# param_1 = obj.addCar(carType)

class Solution:
    def numTeams(self, rating: List[int]) -> int:
        count = 0
        n = len(rating)
        
        # Iterate through each element as the middle element of the team
        for j in range(1, n - 1):
            left_smaller = left_larger = 0
            right_smaller = right_larger = 0
            
            # Count elements smaller/larger on the left
            for i in range(j):
                if rating[i] < rating[j]:
                    left_smaller += 1
                elif rating[i] > rating[j]:
                    left_larger += 1
            
            # Count elements smaller/larger on the right
            for k in range(j + 1, n):
                if rating[k] > rating[j]:
                    right_larger += 1
                elif rating[k] < rating[j]:
                    right_smaller += 1
            
            # Count valid teams
            count += left_smaller * right_larger + left_larger * right_smaller
        
        return count


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
from collections import deque

class Solution:
    def buildSeenStack(root, seen_stack = deque(root)):
        while root:
            if root.left:
                seen_stack.appendleft(root.left)
                buildSeenStack(root.left, seen_stack)
            elif root.right:
                seen_stack.append(root.right)
                buildSeenStack(root.left, seen_stack)
        
        return seen_stack
            
    
    
    def increasingBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        seen_stack = buildSeenStack(root)
        print(seen_stack)
        
   
        
        
            