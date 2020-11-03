# @param {String} s
# @param {String} p
# @return {Integer[]}

def create_hash(str)
   h = Hash.new(0)
    str.each_char do |char|
       h[char] += 1 
    end
    h
end

def find_anagrams(s, p)
    size = p.length
    p_hash = create_hash(p)
    indices = []
    
    (0..s.length - size).each do |idx|
        word = s[idx...idx+size]
        indices << idx if p_hash == create_hash(word)
    end
    
    indices
end

