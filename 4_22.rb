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

# @param {Integer[]} nums
# @param {Integer} k
# @return {Integer}


def find_kth_largest(nums, k)
    nums.sort!
    nums[-k]
end

# @param {Integer[]} nums
# @param {Integer} k
# @return {Integer}

class MaxHeap 
    attr_accessor :array
    
     def initialize()
        @array = [null]
     end
    
    def get_parent(idx)
        (idx/2)
    end
    
    def get_left_child(idx)
        idx*2 
    end
    
    def get_right_child(idx)
        (idx*2) + 1
    end
    
    def sift_up(idx)
        return if idx <=1
        
        parent_idx = self.get_parent(idx)
        current = self.array[idx]
        parent = self.array[parent_idx]
        
        if current > parent
            self.array[parent_idx], self.array[idx] = self.array[idx], self.array[parent_idx]
            
            
            self.sift_up(parent_idx)
        end
    end

    def insert(val)
        self.array.push(val)
        self.sift_up(self.array.length - 1)
    end
    
    def delete_max()

    end

    def sift_down(idx)

    end
    
end

#becomes O(n) I think, instead of using .sort which is n*log(n)


def find_kth_largest(nums, k)
    max_heap = MaxHeap.new()
    
    nums.each {|val| max_heap.insert(val)}

    i=1
    while i<k
        heap.delete_max()
        i+=1
    end
    
    heap.delete_max()
end