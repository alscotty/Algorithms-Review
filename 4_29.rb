#!/bin/ruby

require 'json'
require 'stringio'



#
# Complete the 'maxEvents' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY arrival
#  2. INTEGER_ARRAY duration
#
def checkCount(arrival,duration)
  return arrival.length if arrival.length<2

    event_count=1

    (1...arrival.length).each do |idx|
        prev_arrival = arrival[idx-1]
        curr_arrival = arrival[idx]
        time_req = duration[idx]

        event_count+=1 if time_req <= curr_arrival-prev_arrival
    end

    event_count

end



def maxEvents(arrival, duration)
    all_count = []

    while arrival.length
        all_count << checkCount(arrival,duration)
        arrival.shift
        duration.shift
    end

    all_count.max
end

fptr = File.open(ENV['OUTPUT_PATH'], 'w')

# @param {Integer[]} a
# @return {Integer}

# 3 ->1
# 4-> 2
# 5->3
# any array where length>=3; l-2 products to add; BUT more!! options to consider to find the min..




def product(arr)
   arr.inject{|el,acc| el*acc}
end


def min_score_triangulation(a)
    return nil if a.length<3
    
    a.sort!
    min_sum = 0
    
    lowest_pair = a[0..1]
    2.times { a.shift }
    
    a.each do |el|
       min_sum += product([*lowest_pair, el]) 
    end
    
    min_sum
end

# @param {String[]} list1
# @param {String[]} list2
# @return {String[]}

def find_restaurant(list1, list2)
    min_idx_sum = list1.length+list2.length
    fav=[]
    
    list1.each_with_index do |restaurant,idx|
        pair_idx = list2.index(restaurant)
        next unless pair_idx
        
        if (idx + pair_idx) == min_idx_sum
            fav << restaurant            
        elsif (idx + pair_idx) < min_idx_sum
           min_idx_sum =  (idx + pair_idx)
            fav << restaurant
        end
        
    end
    
    
    fav 
end