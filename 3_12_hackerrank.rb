#Recursive solution to find out if 2 binary tree are the same when given the root node of each:

def is_same_tree(p, q)
    return true if !p && !q
    return false if !p || !q
    return false if p.val != q.val
        
    return is_same_tree(p.right,q.right) && is_same_tree(p.left,q.left)
end

def single_number(nums)
   hash=Hash.new(0)
    nums.each do |num|
       hash[num]+=1 
    end
    hash.invert[1]
end