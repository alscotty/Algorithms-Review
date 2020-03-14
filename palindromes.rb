def howManyPalindromes(s, lower, upper)
    # Write your code here and below:
    palin_count= Array.new(lower.length,0)

    start_idx=0
    while (start_idx<s.length)
        substr=""
        end_idx=start_idx
        while end_idx < s.length
        substr=s[start_idx..end_idx]
            if substr == substr.reverse
                length=substr.length
                i=0
                while i< lower.length
                    palin_count[i]+=1 if length>=lower[i] && length<= upper[i]
                    i+=1
                end
            end
        end_idx+=1
        end
        start_idx+=1
    end


    palin_count.each {|count| puts count}
end