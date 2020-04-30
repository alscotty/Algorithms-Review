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


def first_uniq_char(s)
    return -1 if s.empty?
    
    count_hash = Hash.new {|hash,key| hash[key]=[]}
    
    s.each_char.with_index do |char, idx|
       count_hash[char]<<idx
    end
    
    count_hash = count_hash.invert
    
    min_arr = count_hash.min_by {|indices, val| indices.length}
    
    return min_arr.first[0] if min_arr.first.length == 1
    
    -1
end