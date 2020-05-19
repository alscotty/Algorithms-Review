# /*
# Enter your query here.
# */

# SELECT 'Student ', id, 'has grade: ',
# CASE
#     WHEN score < 20 THEN 'F'
#     WHEN score >=20 AND score<40 THEN 'D'
#     WHEN scorasdadae >40 AND score<60 THEN 'C'
#     WHEN score >=60 AND score<80 THEN 'B'
#     ELSE 'A'
# END AS grade

# FROM Student
# ORDER BY id ASC


class Node
    attr_accessor :val, :left, :right

    def initialize(val)
        @val = val
        @left = nil
        @right=nil
    end

end

def insert(root,key, counter)
    puts counter
    counter+=1 

    if key<root.val
        root.left ? insert(root.left,key,counter) : root.left = Node.new(key) 
    else
        root.right ? insert(root.right,key,counter) : root.right = Node.new(key) 
    end

end


def createBST(keys)
    # Write your code here
    counter=0
    root = Node.new(keys.shift)
    
    keys.each do |key|
        insert(root,key,counter)
    end


end

createBST([2,3,4,1])