# @param {Integer[]} nums
# @return {Integer}

def majority_element(nums)
    counter_hash = Hash.new(0)
    
    nums.each {|el| counter_hash[el] +=1}
        
        counter_hash.keys.each do |el|
           return el if counter_hash[el]> (nums.length/2) 
        end
end

# O(n)

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} head
# @param {Integer} val
# @return {ListNode}

def remove_elements(head, val)
    return [] if head && head.val == val && !head.next
    
    current = head

    while current
       if current.next && current.next.val == val
           current.next = current.next.next
       else
        current = current.next
       end
    end
        
    head
end

