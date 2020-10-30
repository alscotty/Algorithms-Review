# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val = 0, left = nil, right = nil)
#         @val = val
#         @left = left
#         @right = right
#     end
# end
# @param {TreeNode} root
# @param {Integer} k
# @return {Boolean}

def find_target(root, k)
    queue = [root]
    node_vals = Hash.new(0)
    
    until queue.empty?
        curr_node = queue.shift 
        node_vals[curr_node.val] += 1
        if curr_node.left
            queue << curr_node.left
        end
        if curr_node.right
            queue << curr_node.right
        end
    end
    
    node_vals.keys.each do |val|
        counterpart = k - val    
        if node_vals[counterpart] != 0  && val != counterpart
            return true
        elsif node_vals[counterpart] != 0 && val == counterpart
           return true if node_vals[counterpart] > 1 
        end
    end
    
    false
end

# @param {String} str1
# @param {String} str2
# @return {String}

def concator(str,length)
   combo = ""
    
    while combo.length < length
       combo += str 
    end
    
    combo
end

def gcd_of_strings(str1, str2)
    str1_size = str1.size
    str2_size = str2.size
    
    if str1_size <= str2_size
        short_str = str1
        long_str = str2
    else
        short_str = str2
        long_str = str1
    end
    
    valid_str = ""
    
    (0...short_str.length).each do |i|
        test_str = short_str[0..i]
        if concator(test_str,str1_size) == str1 && concator(test_str,str2_size) == str2
            valid_str = test_str            
        end
    end
    
    valid_str
end