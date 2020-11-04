# @param {Integer} num_rows
# @return {Integer[][]}

def generate_next_row(row)
    next_row = [1]
    
    (0...row.length - 1).each do |i|
       next_row << row[i] + row[i+1] 
    end
    
    next_row << 1
    next_row
end

def generate(num_rows)
    pasc = [[1],[1,1]]
    return pasc.take(num_rows) if num_rows <= 2
    
    until pasc.length == num_rows
        pasc << generate_next_row(pasc.last)
    end
    
    pasc
end

# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val = 0, left = nil, right = nil)
#         @val = val
#         @left = left
#         @right = right
#     end
# end
# @param {Integer[]} nums
# @return {TreeNode}

def sorted_array_to_bst(nums)
    return nil if nums.empty?
   mid_idx = nums.length/2
    root = TreeNode.new(nums[mid_idx])
    
    root.left = sorted_array_to_bst(nums[0...mid_idx])
    root.right = sorted_array_to_bst(nums[mid_idx+1..-1])
    
    root
end

# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)
    return 0 if needle == ""
    
    (0...haystack.length - needle.length + 1).each do |i|
       return i if haystack[i...i+needle.length] == needle
    end
    
    -1
end

