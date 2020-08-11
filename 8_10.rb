# Definition for a binary tree node.
class TreeNode
    attr_accessor :val, :left, :right
    def initialize(val = 0, left = nil, right = nil)
        @val = val
        @left = left
        @right = right
    end
end
# @param {TreeNode} root
# @return {Integer}

# dfs or bfs?
# dfs!

# Want sum of all the left leaves: 

def childless?(node)
    !node.left && !node.right 
end

def sum_of_left_leaves(root)
    left_sum = 0
    
    stack = [root]
    
    while stack.length > 0
        curr_node = stack.pop
        break unless curr_node
        if curr_node.left
            stack.push(curr_node.left)
            left_sum += curr_node.left.val if childless?(curr_node.left)
        end
        if curr_node.right 
            stack.push(curr_node.right)
        end
    end
    
    
    left_sum
end

root = TreeNode.new(8)
root.left = TreeNode.new(20)
root.right = TreeNode.new(10)

puts sum_of_left_leaves(root) #=> 20