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