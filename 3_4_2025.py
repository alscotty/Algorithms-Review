from typing import List


class Solution:
    def toLowerCase(self, s: str) -> str:
        return s.lower()
    
# brute force, works but not efficient, O(n^2)
class Solution:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        num_divisible_pairs = 0
        
        for first_index, first_value in enumerate(time):
            for second_index, second_value in enumerate(time):
                if (first_index != second_index) and ((first_value + second_value) % 60 == 0):
                    num_divisible_pairs += 1    
                    
        
        return int(num_divisible_pairs / 2)
    

# O(n) solution, store remainders in a dictionary
class Solution:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        remainder_count = {}
        num_divisible_pairs = 0
        
        for t in time:
            remainder = t % 60  # Get remainder when divided by 60
            complement = (60 - remainder) % 60  # Find its complement that makes sum 60
            
            if complement in remainder_count:
                num_divisible_pairs += remainder_count[complement]  # Count valid pairs
            
            # Store remainder count
            remainder_count[remainder] = remainder_count.get(remainder, 0) + 1
        
        return num_divisible_pairs
    
# basic method, for <-10k digits
class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        string_num = ""
        for single_num in num:
            string_num += f"{single_num}"
        
        int_num = int(string_num)
        new_sum = int_num + k
        new_sum_string = str(new_sum)
        
        array_num = []
        for char in new_sum_string:
            array_num.append(int(char))
        
        return array_num
    
    
from typing import List

class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        carry = k
        i = len(num) - 1
        
        while i >= 0 or carry > 0:
            if i >= 0:
                carry += num[i]
                num[i] = carry % 10  # Keep only the last digit
            else:
                num.insert(0, carry % 10)  # Insert at the front (for extra digits)
            carry //= 10  # Carry forward
            i -= 1
            
        return num
