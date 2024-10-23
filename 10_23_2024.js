/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
const shuffle = (nums, n) => {
    let pairedElements = [];
    let midIdx = Math.min(nums.length/2.0);
    
    for (let idx = 0; idx < midIdx; idx++) {
        pairedElements.push(nums[idx]);
        pairedElements.push(nums[idx + midIdx]);
    }
    
    return pairedElements;
};


/**
 * @param {string} text
 * @return {number}
 */
const longestSubstringForDirection = (text) => {
    let maxSubstringLength = 0;
       let currentSubstringLength = 0;
       
       for (let char of text) {
           
       }
       
       return maxSubstringLength
   }
   
   const maxRepOpt1 = function(text) {
       return Math.max(longestSubstringForDirection(text), longestSubstringForDirection(text.reverse()));    
   };