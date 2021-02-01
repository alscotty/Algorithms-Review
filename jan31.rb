
def trim_mean(arr)
    sorted_arr = arr.sort
    length = arr.length
    puts "regular sorted:"
    p sorted_arr

    five_percent_count = length * 0.05
    
    five_percent_count.ceil.times do 
        sorted_arr.pop
        sorted_arr.shift
    end

    puts "after 5% cuts"
    p sorted_arr
        
    ((sorted_arr.sum * 1.000) / sorted_arr.length * 1.0000) * 1.00000
end



# @param {String} pattern
# @param {String} s
# @return {Boolean}
def word_pattern(pattern, s)
    words = s.split(' ')
    return false unless words.length == pattern.length
    seen_words = Set.new
    tracker = {}
    
    
  (0...words.length).each do |i|
      word = words[i]
      unless tracker[pattern[i]]
          return false if seen_words.include?(word)
         tracker[pattern[i]] = word
          
          seen_words.add(word)
      end
       return false unless tracker[pattern[i]] == word
  end
    
    true
end

# {
#      a:'dog',
#      b:'dog'
# }