arr = [
    ["a", "b"],
    ["c", "d"],
    ["e", "f"]
]

width = len(arr[0])
height = len(arr)

for col in range(height):
    for row in range(width):
        pass
        # print(arr[col][row])
        
        
nums_arr = [1,2,3,4,5]
odd_nums = list(filter(lambda x: x % 2 != 0, nums_arr))
print("odd_nums", odd_nums)
even_nums = list(filter(lambda x: x % 2 == 0, nums_arr))
print("even_nums", even_nums)
times_three = list(map(lambda x: x * 3, nums_arr))
print("times_three", times_three)
