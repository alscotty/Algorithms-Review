# /*
# Enter your query below.
# Please append a semicolon ";" at the end of the query
# */

# select buyer_id + 'TOTAL_WORTH'
# from house
#     Join price
#     on house.house_id = price.house_id
# Group by buyer_id
# having (SUM(price.price) > 100000000) AND (Count(*)>1)
# ;

# @param {Integer[]} bits
# @return {Boolean}

def is_one_bit_character(bits)
   
    until bits.length <=2
        if bits.first == 1
           2.times {bits.shift} 
        else
           bits.shift 
        end
    end
    
    bits == [0] || bits ==[0,0]
end

class KthLargest

=begin
    :type k: Integer
    :type nums: Integer[]
=end
    attr_accessor :k, :nums
    
    def initialize(k, nums)
        @k=k
        @nums=nums.sort
    end


=begin
    :type val: Integer
    :rtype: Integer
=end
    
    def log_insert(arr,val)
        return if arr.empty?
        if arr.length==1
            return val<arr.first ?  0 : 1
        end
        
        mid_idx = arr.length/2
        mid_two = arr[mid_idx-1..mid_idx]
        return mid_idx if val > mid_two.first && val < mid_two.last
        
        if val > mid_two.last
            res = log_insert(arr[mid_idx+1..-1],val)
            return res + (mid_idx*2)-1 if res
        else
            return log_insert(arr[0...mid_idx-1],val)
        end
        
    end
    
    
    def add(val)
        insert_idx = self.log_insert(@nums,val)
         if insert_idx == 0
            @nums.unshift(val)
         else
            @nums = @nums[0...insert_idx] + [val] + @nums[insert_idx..-1]
         end
        @nums[-k]
    end


end

# Your KthLargest object will be instantiated and called as such:
# obj = KthLargest.new(k, nums)
# param_1 = obj.add(val)