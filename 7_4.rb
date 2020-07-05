# @param {Integer[][]} a
# @return {Integer[][]}

def flip_and_invert_image(img_arr)
    
    img_arr.each_with_index do |row,idx|
        row.each_with_index do |ele,ele_idx|
            ele == 0 ? row[ele_idx] = 1 : row[ele_idx] = 0
        end
        img_arr[idx] = row.reverse
    end
    
    img_arr
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
# @return {Boolean}

# LIFO stack!! 

def get_lef_seq(root)
    leaves_arr = []
    stack = [root]
    
    while stack.length > 0
        curr_node = stack.pop 
        if curr_node.left
           stack.push(curr_node.left) 
        end
        if curr_node.right
           stack.push(curr_node.right) 
        end
        
        leaves_arr.push(curr_node.val) unless (curr_node.left || curr_node.right)
        
    end
    
    leaves_arr
end


def leaf_similar(root1, root2)
  get_lef_seq(root1) == get_lef_seq(root2)
end