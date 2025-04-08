# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.left = None
#     self.right = None

def tree_includes(root, target):
  if not root:
    return False
  if root.val == target:
    return True

  children_vals = [tree_includes(root.right,target),tree_includes(root.left,target)]

  return True in children_vals
  
  
# class Node:
#   def __init__(self, val):
#     self.val = val
#     self.left = None
#     self.right = None
from collections import deque

def tree_min_value(root):
  current_min = root.val
  queue = deque([root])
  
  while len(queue) > 0:
    current_node = queue.popleft()
    if current_node.val < current_min:
      current_min = current_node.val
    if current_node.left:
      queue.append(current_node.left)
    if current_node.right:
      queue.append(current_node.right)

  return current_min

from typing import List

class Solution:
    def buildSet(self, list):
        seen_set = set()
        for num in list:
            seen_set.add(num)
        return seen_set
    
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        seen_set_1 = self.buildSet(nums1)
        combo_set = set()
        
        for num in nums2:
            if num in seen_set_1:
                combo_set.add(num)
        
        return list(combo_set)
    

def has_path(graph, src, dst):
  children = graph[src]
  if len(children) == 0:
    return False
  elif dst in children:
    return True

  children_results = []
  for child_node in children:
    children_results.append(has_path(graph,child_node, dst))

  return True in children_results
  
  
  

def build_graph(edges):
  graph = {}
  
  for edge in edges:
    el1 = edge[0]
    el2 = edge[1]
    if el1 not in graph:
      graph[el1] = []
    if el2 not in graph:
      graph[el2] = []
    graph[el1].append(el2)
    graph[el2].append(el1)

  return graph

def undirected_path(edges, node_A, node_B, seen_set=None, graph=None):
  if not seen_set:
    seen_set = set()
  if not graph:
    graph = build_graph(edges)

  if node_A == node_B:
    return True
  if node_A in seen_set:
    return False
  seen_set.add(node_A)

  traveled_bools = []

  for neighbor in graph[node_A]:
    traveled_bools.append(undirected_path(edges,neighbor, node_B, seen_set, graph))

  return True in traveled_bools


def mark_islands(grid, x, y, height, width):
    if x < 0 or x >= height or y < 0 or y >= width:
        return

    if grid[x][y] == 'W':
        return

    if grid[x][y] == 'L':
        grid[x][y] = 'W'

        # Recurse in all four directions
        mark_islands(grid, x + 1, y, height, width)
        mark_islands(grid, x - 1, y, height, width)
        mark_islands(grid, x, y + 1, height, width)
        mark_islands(grid, x, y - 1, height, width)

    return


def island_count(grid):
    num_islands = 0
    height = len(grid)
    width = len(grid[0]) if height > 0 else 0

    for x in range(height):
        for y in range(width):
            if grid[x][y] == 'L':
                num_islands += 1
                mark_islands(grid, x, y, height, width)

    return num_islands
  
  


  
  
