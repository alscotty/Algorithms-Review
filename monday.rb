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