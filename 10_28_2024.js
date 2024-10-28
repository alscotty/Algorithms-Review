/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 Binary search problem!!!
 */
 var guessNumber = function(n, maxNum) {
    if (!maxNum) {
        maxNum = n;
        n = Math.floor(n/2.0);
    }
    console.log(`Checking num: ${n}, maxNum ${maxNum}`)
    let currentGuessResult = guess(n)
    
    if (currentGuessResult == 0) return n;
    if (n == 0) return 1;
    
    if (currentGuessResult == -1) {
        // search lower    
        let lowerMidNum = Math.floor(n/2.0);
        return guessNumber(lowerMidNum, n);
    } else if (currentGuessResult == 1) {
        //search higher
        let higherMidNum = Math.ceil((maxNum - n)/2.0) + n;
        return guessNumber(higherMidNum, maxNum);
    }
};


/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function(guessNum, maxNum, runningSum = 0) {
    // base case
    if (maxNum && guessNum == maxNum) {
        return runningSum;
    }  else if (guessNum == 1) {
        return runningSum;
    }
    if (!maxNum) maxNum = guessNum;
    
    runningSum += guessNum
    console.log(`Checking guessNum ${guessNum}, with max: ${maxNum}, runningSum: ${runningSum}`)
    
    let nextLowerNumber = Math.ceil(guessNum/2.0);
    let nextHigherNumber = guessNum + (Math.ceil((maxNum - guessNum)/2.0))
    
    let lowerSum = getMoneyAmount(nextLowerNumber, guessNum, runningSum)
    let higherSum = getMoneyAmount(nextHigherNumber, maxNum, runningSum)
    
    return Math.min(lowerSum, higherSum)
};


//
/**
 * @param {number} n
 * @return {number}
 * better dynamic programming option
 */
var getMoneyAmount = function(n) {
  
    let dp = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));
    
    function calculateCost(start, end) {
      
      if (start >= end) {
        return 0;
      }
  
      if (dp[start][end] !== 0) {
        return dp[start][end];
      }
      
      let minCost = Infinity;
      
      for (let guess = Math.floor((start + end) / 2); guess <= end; guess++) {
        
        let cost = guess + Math.max(calculateCost(start, guess - 1), calculateCost(guess + 1, end));
        
        minCost = Math.min(minCost, cost);
      }
  
      dp[start][end] = minCost;
      return minCost;
    }
    
    return calculateCost(1, n);  
  };
  