# @param {String} paragraph
# @param {String[]} banned
# @return {String}

def clean_word(word)
    punct = "!?',;."
    word.split("").select {|char| !punct.include?(char)}.join('')   
end

def most_common_word(paragraph, banned)
    word_hash = Hash.new(0)
    
    paragraph.split(" ").each do |word|
        word = clean_word(word).downcase
        unless banned.include?(word)
            word_hash[word] += 1
        end
    end
    
    word_hash.max_by {|key,value| value}.first
end

# @param {Integer} left
# @param {Integer} right
# @return {Integer[]}

def is_self_dividing?(num)
   divisors = num.to_s.split("").map {|str_num| str_num.to_i} 
    return false if divisors.include?(0)
    divisors.all? {|divisor| num % divisor == 0}
end


def self_dividing_numbers(left, right)
    (left..right).to_a.select{|num| is_self_dividing?(num)}
end