class Change
    attr_accessor :num

    def initialize(num)
        @num = num
    end

    def change
        self.num = 4
    end

end


class Solution

=begin
    :type nums: Integer[]
=end
    attr_accessor :current
    attr_reader :original
    
    def initialize(nums)
        @original=nums
        @current = nums
    end


=begin
    Resets the array to its original configuration and return it.
    :rtype: Integer[]
=end
    def reset()
        @current = [1,2,3]
    end


=begin
    Returns a random shuffling of the array.
    :rtype: Integer[]
=end
    def shuffle()
        
        shuffle_switches = @current.length
        
        shuffle_switches.times {
            idx1 = rand(@current.length)
            idx2=rand(@current.length)
            @current[idx1],@current[idx2] =  @current[idx2],@current[idx1]  
        }
        
        self.current
    end


end

# Your Solution object will be instantiated and called as such:
# obj = Solution.new(nums)
# param_1 = obj.reset()
# param_2 = obj.shuffle()

sol = Solution.new([1,2,3])

sol.shuffle
p sol

sol.reset
p sol.original