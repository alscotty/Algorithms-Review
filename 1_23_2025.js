/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

const traverseGrid = (startingPos, board, word, visited = new Set(), letterPath = '') => {
    const [x, y] = startingPos;
    let posString = `${x},${y}`;

    // Base cases
    if (letterPath === word || letterPath === word.split('').reverse().join('')) return true;
    if (letterPath.length == word.length) return false;
    if (visited.has(posString)) return false;
    if (!(board[x] && board[x][y])) return false;

    visited.add(posString); // Mark the current cell as visited
    let currentLetter = board[x][y];
    letterPath += currentLetter;

    console.log({letterPath})

    // Recursively explore all neighbors
    let pathBools = [
        traverseGrid([x - 1, y], board, word, visited, letterPath), // Up
        traverseGrid([x + 1, y], board, word, visited, letterPath), // Down
        traverseGrid([x, y - 1], board, word, visited, letterPath), // Left
        traverseGrid([x, y + 1], board, word, visited, letterPath)  // Right
    ];

    visited.delete(posString); // Unmark the current cell as visited (backtracking)
    return pathBools.some(bool => bool === true);
};


var exist = function(board, word) {
    let width = board[0].length;
    let height = board.length;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let canExist = traverseGrid([x, y],board, word);

            if (canExist) return true;
        }
    }

    return false;
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
 * @param {number} k
 * @return {number}
 */
const kthSmallest = function(root, k) {
    let nodeVals = [];
    let nodeQueue = [root];
    
    while (nodeQueue.length > 0) {
        let currentNode = nodeQueue.shift();
        if (!currentNode?.val) continue;
        nodeVals.push(currentNode.val);
        
        nodeQueue.push(currentNode.left);
        nodeQueue.push(currentNode.right);
    }
    
    let sortedVals = nodeVals.sort();
    
    return sortedVals[k-1];
};


// more efficient

const kthSmallestEfficient = function(root, k) {
    let count = 0;
    let result = null;

    const inOrderTraversal = (node) => {
        if (!node || result !== null) return;

        // Traverse the left subtree
        inOrderTraversal(node.left);

        // Visit the current node
        count++;
        if (count === k) {
            result = node.val;
            return;
        }

        // Traverse the right subtree
        inOrderTraversal(node.right);
    };

    inOrderTraversal(root);
    return result;
};
