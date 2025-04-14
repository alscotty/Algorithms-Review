import math
# Add any extra import statements you may need here
# Add any helper functions you may need here




def return_mismatched_words(str1, str2):
  words1 = str1.split(" ")
  words2 = str2.split(" ")
  words1_set = set(words1)
  words2_set = set(words2)
  
  words1 = filter(lambda word1: word1 not in words2_set, words1)
  words2 = filter(lambda word2: word2 not in words1_set, words2)
  
  return list(words1) + list(words2)
    
    
    
    
    
    
    
    
    
    
# These are the tests we use to determine if the solution is correct.
# You can add your own at the bottom.

def printStringList(array):
  size = len(array)
  print('[', end='')
  for i in range(size):
    if i != 0:
      print(', ', end='')
    print(array[i], end='')
  print(']', end='')

test_case_number = 1

def check(expected, output):
  global test_case_number
  expected_size = len(expected)
  output_size = len(output)
  result = True
  if expected_size != output_size:
    result = False
  for i in range(min(expected_size, output_size)):
    result &= (output[i] == expected[i])
  rightTick = '\u2713'
  wrongTick = '\u2717'
  if result:
    print(rightTick, 'Test #', test_case_number, sep='')
  else:
    print(wrongTick, 'Test #', test_case_number, ': Expected ', sep='', end='')
    printStringList(expected)
    print(' Your output: ', end='')
    printStringList(output)
    print()
  test_case_number += 1
    
if __name__ == "__main__":
  # Testcase 1
  str1 = "Firstly this is the first string"
  str2 = "Next is the second string" 
  output_1 = return_mismatched_words(str1, str2)
  expected_1 = ["Firstly", "this", "first", "Next", "second"]
  check(expected_1, output_1)

  # Testcase 2
  str1 = "This is the first string"
  str2 = "This is the second string" 
  output_2 = return_mismatched_words(str1, str2)
  expected_2 = ["first", "second"]
  check(expected_2, output_2)
  
  # Testcase 3
  str1 = "This is the first string extra"
  str2 = "This is the second string" 
  output_3 = return_mismatched_words(str1, str2)
  expected_3 = ["first", "extra", "second"]
  check(expected_3, output_3)
  
  # Testcase 4
  str1 = "This is the first text"
  str2 = "This is the second string" 
  output_4 = return_mismatched_words(str1, str2)
  expected_4 = ["first", "text", "second", "string"]
  check(expected_4, output_4)
  
  
  # Add your own test cases here
  
  import math
# Add any extra import statements you may need here
# Add any helper functions you may need here

def get_count(x):
  return x['count']

def return_smallest_key(inputDict, n):
  el_list = []
  
  for name,count in inputDict.items():
    el_list.append({ "name": name, "count":count })
    
  el_list.sort(key=get_count)
  desired_idx = n - 1
  if desired_idx >= 0 and desired_idx < len(el_list):
    return el_list[desired_idx]['name']
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


def return_missing_balanced_numbers(input):
  seen_dict = {}
  
  for key in input:
    if key not in seen_dict:
      seen_dict[key] = 0
    seen_dict[key] += 1
    
  max_seen = max(seen_dict.values())
  dict_to_balance = {}

  for name, seen_count in seen_dict.items():
    if seen_count < max_seen:
      dict_to_balance[name] = max_seen - seen_count        
  
  return dict_to_balance











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
  
  import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def character_frequency(s, c):
  seen_count = 0
  
  for char in s:
    if char == c:
      seen_count += 1
  
  return seen_count
  











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

  # Testcase 1
  s1 = "Mississippi"
  c1 = "s"
  expected_1 = 4
  output_1 = character_frequency(s1, c1)
  check(expected_1, output_1)

  # Testcase 2
  s2 = "Rainbow"
  c2 = "j"
  expected_2 = 0
  output_2 = character_frequency(s2, c2)
  check(expected_2, output_2)
  
  # Testcase 3
  s3 = "Mirror"
  c3 = "m"
  expected_3 = 0
  output_3 = character_frequency(s3, c3)
  check(expected_3, output_3)
  
  # Testcase 4
  s4 = ""
  c4 = "c"
  expected_4 = 0
  output_4 = character_frequency(s4, c4)
  check(expected_4, output_4)

  # Testcase 5
  s5 = "hello"
  c5 = ""
  expected_5 = 0
  output_5 = character_frequency(s5, c5)
  check(expected_5, output_5)

  # Add your own test cases here
  
  import math
# Add any extra import statements you may need here


# Add any helper functions you may need here


def fill_in_the_blanks(input_lst):
  most_recent_non_null = None
  
  for idx in range(len(input_lst)):
    el = input_lst[idx]
    if el == None:
      input_lst[idx] = most_recent_non_null
    else:
      most_recent_non_null = el
  
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
  