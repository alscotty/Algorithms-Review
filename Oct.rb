# @param {String[]} logs
# @return {String[]}

# want all lex logs first, ordered alphabetically in terms of the following words after the identifier (use identified in the case of a tie)
# then want all dig logs after, in the order that they first appeared

def not_in_alph_order?(log1,log2)
    alphabet = ('a'..'z').to_a
    
    (1...log1.length).each do |word_idx|
        (0..2).each do |letter_idx|
           l1 = log1[word_idx][letter_idx] 
           l2 = log2[word_idx][letter_idx]
            if alphabet.index(l2) && alphabet.index(l1)
                return true if alphabet.index(l2) < alphabet.index(l1)
            end
        end
    end
    
   (0..2).each do |letter_idx|
       l1 = log1[0][letter_idx] 
       l2 = log2[0][letter_idx]
        if alphabet.index(l2) && alphabet.index(l1)
            return true if alphabet.index(l2) < alphabet.index(l1)
        end
    end
    
    false
end

def reorder_log_files(logs)
    sorted = false
    while !sorted
       sorted = true
        
        (0...logs.length-1).each do |i|
            curr_log = logs[i]
            next_log = logs[i+1]
            if curr_log[0..2] == 'dig' && next_log[0..2] == 'let'
               logs[i],logs[i+1] = next_log, curr_log
                sorted = false
            elsif (curr_log[0..2] == 'let' && next_log[0..2] == 'let')
                if not_in_alph_order?(curr_log,next_log)
                    logs[i],logs[i+1] = next_log, curr_log
                    sorted = false
                end
            end
        end
        
    end
    
    logs
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
# @param {TreeNode} root
# @return {Integer}

# [6]
# [7,8]
# [7,1,3]
# [7,1,5]

# [6,7,8,2,7,1,3,9,1,4,5]
# idx 3 || 4, g_parent is 0
# idx 8 || 9, g_parent is 4

def add_grandchildren_vals(child_node)
    sum = 0
    if child_node.left
       sum += child_node.left.val 
    end
    if child_node.right
       sum += child_node.right.val 
    end
    sum
end

def sum_even_grandparent(root)
    grand_sum = 0
    
    # dfs use FIFO; stack
    stack = [root]
    until stack.empty?
        curr_node = stack.pop
        if curr_node.left
            stack.push(curr_node.left)
            grand_sum += add_grandchildren_vals(curr_node.left) if curr_node.val.even?
        end
        if curr_node.right
            stack.push(curr_node.right)
            grand_sum += add_grandchildren_vals(curr_node.right) if curr_node.val.even?
        end
        
    end
    
    grand_sum
end