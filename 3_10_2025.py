from typing import List

def getHitProbability(R: int, C: int, G: List[List[int]]) -> float:
  num_cells = R * C
  num_battleship_cells = 0
  
  for row in G:
    num_battleship_cells += len(list(filter(lambda el: el == 1, row)))
  
  
  return num_battleship_cells / num_cells


# Write any import statements here

def getWrongAnswers(N: int, C: str) -> str:
  wrong_string = ''
  
  for char in C:
    if char == 'A':
      wrong_string += 'B'
    elif char == 'B':
      wrong_string += 'A'
      
  return wrong_string


from typing import List
from collections import deque

# Write any import statements here

def getMaximumEatenDishCount(N: int, D: List[int], K: int) -> int:
  eaten_window = deque()  # Store the order of dishes in the window
  eaten_set = set()       # Set to check membership efficiently
  num_eaten = 0

  for dish in D:
    if dish not in eaten_set:
        if len(eaten_window) < K:
            eaten_window.append(dish)
            eaten_set.add(dish)
        else:
            # Remove the leftmost dish from the window and the set
            removed_dish = eaten_window.popleft()
            eaten_set.remove(removed_dish)

            # Add the new dish
            eaten_window.append(dish)
            eaten_set.add(dish)

        num_eaten += 1

  return num_eaten

from typing import List
# Write any import statements here

from typing import List
# Write any import statements here

def getMinCodeEntryTime(N: int, M: int, C: List[int]) -> int:
  time_taken = 0
  
  pos = 1
  
  for num in C:
    if pos == num:
      continue
    else:
      right_dist = abs(num - pos)
      left_dist = (N - right_dist) % N 
      time_taken += min([right_dist, left_dist])
      pos = num
  
  return time_taken


# Write any import statements here


def isUniform(num:int) -> bool:
  array_of_string_nums = list(str(num))
  matching = list(filter(lambda num: num == array_of_string_nums[0], array_of_string_nums))
  
  return len(array_of_string_nums) == len(matching)
  


def getUniformIntegerCountInInterval(A: int, B: int) -> int:
  uniform_num_count = 0
  
  for num in range(A,B+1):
    if isUniform(num):
      uniform_num_count += 1
  
  return uniform_num_count
