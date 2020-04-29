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