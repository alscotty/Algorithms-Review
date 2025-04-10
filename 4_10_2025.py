from typing import List

class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        seen_dict = {}
        
        for el in arr:
            if el not in seen_dict:
                seen_dict[el] = 0
            seen_dict[el] += 1
            
        num_occurrences_set = set()
        
        for num_seen in seen_dict.values():
            if num_seen in num_occurrences_set:
                return False
            else:
                num_occurrences_set.add(num_seen)
        
        return True
    
class Solution:
    def minOperations(self, boxes: str) -> List[int]:
        n = len(boxes)
        answer = [0] * n

        # Left to right pass
        count = 0  # Number of balls so far
        ops = 0    # Total operations so far
        for i in range(n):
            answer[i] += ops
            if boxes[i] == '1':
                count += 1
            ops += count  # Add current ball count for next step

        # Right to left pass
        count = 0
        ops = 0
        for i in range(n-1, -1, -1):
            answer[i] += ops
            if boxes[i] == '1':
                count += 1
            ops += count

        return answer
    
    
def fib(n, memo={}):
  if n == 0:
    return 0
  elif n == 1:
    return 1

  if n in memo:
    return memo[n]
  else:
    answer_for_num = fib(n-1, memo) + fib(n-2, memo)
    memo[n] = answer_for_num
    return answer_for_num
    
    
import math
# Add any extra import statements you may need here
# Add any helper functions you may need here

def get_count(x):
  return x['count']

def return_smallest_key(inputDict, n):
  # Write your code here
  stored_list = []
  for key in inputDict:
    val = inputDict[key]
    stored_list.append({ "name": key, "count": val })
  stored_list.sort(key=get_count)
  
  if n > 0 and n < len(stored_list):
    return stored_list[n - 1]['name']
  else:
    return None




# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

def printValue(n):
  print('[', n, ']', sep='', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printValue(expected)
    print(' Your output: ', end='')
    printValue(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  
  # Testcase 1 
  inputDict1 = {"laptop": 999,"smartphone": 999,"smart tv": 500,"smart watch": 300,"smart home": 9999999}
  n1 = 2
  expected_1 = "smart tv"
  output_1 = return_smallest_key(inputDict1, n1)
  check(expected_1, output_1)
  
  # Testcase 2 
  inputDict2 = {"a": 10,"b": 20}
  n2 = 0
  expected_2 = None
  output_2 = return_smallest_key(inputDict2, n2)
  check(expected_2, output_2)
  
  # Testcase 3 
  inputDict3 = {"a": 1,"b": 2,"c": 3,"d": 4,"e": 5}
  n3 = 6 
  expected_3 = None 
  output_3 = return_smallest_key(inputDict3, n3)
  check(expected_3, output_3)

  # Testcase 4
  inputDict4 =  {"a": 10,"b": 20,"c": 3,"d": 2,"e": 9}
  n4 = 1 
  expected_4 = "d" 
  output_4 = return_smallest_key(inputDict4, n4)
  check(expected_4, output_4)

  # Add your own test cases here
  
  
  import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def fill_in_the_blanks(input_lst):
  most_recent_val = None
  
  for idx in range(len(input_lst)):
    num = input_lst[idx]
    if num == None:
      input_lst[idx] = most_recent_val
    else:
      most_recent_val = num
      
  
  return input_lst









# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, ' Test #', test_case_number, sep='')
  else:
    print(wrongTick, ' Test #', test_case_number, ': Expected ', expected, sep='', end='')
    print(' Your output: ', output, end='')
    print()
  test_case_number += 1

if __name__ == "__main__":

  # Testcase 1
  input_lst_1 = [1,None,2,3,None,None,5,None]
  output_1 = fill_in_the_blanks(input_lst_1)
  expected_1 = [1, 1, 2, 3, 3, 3, 5, 5]
  check(expected_1, output_1)
  

  # Testcase 2
  input_lst_2 = [None, 8, None]
  output_2 = fill_in_the_blanks(input_lst_2)
  expected_2 = [None, 8, 8]
  check(expected_2, output_2)


  # Testcase 3
  input_lst_3 = [1,None,2]
  output_3 = fill_in_the_blanks(input_lst_3)
  expected_3 = [1, 1, 2]
  check(expected_3, output_3)
  

  # Testcase 4
  input_lst_4 = [5, None, None]
  output_4 = fill_in_the_blanks(input_lst_4)
  expected_4 = [5, 5, 5]
  check(expected_4, output_4)
  
  # Add your own test cases here
  
  
  import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def return_missing_balanced_numbers(input):
  seen_dict = {}
  
  for name in input:
    if name not in seen_dict:
      seen_dict[name] = 0
    seen_dict[name] += 1
    
  max_count = max(seen_dict.values())
  needed_dict = {}
  
  for key, val in seen_dict.items():
    if val < max_count:
      needed_dict[key] = max_count - val
  
  return needed_dict











# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

test_case_number = 1

def check(expected, output):
  global test_case_number
  result = False
  if expected == output:
    result = True
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    print(expected)
    print(' Your output: ', end='')
    print(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  
  # Testcase 1 
  input_1 = ['a','b','abc','c','a']
  output_1 = return_missing_balanced_numbers(input_1)
  expected_1 = {'b':1,'abc':1,'c':1}
  check(expected_1, output_1)

  # Testcase 2 
  input_2 = [1,3,4,2,1,4,1]
  output_2 = return_missing_balanced_numbers(input_2)
  expected_2 = {2:2,3:2,4:1}
  check(expected_2, output_2) 
  
  # Testcase 3
  input_3 = [4,5,11,5,6,11]
  output_3 = return_missing_balanced_numbers(input_3)
  expected_3 = {4:1,6:1}
  check(expected_3, output_3)
  
  # Add your own test cases here
  