/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */

const getLongestWordLength = function(words) {
    let longestLength = 0;
    
    words.forEach(word => {
        if (word.length > longestLength) longestLength = word.length; 
    });
    
    return longestLength;
}

const buildOrderIndicesHash = (order) => {
    const letterToIndex = {};
    
    for (let idx in order) {
        let letter = order[idx];
        letterToIndex[letter] = idx;
    }
    
    return letterToIndex;
}

const isAlienSorted = function(words, order) {
    const longestWordLength = getLongestWordLength(words);
    const letterToIndexHash = buildOrderIndicesHash(order);
    
    let letterIdx = 0;
    console.log({letterToIndexHash})
    while (letterIdx < longestWordLength) {
        for (let wordNum = 1; wordNum< words.length; wordNum++) {
            let firstLetter = words[wordNum - 1]?.[letterIdx];
            let secondLetter = words[wordNum]?.[letterIdx];
            
            console.log(`Comparing 1:${firstLetter} to 2: ${secondLetter}`)
            
            if (firstLetter === undefined) continue;
            if (secondLetter === undefined) return false;
            
            if (letterToIndexHash[secondLetter] < letterToIndexHash[firstLetter]) {
                console.log("OUT OF ALIEN ORDER!")
                return false
            }
            
        }
        letterIdx++
    }
    
    
    return true;
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    let rightNodeValues = [];
    let nodeQueue = [root];
    
    while(nodeQueue.length > 0) {
        let currNode = nodeQueue.shift();
        rightNodeValues.push(currNode.val);
        if (currNode.right) nodeQueue.push(currNode.right)
        
    }
    
    return rightNodeValues;
};