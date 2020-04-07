def myst(a,b)
    x=a
    y=b

    until x == y
        if x>y
            x = x-y
        else
            y = y-x
        end
    end
    x
end


#
# Complete the 'isPossible' function below.
#
# The function is expected to return a STRING.
# The function accepts following parameters:
#  1. INTEGER a
#  2. INTEGER b
#  3. INTEGER c
#  4. INTEGER d
#

# only move up or right!
# recursion:
#  return nothing if a > c OR b > d 
# if a==c && b == d, return true
#return "No" at the end, below all logic
#
# inductive step: recursively search with adds to a or b



def isPossible(a, b, c, d)
    return "Yes" if a==c && b==d
    return if a > c || b > d
    p "Spot: (#{a},#{b})"

    added_val = a + b
    isPossible(a,added_val,c,d)
    isPossible(added_val,b,c,d)

    "No"
end

# p isPossible(1,4,5,9) => "Yes"


# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end

# @param {TreeNode} root
# @return {Boolean}

def is_valid_bst(root)
    return unless root
    if root.left 
        return false unless root.left.val < root.val
    elsif root.right
        return false unless root.right.val > root.val
    end
    
    
    is_valid_bst(root.left) && is_valid_bst(root.right)
end

# @param {Character[]} s
# @return {Void} Do not return anything, modify s in-place instead.

def reverse_string(s)
    stop_idx = s.length/2
    
    (0...stop_idx).each do |idx|
        s[idx], s[-idx-1] =  s[-idx-1], s[idx]
    end
    
end

# @param {Integer} x
# @return {Integer}


def reverse(x)
    reversed_num=x.to_s.split("").reverse.join("").to_i
    
    return 0 unless reversed_num < 2**31 && reversed_num > -2**31
    
    x >0 ? reversed_num : -reversed_num
end

# @param {String} s
# @param {String} t
# @return {Boolean}

def is_anagram(s, t)
    s.split("").sort == t.split("").sort
end

