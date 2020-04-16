a = [[1,2],[3,4]]

# p a.transpose!!!

def rotate(matrix)
    
    size = matrix.length
    
    (0...matrix.length).each do |row_idx|
        (0...matrix.length).each do |col_idx|
            return matrix.reverse! if row_idx == size/2 && col_idx == size/2 && size.odd?
            
            current_el = matrix[row_idx][col_idx]
            swapped_el = matrix[size - col_idx-1][size - row_idx-1]
            matrix[row_idx][col_idx] = swapped_el
            matrix[size - col_idx-1][size - row_idx-1] = current_el

            if row_idx == (size/2)-1 && col_idx == size-1 && size.even?
                p "row: #{row_idx}, col: #{col_idx}"
                return matrix.reverse! 
            end
        end
    end
        
end

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

def merge_two_lists(l1, l2)
    head = current = ListNode.new(nil);
    
    
    while l1.next && l2.next
        if l1.val <= l2.val
            current.next = ListNode.new(l1.val)
            l1 = l1.next
        else
            current.next = ListNode.new(l2.val)
            l2 = l2.next
        end
         current = current.next
    end
    
    while l1.next != nil || l2.next != nil
        if l1 && !l2
            current.next = Listnode.new(l1.val)
            l1 = l1.next
            current = current.next
        elsif l2 && !l1
            current.next = Listnode.new(l2.val)
            l2 = l2.next
            current = current.next
        end
    end
        
    head.next
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
def is_palindrome(head)
    arr = []
    
    node = head
    while node
       arr << node.val
        break unless node.next
        node = node.next
    end
    
    arr == arr.reverse
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
# @return {ListNode}
def reverse_list(head)
    arr = []
    
    node = head
    while node
       arr << node.val
        break unless node.next
        node = node.next
    end
    
    reversed_order_arr = arr.reverse
    
    rev_head = current = ListNode.new(nil)
    
    reversed_order_arr.each do |ele|
       current.next = ListNode.new(ele)
       current = current.next 
    end
    
    
    rev_head.next
end

