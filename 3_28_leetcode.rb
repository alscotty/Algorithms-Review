
#max depth of a binary search tree, given the root node
def max_depth(root,max_deep=1)
    return unless root.left || root.right
    
    
    max_depth(root.left, max_deep+=1) if root.left
    max_depth(root.right, max_deep+=1) if root.left
    
    max_deep
end