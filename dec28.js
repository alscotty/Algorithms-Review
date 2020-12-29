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
 * @return {number[]}
 ex. at 1, check indices 0,1
 ex. at 2 check 4 places
 ex. at 3 check 8 places
 */

 // Leetcode medium, #63, find largest element at each row of a binary tree and return as an array
 // my method, convert tree to array of values, then find max based on slicing levels
 // root, level 0
 // ex. 2nd row, level 1, arr.shift() 2^1 => 2 elements
 // ex. 3nd row, level 2, arr.shift() 2^2 => 4 elements
 // ex. 4nd row, level 3, arr.shift() 2^3 => 8 elements

var largestValues = function(root) {
    if (root === []) return [];
    let queue = [root];
    let arrOfTreeNodes = []
    
    while (queue.length > 0){
        let currentNode = queue.shift();
        arrOfTreeNodes.push(currentNode.val)
        
        if (currentNode.right){
            queue.push(currentNode.right)
        }
         if (currentNode.left){
            queue.push(currentNode.left)
        }
    }
  
    let maxSize = arrOfTreeNodes.length;
    let maxArr = [arrOfTreeNodes.shift()];
    let currentLevel = 1;
    while (Math.pow(2,currentLevel) <= maxSize){
        let levelValues = []
        for (let i = 0; i<Math.pow(2,currentLevel);i++){
            let val = arrOfTreeNodes.shift();            
            levelValues.push(val === undefined ? 0 : val);
        }
        console.log(levelValues)
        maxArr.push(Math.max(...levelValues));
        currentLevel++;
    }
    
    return maxArr;
};