/**
 * @param {number} n
 * @return {number}
 * attempted recursion -> timeout on high inputs
 */
var climbStairs = function(n, currentStair = 0, dp = {}) {
    if ( n < 2) return 1;
    if (currentStair > n) return 0;
    if (currentStair == n) return 1;
    
    if (dp[currentStair]) {
        return dp[currentStair];        
    } else {
     dp[currentStair] = currentStair;
    
    let plusOneStep = dp[currentStair + 1] || climbStairs(n, currentStair+1);
    dp[currentStair + 1] = plusOneStep;
    let plusTwoStep = dp[currentStair + 2] || climbStairs(n, currentStair+2);
    dp[currentStair + 2] = plusTwoStep;
    
    return plusOneStep + plusTwoStep   
    }
};

// simple dp, like fibonnaci sequence:
var climbStairs = function(n) {

    let dp = [0,1,2]

    let currentStep = 3

    while(currentStep <= n){
        dp[currentStep] = dp[currentStep-1] + dp[currentStep - 2]
        currentStep++
    }

    return dp[n]

};

/**
 * @param {number} num
 * @return {number}
 */
const addDigits = function(num) {
    if (num < 10) return num;
    
    while (num >= 10) {
        let arrayOfNumStrings = num.toString().split('');
        let newNum = 0;
        arrayOfNumStrings.forEach(stringNum => {
            newNum += Number(stringNum);
        })
        num = newNum;
    }
    
    return num;
}; 