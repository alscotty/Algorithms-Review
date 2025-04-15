def tribonacci(n, memo={}):
  if n in [0,1]:
    return 0
  elif n==2:
    return 1

  results = []
  for num in [n-1, n-2, n-3]:
    if num not in memo:
      memo[num] = tribonacci(num)
  
    results.append(memo[num])
      
  return sum(results)

def sum_possible(amount, numbers):
  return _sum_possible(amount, numbers, {})

def _sum_possible(amount, numbers, memo):
  if amount in memo:
    return memo[amount]
  
  if amount < 0:
    return False
  
  if amount == 0:
    return True
  
  for num in numbers:
    if _sum_possible(amount - num, numbers, memo):
      memo[amount] = True
      return True
    
  memo[amount] = False  
  return False

import math

def min_change(amount, coins):
  ans = _min_change(amount, coins, {})
  if ans == math.inf:
    return -1
  else:
    return ans

def _min_change(amount, coins, memo):
  if amount in memo:
    return memo[amount]
  
  if amount == 0:
    return 0
  
  if amount < 0:
    return math.inf
  
  min_coins = math.inf
  for coin in coins:
    num_coins = 1 + _min_change(amount - coin, coins, memo)
    min_coins = min(min_coins, num_coins)
    
  memo[amount] = min_coins
  return min_coins

def can_concat(s, words,used_words = []):
  if len(s) == 0:
    return True

  responses = []
  for word in words:
    word_size = len(word)
    if s[0:word_size] == word:
      shortened_word = s[word_size:]
      used_words.append(word)
      responses.append(can_concat(shortened_word,words,used_words))
    else:
      responses.append(False)

  return True in responses

