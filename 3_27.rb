# @param {String} pattern
# @param {String} s
# @return {Boolean}

def word_pattern(pattern, s)
    pattern_hash = {}
    word_hash = {}
    words_arr = s.split(" ")
    return false unless pattern.length == words_arr.length
    
    (0...pattern.length).each do |i|
        p = pattern[i]
        word = words_arr[i]
       if !pattern_hash[p] && !word_hash[word]
          pattern_hash[p] = word
          word_hash[word] = p
       elsif pattern_hash[p] != word || word_hash[word] != p
            return false           
       end
    end
   
    true
end

puts word_pattern("abba", "dog cat cat fish")
puts ('^ exp false')
puts word_pattern("abba", "dog dog dog dog")
puts ('^ exp false')
puts word_pattern("abba", "dog cat cat dog")
puts ('^ exp true')

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