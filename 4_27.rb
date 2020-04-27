#!/bin/ruby

#
# Complete the 'getTriangleArea' function below.
#
# The function is expected to return a LONG_INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY x
#  2. INTEGER_ARRAY y
#

def getTriangleArea(x, y)
    # Write your code here
    base=x.max-x.min
    height=y.max-y.min

    (base*height)/2
end

