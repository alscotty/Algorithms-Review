/**
 * @param {number[]} nums
 * @return {number}
 * Given an unsorted array of integers nums, return the length of the longest continuous increasing subsequence (i.e. subarray). The subsequence must be strictly increasing.

A continuous increasing subsequence is defined by two indices l and r (l < r) such that it is [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] and for each l <= i < r, nums[i] < nums[i + 1].

Pretty straightforward, can solve in 0(n) time complexity and constant space complexity.
 */
const findLengthOfLCIS = function(nums) {
    let maxSeqLength = 1;
    let currentSeqLength = 1;
    
    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx] > nums[idx-1]) {
            currentSeqLength++
            if (currentSeqLength > maxSeqLength) maxSeqLength = currentSeqLength
            } else {
            currentSeqLength = 1
        }
    }
    
    return maxSeqLength
};


const traverseGrid = function (grid, x, y) {
    // Base case: out of bounds or cell with no gold
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] === 0) {
        return 0;
    }

    // Collect gold at the current cell and mark it as visited (temporarily set to 0)
    const gold = grid[x][y];
    grid[x][y] = 0; // Mark as visited

    // Explore all four directions and get the maximum gold possible
    const maxGold = Math.max(
        traverseGrid(grid, x + 1, y),
        traverseGrid(grid, x - 1, y),
        traverseGrid(grid, x, y + 1),
        traverseGrid(grid, x, y - 1)
    );

    // Restore the grid cell value for future traversals
    grid[x][y] = gold;

    return gold + maxGold;
};

const getMaximumGold = function (grid) {
    let maxTally = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] > 0) {
                maxTally = Math.max(maxTally, traverseGrid(grid, x, y));
            }
        }
    }

    return maxTally;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
const calculateSum =function(numsArray) {
    let sum = 0
    for (let num of numsArray) {
        sum += num;
    }
    return sum;
}

const findMiddleIndex = function(nums) {
    if (nums.length === 1) return 0
    if (nums.length === 2 && nums[1] === 0) return 0

    const totalSum = calculateSum(nums);
    let leftSum = 0

    for (let idx in nums) {
        idx = Number(idx)
        if (idx === 0) continue;

        leftSum += nums[idx - 1];
        rightSum = totalSum - leftSum - nums[idx];
        if (leftSum === rightSum) return idx
        }

    return -1;
};