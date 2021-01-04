# @param {Integer[]} arr
# @return {Integer}

def peak_index_in_mountain_array(arr)
 (1...arr.length - 1).each do |i|
    return i if arr[i] > arr[i-1] && arr[i] > arr[i+1] 
 end
end


# This is MountainArray's API interface.
# You should not implement it, or speculate about its implementation
# class MountainArray
#    def get(index):
#       
#    end
#
#    def length()
#		
#	 end
# end

# @param {int} int
# @param {MountainArray} mountain_arr
# @return {int}

def find_peak_index(mountain_arr)
    mountain_arr.index(mountain_arr.max)
end

def find_index(target,mountain_arr,mountain_indices)

end


def findInMountainArray(target, mountain_arr)
    peak_index = find_peak_index(mountain_arr)
    return peak_index if mountain_arr.get(peak_index) == target

    indexLeft = find_index(target,(0...peak_index).to_a)
    if indexLeft == -1
        indexRight = find_index(target,(peak_index+1..-1).to_a.reverse) - mountain_arr.length + 1
        return indexRight
    else
       return indexLeft 
    end

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
# @param {TreeNode} root
# @param {Integer[]} to_delete
# @return {TreeNode[]}

def del_nodes(root, to_delete)
    remaining_roots = to_delete.include?(root.val) ? [] : [root]
    
    queue = [root]
    
    until queue.empty?
       curr_node = queue.shift
        
        if to_delete.include?(curr_node.val)
           if curr_node.left
             remaining_roots << curr_node.left
           end
           if curr_node.right
               remaining_roots << curr_node.right
           end
        end
        if curr_node.left
             queue << curr_node.left
        end
        if curr_node.right
           queue << curr_node.right
       end
    end
    
    remaining_roots
end