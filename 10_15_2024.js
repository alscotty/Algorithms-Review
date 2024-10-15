/**
 * @param {string} s
 * @return {boolean}
 * basic parenthesis/brackets validator using a stack
 */
const isValid = function (s) {
    let leftParensOptions = ['(', '{', '[']

    let stack = [];

    for (paren of s) {
        let prevParen = stack[stack.length - 1];

        if (leftParensOptions.includes(paren)) {
            stack.push(paren);
        } else if (prevParen) {
            if ((paren == ')' && prevParen == '(') || (paren == ']' && prevParen == '[') || (paren == '}' && prevParen == '{')) {
                stack.pop();
            } else {
                return false;
            }
        } else {
            return false
        }
    }

    return stack.length === 0;
};

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
 * @return {number}
 * 
 * want the maximum depth of any given Binary tree
 */
var maxDepth = function (root, currentDepth = 0) {
    if (!root) return currentDepth;

    currentDepth++

    return Math.max(maxDepth(root.left, currentDepth), maxDepth(root.right, currentDepth));
};


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * simple string/array manipulation:
 * 
 * Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

 

Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false
 */
var isSubsequence = function (s, t) {
    let subsequenceArray = s.split('');

    for (let char of t) {
        if (char == subsequenceArray[0]) subsequenceArray.shift();
    }

    return subsequenceArray.length == 0;
};