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


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
    // If one of the trees is null, return the other tree
    if (!root1) return root2;
    if (!root2) return root1;

    // Merge the values of root1 and root2
    let merged = new TreeNode(root1.val + root2.val);

    // Recursively merge the left and right subtrees
    merged.left = mergeTrees(root1.left, root2.left);
    merged.right = mergeTrees(root1.right, root2.right);

    return merged;
};


/**
 * @param {number[][]} grid
 * @return {number}
  
 For two be an island, must not touch the edge of our grid!
 AND it must be completely surrounded by water


iterate through spaces, each one determine am I part of an island?
If I am, mark coordinate somehow to avoid double counting!
 */

const isIsland = (xCoord, YCoord, grid, visitedForIsland = new Set()) => {
    
}


const closedIsland = (grid) => {
    let totalClosedIslands = 0;
    
    for(let x = 0; x < grid[0].length; x++) {
        for(let y = 0; y < grid.length; y++) {
            let spaceValue = grid[x][y];
    
            if(spaceValue == 1) continue;
            
            totalClosedIslands += isIsland()
        }
    }
    
    return totalClosedIslands;
};



// Here's a JavaScript solution to count the number of closed islands using DFS:

// javascript
// Copy code
function closedIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Helper function to run DFS and mark all land connected to (i, j)
    const dfs = (i, j) => {
        // Base case: if out of bounds or water, return
        if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === 1) return;
        
        // Mark the cell as visited by turning land (0) into water (1)
        grid[i][j] = 1;

        // Perform DFS in all four directions
        dfs(i - 1, j); // Up
        dfs(i + 1, j); // Down
        dfs(i, j - 1); // Left
        dfs(i, j + 1); // Right
    };

    // Eliminate all land connected to the boundary (these cannot be closed islands)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if ((i === 0 || i === rows - 1 || j === 0 || j === cols - 1) && grid[i][j] === 0) {
                // Run DFS from the boundary land to mark it as non-closed
                dfs(i, j);
            }
        }
    }

    let closedIslands = 0;

    // Now, count all the remaining closed islands
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 0) {
                // This is a closed island, perform DFS to mark all its land
                dfs(i, j);
                closedIslands++;
            }
        }
    }

    return closedIslands;
}
