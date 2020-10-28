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
# @param {Integer} low
# @param {Integer} high
# @return {TreeNode}

def has_valid_child?(node,low,high)
   if node.left
      return 'left' if node.left.val >= low && node.left.val <= high 
   end
     if node.right
      return 'right' if node.right.val >= low && node.right.val <= high 
   end
    false
end

def trim_bst(root, low, high)
    queue = [root]
    
    until queue.empty?
       current_node = queue.shift 
        
       left, right = current_node.left, current_node.right
        if left
            child_res = has_valid_child?(left,low,high)
            if (left.val<low || left.val > high) && !(left.left || left.right)
                 current_node.left = nil
            elsif child_res && (left.val<low || left.val > high)
                current_node.left = child_res == 'left' ? left.left : left.right
            end
           queue << left
        end
        
        if right 
            child_res = has_valid_child?(right,low,high)
            if (right.val<low || right.val > high) && !(right.left || right.right)
                 current_node.right = nil
            elsif child_res && (right.val<low || right.val > high)
                current_node.right = child_res == 'left' ? right.left : right.right
            end
           queue << right
        end
        
    end
    
    root
end


def trim_bst(root, l, r)
  return unless root
  return trim_bst(root.left, l, r) if root.val > r
  return trim_bst(root.right, l, r) if root.val < l

  root.left = trim_bst(root.left, l, r) 
  root.right = trim_bst(root.right, l, r)

  return root
end

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val = 0, _next = nil)
#         @val = val
#         @next = _next
#     end
# end
# @param {ListNode} l1
# @param {ListNode} l2
# @return {ListNode}

def convert_list_to_num(list)
   sum_str = ''
    node = list
    while node
       sum_str += node.val.to_s
        node = node.next
    end
    sum_str.to_i
end

def add_two_numbers(l1, l2)
    sum = convert_list_to_num(l1) + convert_list_to_num(l2)
    sum = sum.to_s.split('').map{|str| str.to_i}

    node = ListNode.new(sum.shift)
    first_node = node
    
    sum.each do |num|
       curr_node = ListNode.new(num)
        node.next = curr_node
        node = curr_node
    end
    
    first_node
end