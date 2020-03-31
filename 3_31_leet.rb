def rotate(nums, k)
    
    k.times do
        last=nums.pop
        nums.unshift(last)
    end
    
    nums
end

def multiply(num1, num2)
   (num1.to_i*num2.to_i).to_s 
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

# iterate through each list normally, store to number,
# and reverse! maybe convert to string, split to array
#
# add both numbers normally
# reverse those numbers!
# build linked list with those values, and return the list


#  2>4>3 => [2,4,3] => [3,4,2]
def number_from_linked_list(ll_node)
   backwards_num = []
    
    while ll_node.next
        backwards_num << ll_node.val
        
        ll_node = ll_node.next
    end
    
    real_num = backwards_num.reverse.join("").to_i
end

#807 => "708" > ["7","0"..] > [7,0,8]
def add_two_numbers(l1, l2)
    regular_sum = number_from_linked_list(l1) + number_from_linked_list(l2)
    regular_sum.to_s.reverse.split("").map!(&:to_i)
    
    #stuck on how to convert array into a linked list like this
    regular_sum.each_with_index do |num,idx|
        if idx<regular_sum.length-1
            curr_node = ListNode.new(num)
            curr_node.next = ListNode.new(regular_sum[idx+1])
            
            
        end
        
    end
    
    first_node
end








