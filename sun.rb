# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val = 0, left = nil, right = nil)
#         @val = val
#         @left = left
#         @right = right
#     end
# end
# @param {TreeNode} root
# @return {Integer[][]}

# BFS LIFO, queue []

def level_order(root)
    return [] unless root
    
    trav_arr = [[root]]
    queue = [root]
    
    while queue.length > 0
       curr_node = queue.unshift
        curr_level = 1
        arr = []
        if curr_node.left
           queue.push(curr_node.left) 
            arr.push(curr_node.left.val)
        end
         if curr_node.right
           queue.push(curr_node.right) 
             arr.push(crr_node.right.val)
        end
        trav_arr[curr_level] = arr
        
        curr_level += 1
    end
    
    trav_arr
end


# @param {Integer[]} nums
# @return {Integer}

# O(0.5 n) => 0(n)

def single_non_duplicate(nums)
    size = nums.size
    even_indices = (0...size).to_a.select {|idx| idx.even?}
    
    even_indices.each do |idx|
       return nums[idx] unless nums[idx] == nums[idx+1]
    end
    
    -1
end

class FreqStack
    attr_reader :stack, :count_hash
    def initialize()
        @stack = []
        @count_hash = Hash.new(0)
    end


=begin
    :type x: Integer
    :rtype: Void
=end
    def push(x)
        @stack.push(x)
        @count_hash[x] += 1
    end

=begin
    :rtype: Integer
=end
    def pop()
        most_freq = @count_hash.max_by {|key,val| val}
        p most_freq
        (@stack.length-1).downto(0).each do |idx|
            num = @stack[idx]
            p idx
            if most_freq.include?(num)
               @stack.delete_at(idx)
                @count_hash[num] -= 1
                return num
            end
        end
    end

end

# Your FreqStack object will be instantiated and called as such:
# obj = FreqStack.new()
# obj.push(x)
# param_2 = obj.pop()

