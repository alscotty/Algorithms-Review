

#
# Complete the 'createBST' function below.
#
# The function accepts INTEGER_ARRAY keys as parameter.
#
class Node 
    attr_accessor :val, :left, :right

    def initialize(val)
        @val=val
        @left=nil
        @right = nil
    end

end


def insert(root,key,counter)
    counter +=1
    if key <= root.val
        if !root.left
            root.left = Node.new(key)
            puts counter
        else
            insert(root.left, key,counter)
        end
    else
        if !root.right
            root.right = Node.new(key)
            puts counter
        else
            insert(root.right, key, counter)
        end
    end
end

def createBST(keys, counter=0)
    # Write your code here
    root = nil
    puts counter

    keys.each do |key|
        p "current key: #{key}"
        if root
            insert(root,key,counter)
        else
            root = Node.new(key)
        end
    end
    # puts counter

end

# keys_count = gets.strip.to_i

# puts createBST([1,2,3])

def getHeight(arr)
    # Write your code here
    arr.sort!
    
    

    (1...arr.length).each do |idx|
        while (arr[idx] - arr[idx-1]) > 1
            arr[idx]-=1
        end
    end


    arr.last
end

puts getHeight([2,3,3,5])