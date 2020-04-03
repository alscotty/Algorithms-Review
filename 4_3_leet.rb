def my_pow(x, n)
    return 1 if n==0
    
    if n>0
        return x * my_pow(x,n-1)
    else
        positive_exp = n.abs
        return 1/((x*my_pow(x,positive_exp-1))*1.0)
    end
end


# Want to merge two sorted linked lists...

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} l1
# @param {ListNode} l2
# @return {ListNode}

def list_to_arr(list_node)
   arr=[]
    
    node = list_node
    while (node.next)
        arr << node.val
        node = node.next
    end

    arr
end


def merge_two_lists(l1, l2)
    l1_arr = list_to_arr(l1)
    l2_arr = list_to_arr(l2)
    
    merged=[]
    while l1_arr.length && l2_arr.length
        if(l1_arr.first <= l2_arr.first)
           merged << l1_arr.shift 
        else
            merged << l2_arr.shift
        end
    end
    
    merged = merged.concat(l1_arr).concat(l2_arr)
    
    (0...merged.length-1).each do |idx|
        el = merged[idx]
        next_el=merged[idx+1]
        
        node = ListNode.new(el)
        node.next = ListNode.new(next_el)
    end

    node
end



# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end

# @param {TreeNode} root
# @return {Integer[]}

#to refresh, inorder traversal:
    #visit left, then self, then right

def inorder_traversal(root)
    return [] unless root
    
    return [*inorder_traversal(root.left),root.val,*inorder_traversal(root.right)]
end



def check_record(s)
  
    return false if s.count('A')>1 || s.include?("LLL")
    
    true
end

