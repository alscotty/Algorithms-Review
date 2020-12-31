# @param {Integer[]} arr
# @return {Integer}

def find_special_integer(arr)
    neededPercentLimit = (arr.length/4.0) - 1
    desiredEl = arr[0]
    currentStreak = 1
    
    (0...arr.length-1).each do |idx| 
        if arr[idx] == arr[idx+1]
            currentStreak += 1
            desiredEl = arr[idx] if currentStreak >= neededPercentLimit
        else
            currentStreak = 1 
        end
    end

    desiredEl
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
# @param {TreeNode} root1
# @param {TreeNode} root2
# @return {Integer[]}

def tree_to_array(root)
    return [] unless root
    stack = [root]
    arr = []
    
    until stack.empty?
       curr_node = stack.shift
        arr << curr_node.val
        if curr_node.left
           stack << curr_node.left 
        end
         if curr_node.right
           stack << curr_node.right 
        end
    end
    
    arr
end

def get_all_elements(root1, root2)
    (tree_to_array(root1) + tree_to_array(root2)).sort
end

# @param {Integer[][]} mat
# @param {Integer} k
# @return {Integer}


# @param {Integer[]} prices
# @return {Integer}

def max_profit(prices)
    max_profit = 0
    current_min = prices[0]
    
    prices.each do |price|
        current_min = price if price < current_min
        current_diff = price - current_min
        max_profit = current_diff if current_diff > max_profit
    end
    
    max_profit
end



# @param {Character[][]} grid
# @return {Integer}

def is_island?(row_idx,col_idx,grid)
    row_range = (row_idx-1..row_idx+1).to_a
    col_range = (col_idx-1..col_idx+1).to_a
    pos_arr = []

    row_range.each do |row_i|
       col_range.each do |col_i|
          if (row_idx != row_i || col_idx != col_i) && grid && grid[row_i]
              pos_arr << grid[row_i][col_i]
          end
       end
    end
    p pos_arr
    pos_arr.all? {|el| el == "0" || el == nil} && grid[row_idx][col_idx] == "1"
end

def num_islands(grid)
    return 0 if grid.empty?
    width = grid[0].length
    height = grid.length
    count_islands = 0
    
    (0...height).each do |row|
       (0...width).each do |col|
            if grid[row][col] == '1'
                count_islands += 1 if is_island?(row,col,grid) 
            end
       end
    end
    
    count_islands
end

puts num_islands([
    ["1","1","0","0","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","1"]])

