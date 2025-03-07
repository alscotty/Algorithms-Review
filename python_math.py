# STEP 1: Complete analyze function to return 5 values
#    - minimum
#    - maximum
#    - mean (a.k.a. average)
#    - median (center point)
#    - mode (most repeated)
def analyze(nums):
    return (min(nums),max(nums), sum(nums)/len(nums), median(nums), mode(nums))

# STEP 2: Complete median function to return center number
#         WITHOUT using built-in function
def median(nums):
    nums = list(nums)
    list(nums).sort()
    length = len(nums)
    mid_idx = length // 2
    return nums[mid_idx] if length % 2 == 1 else (nums[mid_idx - 1] + nums[mid_idx]) / 2 # for even, take average of two middle numbers

# STEP 3: Complete mode function to return most-repeated number
#         WITHOUT using built-in function
# BONUS B: Catch special case where more than one value repeats the most
def mode(nums):
    freq_dict = {}
    for num in nums:
        if num in freq_dict:
            freq_dict[num] += 1
        else:
            freq_dict[num] = 1
    max_freq = max(freq_dict.values())
    modes = []
    for key, value in freq_dict.items():
        if value == max_freq:
            modes.append(key)
    return modes

# DO NOT EDIT - sample data for checking your work
sample1 = 1,2,3,4,5,6,7,8,9
sample2 = [37,45,23,65,75,34,23,23,23,65,12,99]
print(('min', 'max', 'mean', 'median', 'mode'))
print(analyze(sample1))
print(analyze(sample2))

# BONUS A: Print more samples as you see fit
