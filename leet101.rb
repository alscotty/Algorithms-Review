#!/bin/ruby

require 'json'
require 'stringio'



#
# Complete the 'funWithAnagrams' function below.
#
# The function is expected to return a STRING_ARRAY.
# The function accepts STRING_ARRAY text as parameter.
#
# if any two words are anagrams of each other, remove the later one!
# return strings in sorted order, OK

def funWithAnagrams(word_arr)
    # Write your code here
    visited = {}

    word_arr.each_with_index do |word,idx|
        if visited[word.split("").sort.join("")]
            word_arr[idx] = ""
        else
            visited[word.split("").sort.join("")] = 1
        end
    end

    word_arr.delete("")
    word_arr.sort
end

fptr = File.open(ENV['OUTPUT_PATH'], 'w')

#!/bin/ruby

require 'json'
require 'stringio'



# Complete the stickers_for function below.
# "instagram"

def stickers_for(phrase)
    sticker_count = 0
    phrase.delete!(" ")

    until phrase.empty?
        "instagram".each_char do |char|
            if phrase.include?(char)
                idx = phrase.index(char)
                phrase = phrase[0...idx] + phrase[idx+1..-1]
            end
        end
        
        sticker_count += 1
    end

    sticker_count
end

fptr = File.open(ENV['OUTPUT_PATH'], 'w')