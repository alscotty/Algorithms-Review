def pair_sum(numbers, target_sum):
  pair_indices = None

  for i in range(0,len(numbers)):
    for j in range(i+1,len(numbers)):
      if numbers[i] + numbers[j] == target_sum:
        pair_indices = (i, j)

  return pair_indices

def pair_product(numbers, target_product):
    pair_indices_tuple = None

    for i in range(0,len(numbers)):
      for j in range(i + 1,len(numbers)):
        if numbers[i] * numbers[j] == target_product:
          pair_indices_tuple = (i,j)
      

    return pair_indices_tuple


def build_seen_set_from_list(list):
  my_set = set()
  for el in list:
    my_set.add(el)
  return my_set

def intersection(a, b):
  a_set = build_seen_set_from_list(a)
  intersected_list = []
  
  for el in b:
    if el in a_set:
      intersected_list.append(el)
  
  return intersected_list  
    
def sum_numbers_recursive(numbers):
  if len(numbers) == 0:
    return 0

  return numbers[0] + sum_numbers_recursive(numbers[1:])

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.next = None

def linked_list_values(head):
  list_of_values = []
  current_node = head

  while current_node:
    list_of_values.append(current_node.val)
    current_node = current_node.next
  
  
  return list_of_values

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.next = None

def sum_list(head):
  running_sum = 0
  current_node = head

  while current_node:
    running_sum += current_node.val
    current_node = current_node.next
  
  return running_sum

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.next = None

def linked_list_find(head, target):
  has_target = False
  current_node = head

  while current_node:
    if target == current_node.val:
      has_target = True
    current_node = current_node.next
  
  return has_target

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.next = None

def get_node_value(head, index):
  node_val_at_index = None
  current_node = head
  current_idx = 0

  while current_node:
    if current_idx == index:
      node_val_at_index = current_node.val
      break
    
    current_node = current_node.next
    current_idx += 1

  return node_val_at_index

# reversing a linked list, classic:

# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.next = None

def reverse_list(head):
  prev_node = None
  current_node = head

  while current_node:
    saved_next = current_node.next

    current_node.next = prev_node
    prev_node = current_node
    current_node = saved_next
    if not saved_next:
      return prev_node
