# Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.
# Example 1:
# Input: head = [1,2,6,3,4,5,6], val = 6
# Output: [1,2,3,4,5]
# Example 2:

# Input: head = [], val = 1
# Output: []
# Example 3:

# Input: head = [7,7,7,7], val = 7
# Output: []


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        prev_node = None
        current_node = head
        head_to_return = None

        while current_node:
            if current_node.val != val:
                if not prev_node:
                    head_to_return = current_node
                prev_node = current_node
                current_node = current_node.next
            else:
                next_node = current_node.next
                if prev_node:
                    prev_node.next = next_node
                current_node = next_node


        return head_to_return

        
        