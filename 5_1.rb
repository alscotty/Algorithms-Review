

def countdown(num)
  return 'blast off!' if num ==0
  
  puts num
  countdown(num-1)
  
  
end

puts countdown(5)

