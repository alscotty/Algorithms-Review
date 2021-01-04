class MedianFinder

=begin
    initialize your data structure here.
=end
    def initialize()
        @numbers = []
        @length = 0
    end


=begin
    :type num: Integer
    :rtype: Void
=end
    def add_num(num, arr = @numbers)
        @numbers << num if @numbers.empty?
        
        mid_idx = (arr.length-1)/2
        
        if num == arr[mid_idx]
            desired_idx = mid_idx
        elsif num < arr[mid_idx]
            desired_idx = self.add_num(num,arr[0...mid_idx])
        else
           right_search = self.add_num(num,arr[mid_idx+1..-1])
            desired_idx = right_search ? right_search + arr[0..mid_idx].length : 0
        end
        
        @numbers.insert(desired_idx,num)
        @length += 1
    end
    
    # def add_num(num)
    #     @numbers << num
    #     @length += 1
    # end


=begin
    :rtype: Float
=end
    def find_median()
        mid_idx = (@length-1)/2
        
        if @length.even?
            return @numbers[mid_idx..mid_idx+1].sum / 2.0    
        else
            return @numbers[mid_idx] / 1.0
        end
        
    end


end

# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder.new()
# obj.add_num(num)
# param_2 = obj.find_median()