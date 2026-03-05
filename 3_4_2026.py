from typing import List, Optional


class ListNode:
    def __init__(self, val: int = 0, next: "Optional[ListNode]" = None):
        self.val = val
        self.next = next


# 1. Two Sum
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        index_by_value = {}

        for i, num in enumerate(nums):
            complement = target - num
            if complement in index_by_value:
                return [index_by_value[complement], i]
            index_by_value[num] = i

        return []


# 2. Valid Parentheses
class Solution:
    def isValid(self, s: str) -> bool:
        stack: List[str] = []
        matching = {")": "(", "]": "[", "}": "{"}

        for ch in s:
            if ch in matching.values():
                stack.append(ch)
            elif ch in matching:
                if not stack or stack[-1] != matching[ch]:
                    return False
                stack.pop()

        return not stack


# 3. Merge Two Sorted Lists
class Solution:
    def mergeTwoLists(
        self,
        list1: Optional[ListNode],
        list2: Optional[ListNode],
    ) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        tail.next = list1 or list2
        return dummy.next


# 4. Binary Search
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return -1

