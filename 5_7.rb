#aksdfjskasdasdaasdasda
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


def find_repeated_dna_sequences(s)
    hash=Hash.new(0)
    
    (0..s.length-10).each do |start_idx|
       seq=s[start_idx..start_idx+9]
       hash[seq]+=1
    end
    p hash
    dup_hash = hash.select {|k,v| v>1 }
    
    dup_hash.keys
end


