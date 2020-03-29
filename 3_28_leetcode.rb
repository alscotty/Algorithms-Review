
#max depth of a binary search tree, given the root node
#not perfect solution:
def max_depth(root,max_deep=1)
    return unless root.left || root.right
    
    
    max_depth(root.left, max_deep+=1) if root.left
    max_depth(root.right, max_deep+=1) if root.left
    
    max_deep
end

#better version:
def max_depth(root)
    root ? 1+ [max_depth(root.left), max_depth(root.right)].max : 0
end

#check if a binary tree is symmetric, recursive solution:
def is_symmetric(root)
  return true if !root
  return is_sym(root.left,root.right)
end

def is_sym(left,right)
  return true if !left && !right
  return false if !left || !right
  return left.val == right.val && is_sym(left.left,right.right) && is_sym(right.left,left.right)
end