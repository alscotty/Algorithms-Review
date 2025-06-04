// 1. Two Sum
// LeetCode 1: Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    
    return [];
}

// 2. Valid Parentheses
// LeetCode 20: Valid Parentheses
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const pairs = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    
    for (let char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else {
            const last = stack.pop();
            if (pairs[last] !== char) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// 3. Merge Two Sorted Lists
// LeetCode 21: Merge Two Sorted Lists
// Merge two sorted linked lists and return it as a sorted list.
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}

// 4. Maximum Subarray
// LeetCode 53: Maximum Subarray
// Find the contiguous subarray with the largest sum.
/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    let maxSoFar = nums[0];
    let currentMax = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }
    
    return maxSoFar;
}

// 5. Climbing Stairs
// LeetCode 70: Climbing Stairs
// You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.
/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev = 1;
    let curr = 2;
    
    for (let i = 3; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

// 1. Number of Islands
// LeetCode 200: Number of Islands
// Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.
/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    if (!grid || !grid.length) return 0;
    
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        
        grid[r][c] = '0'; // Mark as visited
        
        // Check all four directions
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    
    return count;
}

// 2. Word Ladder
// LeetCode 127: Word Ladder
// Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence.
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length) {
        const [word, level] = queue.shift();
        
        if (word === endWord) return level;
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    queue.push([newWord, level + 1]);
                    visited.add(newWord);
                }
            }
        }
    }
    
    return 0;
}

// 3. Coin Change
// LeetCode 322: Coin Change
// Given an array of coins and an amount, return the fewest number of coins needed to make up that amount.
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 4. Longest Increasing Subsequence
// LeetCode 300: Longest Increasing Subsequence
// Given an integer array nums, return the length of the longest strictly increasing subsequence.
/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
    const dp = new Array(nums.length).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                maxLen = Math.max(maxLen, dp[i]);
            }
        }
    }
    
    return maxLen;
}

// 5. Word Break
// LeetCode 139: Word Break
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length];
} 