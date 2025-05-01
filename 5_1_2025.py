import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def findEncryptedWord(s):
  if len(s) == 0:
    return ""
  
  result_string = ""
  
  s_length = len(s)
  
  if s_length % 2 == 0:
    mid_idx = math.floor(s_length / 2) - 1
  else:
    mid_idx = math.floor(s_length / 2)
    
  mid_char = s[mid_idx]
  
  return mid_char + findEncryptedWord(s[0:mid_idx]) + findEncryptedWord(s[mid_idx+1:])



# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

def printString(string):
  print('[\"', string, '\"]', sep='', end='')

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
    printString(expected)
    print(' Your output: ', end='')
    printString(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  s1 = "abc"
  expected_1 = "bac"
  output_1 = findEncryptedWord(s1)
  check(expected_1, output_1)

  s2 = "abcd"
  expected_2 = "bacd"
  output_2 = findEncryptedWord(s2)
  check(expected_2, output_2)

  # Add your own test cases here
  
  s3 = "abcxcba"
  expected_3 = "xbacbca"
  output_3 = findEncryptedWord(s3)
  check(expected_3, output_3)
  
  s4 = "facebook"
  expected_4 = "eafcobok"
  output_4 = findEncryptedWord(s4)
  check(expected_4, output_4)
  
  
  import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def balancedSplitExists(arr):
  arr.sort()
  print(arr)
  for idx in range(0, len(arr)):
    left_side = arr[0:idx]
    right_side = arr[idx:]
    if (sum(left_side) == sum(right_side)) and max(left_side) < min(right_side):
      return True
  
  return False










# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

def printString(string):
  print('[\"', string, '\"]', sep='', end='')

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
    printString(expected)
    print(' Your output: ', end='')
    printString(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  arr_1 = [1,5,7,1]
  expected_1 = True
  output_1 = balancedSplitExists(arr_1)
  check(expected_1, output_1)

  arr_2 = [12, 7, 6, 7, 6]
  expected_2 = False
  output_2 = balancedSplitExists(arr_2)
  check(expected_2, output_2)

  # Add your own test cases here
  
  
  import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def getBillionUsersDay(growthRates):
    def total_users_on_day(day):
        return sum(rate ** day for rate in growthRates)

    low, high = 1, 2000  # Search space for number of days

    while low < high:
        mid = (low + high) // 2
        if total_users_on_day(mid) >= 1_000_000_000:
            high = mid
        else:
            low = mid + 1

    return low





# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

def printInteger(n):
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
    printInteger(expected)
    print(' Your output: ', end='')
    printInteger(output)
    print()
  test_case_number += 1

if __name__ == "__main__":
  test_1 = [1.1, 1.2, 1.3]
  expected_1 = 79
  output_1 = getBillionUsersDay(test_1)
  check(expected_1, output_1)

  test_2 = [1.01, 1.02]
  expected_2 = 1047
  output_2 = getBillionUsersDay(test_2)
  check(expected_2, output_2)

  # Add your own test cases here
  