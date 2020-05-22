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

def detectCycle(head)
    nodes = {}
    
    current = head
    
    idx=0
    while current
       if nodes[current.next]
            return nodes[current.next]
       end
        
        nodes[current]=idx
        idx+=1
        
        current = current.next
    end
    
    
    -1
end

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val = 0, _next = nil)
#         @val = val
#         @next = _next
#     end
# end
# @param {ListNode} head
# @return {ListNode}

# reorder given list such that odds are grouped first, and the even nodes at the end
# idea, save even values to an array & add on at the end

# first answer, assuming head is odd

def odd_even_list(head)

    idx=0
    current=head
        
    even_vals=[]
    
    while current
        break unless current.next
            if current.next.val.odd?
               current=current.next
            else
                even_vals << current.next
                #continue looping until hit odd val
            end
        
        current = current.next
    end
    
    #add even numbers at the end
     while even_vals
          node = ListNode.new(even_vals.shift)
          current.next = node
           current = node
     end

    head
end