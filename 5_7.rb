class ListNode
    attr_accessor :val, :next
    def initialize(val)
        @val = val
        @next = nil
    end
end


def getIntersectionNode(headA, headB)
   a_nodes = {}
    
    current_a = headA
    while current_a
       a_nodes[current_a] = current_a
        current_a = current_a.next
    end
    
    current_b = headB
     while current_b
        return current_b if a_nodes[current_b]
         current_b = current_b.next
    end
   
    nil
end

