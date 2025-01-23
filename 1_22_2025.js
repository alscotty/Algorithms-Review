/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * basic implementation of isAnagram
 * Better solution is to use a hash table
 * iterate through the first string and add each character to the hash table
 * iterate through the second string and check if each character is in the hash table
 * if it is, remove it from the hash table
 * if it is not, return false
 * if the hash table is empty, return true, etc.
 */
const isAnagram = (s, t) => {
    if (s.length != t.length) return false;
    
    let sortedOne = s.split('').sort();
    let sortedTwo = t.split('').sort();
    
    for (let idx = 0; idx < sortedOne.length; idx++) {
        if (sortedOne[idx] != sortedTwo[idx]) return false
    }
    
    return true;
};


/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function(columnTitle) {
    // This process is similar to 
    // binary-to-decimal conversion
    // 1. Start from the rightmost character,
    // 2. Multiply the value of each character by 26^i
    // 3. Add them all together
    // 4. Return the result
    
    let result = 0;
    for (let i = 0; i < columnTitle.length; i++)
    {
        result *= 26;
        result += columnTitle[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    }
    return result;
};