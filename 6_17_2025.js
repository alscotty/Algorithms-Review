// 1. Median of Two Sorted Arrays
// Question:
// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    let x = nums1.length, y = nums2.length;
    let low = 0, high = x;
    while (low <= high) {
        let partitionX = Math.floor((low + high) / 2);
        let partitionY = Math.floor((x + y + 1) / 2) - partitionX;
        let maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        let minX = partitionX === x ? Infinity : nums1[partitionX];
        let maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        let minY = partitionY === y ? Infinity : nums2[partitionY];
        if (maxX <= minY && maxY <= minX) {
            if ((x + y) % 2 === 0) {
                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
            } else {
                return Math.max(maxX, maxY);
            }
        } else if (maxX > minY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    throw new Error("Input arrays are not sorted.");
}

// 2. Trapping Rain Water
// Question:
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, res = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.max(leftMax, height[left]);
            res += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.max(rightMax, height[right]);
            res += rightMax - height[right];
            right--;
        }
    }
    return res;
}

// 3. Sliding Window Maximum
// Question:
// Given an array nums and a sliding window of size k, return the maximum value in each window as it slides from left to right.
function maxSlidingWindow(nums, k) {
    let deque = [], res = [];
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (deque[0] === i - k) deque.shift();
        if (i >= k - 1) res.push(nums[deque[0]]);
    }
    return res;
}

// 4. N-Queens II
// Question:
// The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other. Given an integer n, return the number of distinct solutions to the n-queens puzzle.
function totalNQueens(n) {
    let count = 0;
    function backtrack(row, cols, diags1, diags2) {
        if (row === n) {
            count++;
            return;
        }
        for (let col = 0; col < n; col++) {
            let d1 = row - col + n, d2 = row + col;
            if (cols[col] || diags1[d1] || diags2[d2]) continue;
            cols[col] = diags1[d1] = diags2[d2] = true;
            backtrack(row + 1, cols, diags1, diags2);
            cols[col] = diags1[d1] = diags2[d2] = false;
        }
    }
    backtrack(0, Array(n).fill(false), Array(2 * n).fill(false), Array(2 * n).fill(false));
    return count;
}

// 5. Edit Distance
// Question:
// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You may perform insert, delete, or replace an operation.
function minDistance(word1, word2) {
    let m = word1.length, n = word2.length;
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    return dp[m][n];
}
