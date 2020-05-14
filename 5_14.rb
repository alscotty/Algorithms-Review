# @param {Integer} m
# @param {Integer} n
# @return {Integer}

# always start at top left, and end at bottom right
# can either move right or down
# grid is m * n in size:
# m is width (columns)
# n is height (rows)

def unique_paths(m, n, pos=[1,1], uniq_paths=0)
    end_pt = [m,n]
    uniq_paths+=1 if pos == end_pt    
    
    x = pos[0]
    y = pos[1]
    
    if x+1 <= m
       unique_paths(m,n,[x+1,y],uniq_paths) 
    end
    
    if y+1 <=n
       unique_paths(m,n,[x,y+1],uniq_paths) 
    end
    
    uniq_paths
end