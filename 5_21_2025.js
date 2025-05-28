// 1. Recursion Problem: Generate Parentheses
// LeetCode 22: Generate Parentheses
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
/**
 * @param {number} n
 * @return {string[]}
 */
function generateParentheses(n) {
    const result = [];
    
    function backtrack(open, close, current) {
        // Base case: if we've used all parentheses
        if (current.length === n * 2) {
            result.push(current);
            return;
        }
        
        // Add opening parenthesis if we haven't used all opening ones
        if (open < n) {
            backtrack(open + 1, close, current + '(');
        }
        
        // Add closing parenthesis if we have more opening ones than closing
        if (close < open) {
            backtrack(open, close + 1, current + ')');
        }
    }
    
    backtrack(0, 0, '');
    return result;
}

// 2. Binary Tree Problem: Binary Tree Level Order Traversal
// LeetCode 102: Binary Tree Level Order Traversal
// Given the root of a binary tree, return the level order traversal of its nodes' values.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// 3. String Manipulation Problem: Longest Palindromic Substring
// LeetCode 5: Longest Palindromic Substring
// Given a string s, return the longest palindromic substring in s.
/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    if (s.length < 2) return s;
    
    let start = 0;
    let maxLength = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLength) {
                start = left;
                maxLength = right - left + 1;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        // Check for odd length palindromes
        expandAroundCenter(i, i);
        // Check for even length palindromes
        expandAroundCenter(i, i + 1);
    }   
    
    return s.substring(start, start + maxLength);
}

// Example usage:
console.log(generateParentheses(3)); // ["((()))","(()())","(())()","()(())","()()()"]

// For binary tree example:
const tree = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
        val: 20,
        left: { val: 15, left: null, right: null },
        right: { val: 7, left: null, right: null }
    }
};
console.log(levelOrder(tree)); // [[3],[9,20],[15,7]]

console.log(longestPalindrome("babad")); // "bab" or "aba"
