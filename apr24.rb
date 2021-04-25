# @param {Integer} x
# @return {Boolean}

def is_palindrome(x)
    return false if x < 0
    
    x.to_s == x.to_s.reverse
end

# @param {String} num1
# @param {String} num2
# @return {String}

def add_strings(num1, num2)
 (num1.to_i + num2.to_i).to_s    
end

# @param {Integer[]} nums
# @return {Integer}

def single_number(nums)
    seen_numbers = Set.new
    potential_singles = Set.new
    
    nums.each do |num|
        has_seen =  seen_numbers.include?(num)
        
        if !has_seen
            potential_singles = seen_numbers.add(num)
            seen_numbers.add(num) 
        else
            potential_singles.delete(num)
        end
    end
    
    potential_singles.to_a[0]
end

# @param {Character[][]} board
# @return {Boolean}

def validate_numbers(numbers)
    filtered_nums = numbers.select {|num| num != '.'}
    filtered_nums.uniq.length == filtered_nums.length
end

def is_valid_sudoku(board)
    # check rows
    return false unless board.all? {|row| validate_numbers(row)}
    # check columns
    
    # check square

    true
end