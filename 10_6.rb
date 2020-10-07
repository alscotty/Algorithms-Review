# @param {String[]} strs
# @return {String}
def longest_common_prefix(strs)
    longest_prefix = ''
    
    i = 0
    continue = true
    while continue
     this_letter = strs[0][i]
     if strs.all?{|str| str[i] == this_letter}
        p this_letter
        p longest_prefix
        longest_prefix += this_letter
        i += 1
     else
         continue = false
     end
    end
    
    longest_prefix
end