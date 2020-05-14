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

# BFS, FIFO
# DFS, LIFO

def count_nodes(root)
    count=0
    return count unless root
    
    queue=[root]

    while queue.length >=1
        count+=1
       node = queue.first
        queue.push(node.left) if node.left
        queue.push(node.right) if node.right
       
        queue.shift
    end
        
    count
end

# @param {Integer} a
# @param {Integer} b
# @param {Integer} c
# @param {Integer} d
# @param {Integer} e
# @param {Integer} f
# @param {Integer} g
# @param {Integer} h
# @return {Integer}

def compute_area(a, b, c, d, e, f, g, h)
   h >= d ? y_top = d : y_top = h
    b >= f ? y_bot = f : y_bot = f
    
    g>= c ? x_top = c : x_top = g
    a>= e ? x_bot=e : x_bot =a
    
    y = y_top-y_bot
    x = x_top-x_bot
    
    
    
    x*y
end

class MyQueue

=begin
    Initialize your data structure here.
=end
    attr_reader :store
    
    def initialize()
        @store = []
    end


=begin
    Push element x to the back of queue.
    :type x: Integer
    :rtype: Void
=end
    def push(x)
        @store<<x
    end


=begin
    Removes the element from in front of queue and returns that element.
    :rtype: Integer
=end
    def pop()
        @store.shift
    end


=begin
    Get the front element.
    :rtype: Integer
=end
    def peek()
        self.store[0]
    end


=begin
    Returns whether the queue is empty.
    :rtype: Boolean
=end
    def empty()
        @store == []
    end


end

# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue.new()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()

