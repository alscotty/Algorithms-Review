def longest_word(sentence):
  words = sentence.split(" ")
  max_length_word = words[0]
  
  for word in words:
    if len(word) >= len(max_length_word):
      max_length_word = word

  return max_length_word


def is_prime(n):
  if n == 1:
    return False

  for divisor in range(2,n-1):
    if n % divisor == 0:
      return False

  return True

def fizz_buzz(n):
  list = []

  for num in range(1,n+1):
    if num % 3 == 0 and num % 5 == 0:
      list.append("fizzbuzz")
    elif num % 3 == 0:
      list.append("fizz")
    elif num % 5 == 0:
      list.append("buzz")
    else:
      list.append(num)
  
  return list

def pairs(elements):
  unique_pairs = []

  for i in range(len(elements)):
    for j in range(len(elements)):
      if i != j:
        possible_pair = [elements[i], elements[j]]
        possible_pair.sort()
        
        if possible_pair not in unique_pairs:
          unique_pairs.append(possible_pair)
  
  return unique_pairs

def pairs_optimized(elements):
  result = []

  for i in range(0, len(elements)):
    for j in range(i + 1, len(elements)):
      pair = [ elements[i], elements[j] ]
      result.append(pair)
    
  return resul




def anagrams(s1, s2):
  seen_dict = {}
  
  for char in s1:
    if char in seen_dict:
      seen_dict[char] += 1
    else:
      seen_dict[char] = 1

  print(seen_dict)
  
  for char in s2:
    if char in seen_dict:
      seen_dict[char] -= 1
      if seen_dict[char] == 0:
        del seen_dict[char]
    else:
      return False

  return len(seen_dict.keys()) == 0
      
  
def most_frequent_char(s):
  count = {}
  for char in s:
    if char not in count:
      count[char] = 0    
    count[char] += 1
    
  best = None
  for char in s:
    if best is None or count[char] > count[best]:
      best = char
  return best
  c