def height_checker(heights)
   moves = 0
    
    sorted = false
    
    while !sorted
       sorted = true
        (0...heights.length).each do |idx|
           curr_student = heights[idx]
            next_students = heights[idx+1..-1]
            if next_students.any? {|el| el>curr_student}
                sorted = false
                swap_idx = heights.index(next_students.min)
                heights[idx],heights[swap_idx] = heights[swap_idx], heights[idx]
                moves+=1
            end 
        end
        p heights
    end
    
    
    moves
end

#correct answer:
def height_checker(heights)
  sorted_heights = heights.sort
  count = 0
  heights.each_with_index { |h,i|
    count += 1 if h != sorted_heights[i]
  }
  count
end

# @param {Integer[]} numbers
# @param {Integer} target
# @return {Integer[]}
# iterate over numbers
# iterate over rest of numbers, search sum
# O(n^2)

#even arr [1,2,3,4]
# l =4, mid = 2

#odd arr [1,2,3]
# l = 3 ,mid =1

def two_sum(numbers, target)
   mid_idx = numbers.length/2
    
   (0..mid_idx).each do |idx|
      (idx+1...numbers.length).each do |pair_idx|
         return [idx+1,pair_idx+1] if numbers[idx]+numbers[pair_idx] == target 
      end
   end
 
end

