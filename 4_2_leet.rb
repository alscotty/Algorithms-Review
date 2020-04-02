# @param {String} s
# @return {Integer}

def has_repeats?(str)
    str.split("").length != str.split("").uniq.length
end
    
def length_of_longest_substring(s)
    longest_length=0
    
    (0..s.length).each do |start_idx|
        (start_idx..s.length).each do |end_idx|
        substr = s[start_idx..end_idx]
            
        longest_length = substr.length if (!has_repeats?(substr) && substr.length>longest_length)         
        end
    end
    
    longest_length
end

def valid_set(arr)
    filtered_arr=[]
    arr.each {|el| filtered_arr.push(el) if el != "."}
    filtered_arr.uniq.length == filtered_arr.length
end

def is_valid_sudoku(board)

    #check rows && columns
    return false unless board.all? {|row| valid_set(row)}
    return false unless board.transpose.all? {|col| valid_set(col)}
    
    #check top three grids, then pop off board!
    while board.length > 2
        left=[]
        mid=[]
        right=[]
        (0..2).each do |i|
            (0..8).each do |j|
                if j<=2
                    left<<board[i][j]
                elsif j>2 && j<6
                    mid<<board[i][j]
                else
                    right<<board[i][j]
                end
            end 

        end
        # puts "left : #{left}"
        return false unless valid_set(left) && valid_set(mid) && valid_set(right)
        
        3.times {board.shift}
    end
    
    true
end

# @param {String} haystack
# @param {String} needle
# @return {Integer}
def str_str(haystack, needle)

    (0...(haystack.length-needle.length)).each do |start_idx|
        return start_idx if needle == haystack[start_idx...(start_idx+needle.length)]
   end
    
    -1
end

puts is_valid_sudoku([
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
])
#true


puts is_valid_sudoku([
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
])

#false