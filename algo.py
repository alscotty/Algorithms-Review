
# Cafeteria
# Level 1
# Time limit: 5s
# In progress
# A cafeteria table consists of a row of 
# 𝑁
# N seats, numbered from 
# 1
# 1 to 
# 𝑁
# N from left to right. Social distancing guidelines require that every diner be seated such that 
# 𝐾
# K seats to their left and 
# 𝐾
# K seats to their right (or all the remaining seats to that side if there are fewer than 
# 𝐾
# K) remain empty.
# There are currently 
# 𝑀
# M diners seated at the table, the 
# 𝑖
# ith of whom is in seat 
# 𝑆
# 𝑖
# S 
# i
# ​
#  . No two diners are sitting in the same seat, and the social distancing guidelines are satisfied.
# Determine the maximum number of additional diners who can potentially sit at the table without social distancing guidelines being violated for any new or existing diners, assuming that the existing diners cannot move and that the additional diners will cooperate to maximize how many of them can sit down.
# Please take care to write a solution which runs within the time limit.
# Constraints
# 1
# ≤
# 𝑁
# ≤
# 1
# 0
# 1
# 5
# 1≤N≤10 
# 15
 
# 1
# ≤
# 𝐾
# ≤
# 𝑁
# 1≤K≤N
# 1
# ≤
# 𝑀
# ≤
# 5
# 0
# 0
# ,
# 0
# 0
# 0
# 1≤M≤500,000
# 𝑀
# ≤
# 𝑁
# M≤N
# 1
# ≤
# 𝑆
# 𝑖
# ≤
# 𝑁
# 1≤S 
# i
# ​
#  ≤N
# Sample test case #1
# N = 10
# K = 1
# M = 2
# S = [2, 6]
# Expected Return Value = 3
# Sample test case #2
# N = 15
# K = 2
# M = 3
# S = [11, 6, 14]
# Expected Return Value = 1
# Sample Explanation
# In the first case, the cafeteria table has 
# 𝑁
# =
# 1
# 0
# N=10 seats, with two diners currently at seats 
# 2
# 2 and 
# 6
# 6 respectively. The table initially looks as follows, with brackets covering the 
# 𝐾
# =
# 1
# K=1 seat to the left and right of each existing diner that may not be taken.
#   1 2 3 4 5 6 7 8 9 10
#   [   ]   [   ]
# Three additional diners may sit at seats 
# 4
# 4, 
# 8
# 8, and 
# 1
# 0
# 10 without violating the social distancing guidelines.
# In the second case, only 
# 1
# 1 additional diner is able to join the table, by sitting in any of the first 
# 3
# 3 seats.

from typing import List
# Write any import statements here
# N length of the row
# K required empty seats on right and left
# M total num of diners
# S array of positions of already seated diners

def generated_seated_list(N,S):
  seated_list = []
  for idx in range(0,N):
    if (idx+1) in S:
      seated_list.append(True)
    else:
      seated_list.append(False)
  print(seated_list)
  print(len(seated_list))
  return seated_list

# return the total diners that can be seated!
def getMaxAdditionalDinersCount(N: int, K: int, M: int, S: List[int]) -> int:
  additional_num_seated = 0
  current_seated_list = generated_seated_list(N,S)
  
  for seat_idx in range(0, N):
    seat_min = max(0, seat_idx - K)
    seat_max = min(seat_idx + K, N) + 1
    seat_window = current_seated_list[seat_min:seat_max]
    
    if not True in seat_window:
      current_seated_list[seat_idx] = True
      additional_num_seated += 1
    
  return additional_num_seated

