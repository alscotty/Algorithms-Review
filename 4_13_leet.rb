#SQL Query:

# SELECT EMPLOYEE_UIN.UIN, EMPLOYEE.NAME
# FROM EMPLOYEE
#     JOIN EMPLOYEE_UIN
#     ON employee.id = employee_uin.id
# WHERE Employee.age <25
# ORDER BY Employee.name, employee.id ASC

# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end

# @param {TreeNode} root
# @return {TreeNode}
#invert a binary tree!

def invert_tree(root)
    return unless root
    
    if root.left && root.right
       placeholder_left = root.left
       root.left = root.right 
        root.right = placeholder_left
        
        invert_tree(root.right)
        invert_tree(root.left)
        
    end
    
    root
end


# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} node
# @return {Void} Do not return anything, modify node in-place instead.
def delete_node(node)
    new_val=node.next.val
    next_nodes_next=node.next.next
    node.val=new_val
    node.next=next_nodes_next
end

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} head
# @param {Integer} n
# @return {ListNode}

def remove_nth_from_end(head, n)
    
    length = 0
    
    curr_node = head
    while curr_node
        length+=1
       curr_node = curr_node.next 
    end
    
    return [] if length ==1 && n==1
    
    curr_node2 = head
    idx=0
    delete_idx = length -n
    
    while curr_node2
        if idx == delete_idx-1
           replacement_node = curr_node2.next.next
            curr_node2.next = replacement_node
            break
        end
        
        idx+=1
        curr_node2 = curr_node2.next
    end
       
    head
end

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} head
# @return {Boolean}
def hasCycle(head)
    vals= Set.new()
    count =0
    curr_node = head
    
    while curr_node
         vals.add(curr_node.val)

        count+=1
        curr_node = curr_node.next
    end
    
    count == vals.length
end