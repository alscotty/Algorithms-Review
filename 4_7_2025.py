import math
from typing import List

def zipper_lists(head_1, head_2):
  tail = head_1
  current_1 = head_1.next
  current_2 = head_2
  count = 0
  while current_1 is not None and current_2 is not None:
    if count % 2 == 0:
      tail.next = current_2
      current_2 = current_2.next
    else:
      tail.next = current_1
      current_1 = current_1.next
    tail = tail.next
    count += 1
    
  if current_1 is not None:
    tail.next = current_1
  if current_2 is not None:
    tail.next = current_2
    


from collections import deque

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.left = None
#     self.right = None

def depth_first_values(root):
  stack = deque([root])
  stored_values = []

  while len(stack) > 0:
    current_node = stack.pop()
    if not current_node:
      break
    stored_values.append(current_node.val)
    
    if current_node.right:
      stack.append(current_node.right)
    if current_node.left:
      stack.append(current_node.left)
    

  return stored_values


from collections import deque
# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.left = None
#     self.right = None

def breadth_first_values(root):
  queue = deque([root])
  stored_values = []

  while len(queue) > 0:
    current_node = queue.popleft()
    if not current_node:
      break
    stored_values.append(current_node.val)

    if current_node.left:
      queue.append(current_node.left)
  
    if current_node.right:
      queue.append(current_node.right)

  return stored_values

from collections import deque

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.left = None
#     self.right = None

def tree_sum(root):
  stack = [root]
  sum = 0

  while len(stack) > 0:
    current_node = stack.pop()
    if not current_node:
      break
    sum += current_node.val
    if current_node.left:
      stack.append(current_node.left)
    if current_node.right:
      stack.append(current_node.right)

  return sum
  
  
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        counter = {}
        majority_num = math.ceil(len(nums) / 2)
        
        for num in nums:
            if num not in counter:
                counter[num] = 0
            counter[num] += 1
            if counter[num] >= majority_num:
                return num
            
        

def binary_search(nums: List[int], target: int, idx_offset = 0):
    if len(nums) == 0:
        return -1
    elif len(nums) == 1:
        if nums[0] == target:
            return idx_offset
        else:
            return -1
    mid_idx = math.floor(len(nums) / 2)
    mid_el = nums[mid_idx]
    
    if mid_el == target:
        return mid_idx + idx_offset
    elif mid_el > target:
        print('searching right')
        print(nums[0:mid_idx-1])
        return binary_search(nums[mid_idx+1:], target, mid_idx)
    else:
        print('searching left')
        print(nums[0:mid_idx-1])
        return binary_search(nums[0:mid_idx-1], target, mid_idx)
        
    

             
print(binary_search([1, 2, 3, 4, 5], 3))
print(binary_search([1, 2, 3, 4, 5], 6))
print(binary_search([1, 2, 3, 4, 5], 1))
print(binary_search([1, 2, 3, 4, 5], 5))