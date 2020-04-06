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
