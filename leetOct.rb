    
# @param {Character[]} s
# @return {Void} Do not return anything, modify s in-place instead.

# 5/2 = 2
# 5/2.0 = 2.5
# ex. [1,2,3,4]

def reverse_string(s)
    size = s.length
    mid_idx = size/2
    (0...mid_idx).each do |idx|
       s[idx],s[size-idx-1] = s[size-idx-1],s[idx]
    end
end

# @param {Integer[][]} mat
# @return {Integer}

# check if space is 1
# check if space right is a 1
# check if space bottom is a 1
# check diag if both right && bottom == 1 

def check_adjacent_squares(mat,h,height,w,width)
   ct=0
    
    
    
    
    ct
end


def num_submat(mat)
    ct = 0
    height = mat.length
    width = mat[0].length
  
    (0...height).each do |row_idx|
        (0...width).each do |col_idx|
            if mat[row_idx][col_idx] == 1
                 ct +=1
                ct += check_adjacent_squares(mat,col_idx,height,row_idx,width)             
            end
        end
    end
    
    ct
end