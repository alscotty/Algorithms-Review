# @param {Integer[]} nums
# @return {Integer}
  #  (0...nums.length-1).each do |idx|
   #     curr_product =  nums[idx]*nums[idx+1]
    #    max = curr_product if curr_product > max 
    # end

def nums_product(nums)
   product = nums.inject {|el,acc| acc*el} 
end

def max_product(nums)
    max = nums.max
    
    (0...nums.length).each do |start_idx|
        (start_idx...nums.length).each do |end_idx|
            curr_product = nums_product(nums[start_idx..end_idx]) 
            max = curr_product if curr_product > max
        end
    end
    
    max
end

# @param {Integer} n
# @return {String[]}
def fizz_buzz(n)
    nums_arr = ("1"..n.to_s).to_a
    
    (0...nums_arr.length).each do |idx|
        if nums_arr[idx].to_i % 3 == 0 && nums_arr[idx].to_i % 5 == 0
            nums_arr[idx] = 'FizzBuzz'
        elsif nums_arr[idx].to_i % 3 == 0
            nums_arr[idx] = 'Fizz'
        elsif nums_arr[idx].to_i % 5==0
            nums_arr[idx] = 'Buzz'
        end
    end

    nums_arr
end

def is_power_of_three(n)
    test_num = 3
    
    while test_num < n
        test_num = test_num * 3
    end
    
    test_num == n || n == 1
end

##almost complete:
# The is_bad_version API is already defined for you.
# @param {Integer} version
# @return {boolean} whether the version is bad
# def is_bad_version(version):

# @param {Integer} n
# @return {Integer}

# can do this in O(log(n))
# check mid idx => good, check right, bad check left
# like binary search!

def first_bad_version(n)
    
    
    searchable = (1..n).to_a
    
    mid_idx = searchable.length/2
    
    if is_bad_version(searchable[mid_idx])
        return first_bad_version(searchable[mid_idx..-1])
    else
        return first_bad_version(searchable[0...mid_idx])
    end
          
end

# @param {Integer[]} nums
# @return {Integer}

#sorted_arr always one number shorted than the 'complete' set

def missing_number(nums)
   sorted_arr = nums.sort
    
   full_arr = (0..nums.max).to_a 
    
    (0...sorted_arr.length).each do |idx|
        return full_arr[idx] if full_arr[idx] != sorted_arr[idx]
    end
        
    nums.max+1
end

# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} head
# @return {Boolean}

# if is cycle, return the index where the tail reconnects!
# else if not cycle, return -1


def hasCycle(head)
    
    visited = {}
    visited[head.val] = 0
    
    node = head
    idx = 0
    
    while node.next
        return visited[node.val] if visited[node.val]
        
        visited[node.val] = idx
        
        node = node.next
        idx++
    end

    -1
end

# @param {Integer[]} nums
# @return {Boolean}
def contains_duplicate(nums)
    count_hash = Hash.new(0)
    
    nums.each do |el|
       count_hash[el] +=1
    end
    
    return false if nums.empty?
    count_hash.values.sort.last > 1
end