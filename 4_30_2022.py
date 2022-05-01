class Solution:
    def uniqueOccurrences(self, arr):
        counter_hash = {}
        
        for num in arr:
            if num in counter_hash:
                counter_hash[num] += 1
            else:
                counter_hash[num] = 1
        
        occurrences = counter_hash.values()
        my_set = set(occurrences)
        
        return len(occurrences) == len(my_set)            


arr = [1,2,2,1,1,3]
s = Solution()

print(s.uniqueOccurrences(arr))

class Solution:
    def minOperations(self, boxes: str) -> List[int]:
        moves_list = []
        
        for current_idx in range(0,len(boxes)):
            total_moves = 0
            
            left_side = boxes[0:current_idx]
            
            for idx in reversed(range(0,len(left_side))):
                print(f"left:{left_side[idx]}")
                if left_side[idx] == "1":
                    total_moves += current_idx - idx
            
            if current_idx + 1 < len(boxes):
                right_side = boxes[current_idx+1:]
                for idx, char in enumerate(right_side):
                    print(f"right:{char}")
                    if char == "1":
                        total_moves += (idx+1) 
                        print(idx+1)
                        print(f"increment right, total moves: {total_moves}")
                        
            moves_list.append(total_moves)
        
        return moves_list
        