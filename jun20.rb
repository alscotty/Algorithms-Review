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
# @return {Integer}

# find min depth in a binary tree, min steps to a leaf node (has no children)

def min_depth(root, current_depth = 1)
    return 0 unless root
    
    unless root.left || root.right
        return current_depth
    end
    
    if root.left && root.right
        [min_depth(root.left, current_depth + 1), min_depth(root.right, current_depth + 1)].min
    elsif root.left
        min_depth(root.left, current_depth + 1)
    else
        min_depth(root.right, current_depth + 1)
    end
    
end

    # { 
    #.  1:[0], 
    #   2: [1],
    #   3: [2,3,4]
    #  }

class Solution

=begin
    :type nums: Integer[]
=end
    def build_index_hash(nums)
        hash = Hash.new {|h,k| h[k] = []}
        
        nums.each_with_index do |num,idx|
           hash[num] << idx
        end
        
        @index_hash = hash
    end
    
    
    def initialize(nums)
        @nums = nums.to_a
        @index_hash = {}
        self.build_index_hash(nums)
    end

=begin
    :type target: Integer
    :rtype: Integer
=end
    def pick(target)
        @index_hash[target].sample
    end


end

# Your Solution object will be instantiated and called as such:
# obj = Solution.new(nums)
# param_1 = obj.pick(target)

# Solution.new([1,2,3])