# @param {Integer[]} arr
# @return {Integer}

def find_special_integer(arr)
    neededPercentLimit = (arr.length/4.0) - 1
    desiredEl = arr[0]
    currentStreak = 1
    
    (0...arr.length-1).each do |idx| 
        if arr[idx] == arr[idx+1]
            currentStreak += 1
            desiredEl = arr[idx] if currentStreak >= neededPercentLimit
        else
            currentStreak = 1 
        end
    end

    desiredEl
end

# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val = 0, left = nil, right = nil)
#         @val = val
#         @left = left
#         @right = right
#     end
# end
# @param {TreeNode} root1
# @param {TreeNode} root2
# @return {Integer[]}

def tree_to_array(root)
    return [] unless root
    stack = [root]
    arr = []
    
    until stack.empty?
       curr_node = stack.shift
        arr << curr_node.val
        if curr_node.left
           stack << curr_node.left 
        end
         if curr_node.right
           stack << curr_node.right 
        end
    end
    
    arr
end

def get_all_elements(root1, root2)
    (tree_to_array(root1) + tree_to_array(root2)).sort
end

# @param {Integer[][]} mat
# @param {Integer} k
# @return {Integer}
