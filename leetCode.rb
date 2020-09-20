# 	This is the custom function interface.
#	You should not implement it, or speculate about its implementation
#	class CustomFunction:
#		def f(self, x, y):
# 			Returns f(x, y) for any given positive integers x and y.
# 			Note that f(x, y) is increasing with respect to both x and y.
# 			i.e. f(x, y) < f(x + 1, y), f(x, y) < f(x, y + 1)
# 		end
# 	end
# 

# @param {CustomFunction} customfunction
# @param {Integer} z
# @return {List[List[Integer]]}

def findSolution(customfunction, z)
    successful_pairs = []
    
    x,y = 1,1
    
    while x <= z
        while y <= z
           successful_pairs << [x,y] if customfunction.f(x,y) == z
            y += 1
        end
        y = 1
       x += 1  
    end
    
    successful_pairs
end


def first_bad_version(n)    
    left = 0
    right = n
    
    while left != right
        
        mid = left + (right-left) / 2
        
        right = mid if is_bad_version(mid)
        left = mid + 1 if !is_bad_version(mid)

    end
    
    left
end


# Definition for a binary tree node.
class TreeNode
    attr_accessor :val, :left, :right
    def initialize(val = 0, left = nil, right = nil)
        @val = val
        @left = left
        @right = right
    end
end
# @param {TreeNode} root
# @return {String[]}

def binary_tree_paths(root, route="#{root.val}")
    paths = []
    current_route = route
    
    if !root.right && !root.left
       paths << current_route 
    end
    
    if root.left
       paths += binary_tree_paths(root.left,"#{route}->#{root.left.val}") 
    end
    
    if root.right
       paths += binary_tree_paths(root.right,"#{route}->#{root.right.val}") 
    end
    
    paths
end

one=TreeNode.new(1)
two=TreeNode.new(2)
three=TreeNode.new(3)
five=TreeNode.new(5)

one.left = two
one.right = three
two.right = five

puts binary_tree_paths(one)
