# @param {Integer} n
# @return {Integer}

def fib(n)
    if n == 0
       return 0
    elsif n == 1
        return 1
    end
        
    fib(n-1)+fib(n-2)    
end

# @param {Integer[]} candies
# @return {Integer}

def distribute_candies(candies)
    num_candies = candies.size
    num_uniq_candies = 0
    candies_set = Set.new()
    
    candies.each do |candy|
        num_uniq_candies += 1 unless candies_set.include?(candy)
        candies_set.add(candy)
    end
    
    [num_candies/2,num_uniq_candies].min
end

def distribute_candies(candies)
    [candies.uniq.size,(candies.size/2)].min
end

def last_stone_weight(stones)
    sorted_stones = stones.sort
    
    while sorted_stones.length > 1
       last_stone = sorted_stones.pop
        second_to_last_stone = sorted_stones[-1]
        diff = (last_stone - second_to_last_stone).abs
        diff == 0 ? sorted_stones.pop : sorted_stones[-1] = diff
        sorted_stones.sort!
    end
    
    sorted_stones.empty? ? 0 : sorted_stones[0]
end

class TimeMap
    attr_accessor :cache
    
    def initialize
        @cache = Hash.new { |h, k| h[k] = [] } 
    end

    def set(key, value, timestamp)
        cache[key][timestamp] = value
    end

    def get(key, timestamp)
        return "" unless cache[key]
        return cache[key][timestamp] if cache[key][timestamp]
		
        timestamp.downto(0) do |n|
            return cache[key][n] if cache[key][n]
        end
        ""
    end
end

# @param {String} s
# @return {Boolean}

def is_valid(s)
    visited_left_brackets = []
    left_brackets = "({["
    
    s.each_char do |char|
        if left_brackets.include?(char)
           visited_left_brackets << char 
        elsif char == ')'
            if visited_left_brackets[-1] == '('
               visited_left_brackets.pop
            else
                return false
            end
        elsif char == '}'
            if visited_left_brackets[-1] == '{'
                visited_left_brackets.pop
            else
                return false
            end
        elsif char == ']'
            if visited_left_brackets[-1] == '['
                visited_left_brackets.pop
            else
                return false
            end
        end
    end
    
    visited_left_brackets.length == 0
end

class MinStack
    attr_reader :min_stack
=begin
    initialize your data structure here.
=end
    def initialize()
        @min_stack = []
        @current_min = nil
    end


=begin
    :type x: Integer
    :rtype: Void
=end
    def push(x)
        @min_stack << x
        if !@current_min || x < @current_min
           @current_min = x 
        end
    end


=begin
    :rtype: Void
=end
    def pop()
        last = @min_stack.pop
        if @current_min == last
           @current_min = @min_stack.min 
        end
    end


=begin
    :rtype: Integer
=end
    def top()
        @min_stack.last
    end


=begin
    :rtype: Integer
=end
    def get_min()
        @current_min
    end


end

# Your MinStack object will be instantiated and called as such:
# obj = MinStack.new()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.get_min()

# @param {String[]} strs
# @return {String[][]}

def are_anagrams?(str1,str2)
   str1.split('').sort == str2.split('').sort 
end

def group_anagrams(strs)
    grouped_anagrams = [[strs.shift]]
    
    strs.each do |word|
       pushed = false
       (0...grouped_anagrams.length).each do |anagram_idx|
            if are_anagrams?(grouped_anagrams[anagram_idx][0],word)
                grouped_anagrams[anagram_idx] << word                    
                pushed = true
            end
       end
       grouped_anagrams << [word] unless pushed
    end
        
    grouped_anagrams
end

# Faster solution!
# @param {String[]} strs
# @return {String[][]}

def group_anagrams(strs)
    anagram_hash = Hash.new {|hash,key| hash[key] = []}
    
    strs.each do |word|
        sorted_word = word.chars.sort
        anagram_hash[sorted_word] << word
    end
    
    anagram_hash.values
end