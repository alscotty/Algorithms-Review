# @param {String} s
# @return {Integer}

def roman_to_int(str)
    return 0 unless str.length
    numeral_hash = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    }
    
    total_number = 0
    i_seen = 0
    x_seen = 0
    c_seen = 0
    
    str.each_char do |char|
       total_number += numeral_hash[char.to_sym]
        
        if char == 'I'
            i_seen += 1
        elsif char == 'X'
            x_seen += 1 
            total_number -= 2 * i_seen
        elsif char == 'C'
           c_seen += 1 
            total_number -= 2 * (x_seen * 10)
        elsif char == 'V'
            total_number -= 2 * i_seen
        elsif char == 'D' || char == 'M'
            total_number -= 2* (c_seen * 100)
        elsif char == 'L'
            total_number -= 2 * (x_seen * 10)
        end
    end
    
    total_number
end

p roman_to_int("MCMXCIV")

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

def convert_list_to_number(root)
   nums_str = ""
    
    queue = [root]
    
    until queue.empty?
       curr_node = queue.shift
        nums_str = curr_node.val.to_s + nums_str
        
        if curr_node.next
            queue << curr_node.next
        end
    end
    
    nums_str.to_i
end

def add_two_numbers(l1, l2)
    (convert_list_to_number(l1) + convert_list_to_number(l2)).to_s.split('').reverse.map {|char| char.to_i}
end