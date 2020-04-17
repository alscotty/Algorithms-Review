
#!/bin/ruby

require 'json'
require 'stringio'


#
# Complete the 'groupTransactions' function below.
#
# The function is expected to return a STRING_ARRAY.
# The function accepts STRING_ARRAY transactions as parameter.
#dfdfdfdd

#sorted by: descending transaction count!
    #then ascending by name!

# iterate through transactions, store in a hash, key is the item, val is num times appears
#  sort transaction count desc
# sort by name asc
# print out in order with space in b/t key and val


def groupTransactions(transactions_arr)
    # Write your code here
    transaction_hash = Hash.new(0)

    transactions_arr.each do |item|
        transaction_hash[item] += 1
    end

    transaction_hash = transaction_hash.sort_by {|key,val| val}.reverse
    transaction_hash = transaction_hash.sort_by {|k,v| k}

    transaction_hash.each do |item_pair|
        p "#{item_pair[0]} #{item_pair[1]}"
    end

end
fptr = File.open(ENV['OUTPUT_PATH'], 'w')