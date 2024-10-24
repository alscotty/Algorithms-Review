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


/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
  hour between 1-12 but there can be decimals
    i.e. 3:15 is actually
    3.25 hour and 15 minutes
    min between 0 and 60 guaranteed to be a whole number
    
    every hour is 30 degrees!
    every minute is 6 degrees!
    
    15 min = 0.25 hour
    15 minutes * (0.25 hour/15min) =  0.25 hour


    Given two numbers, hour and minutes, return the smaller angle (in degrees) formed between the hour and the minute hand.

Answers within 10-5 of the actual value will be accepted as correct.

Got it in one take! NICE
 */
    const angleClock = (hour, minutes) => {    
        let hourAngleFromZero = (hour + (minutes * (0.25/15))) * 30;
        let minuteAngleFromZero = minutes * 6;
        
        let firstAngle = Math.abs(hourAngleFromZero - minuteAngleFromZero);
        
        return Math.min(firstAngle, 360 - firstAngle);
    };



/*
Tic-tac-toe is played by two players A and B on a 3 x 3 grid. The rules of Tic-Tac-Toe are:

Players take turns placing characters into empty squares ' '.
The first player A always places 'X' characters, while the second player B always places 'O' characters.
'X' and 'O' characters are always placed into empty squares, never on filled ones.
The game ends when there are three of the same (non-empty) character filling any row, column, or diagonal.
The game also ends if all squares are non-empty.
No more moves can be played if the game is over.
Given a 2D integer array moves where moves[i] = [rowi, coli] indicates that the ith move will be played on grid[rowi][coli]. return the winner of the game if it exists (A or B). In case the game ends in a draw return "Draw". If there are still movements to play return "Pending".

You can assume that moves is valid (i.e., it follows the rules of Tic-Tac-Toe), the grid is initially empty, and A will play first.

easy problem, just tedious!
Gotcha was using array.fill(3,Array.fill(3,'E')) => was creating the same pointer in memory and messing everything up for populateBoard, also mixing up x and y for cols LOL
*/

/**
 * @param {number[][]} moves
 * @return {string}
 
 A player always goes 1st, has X
 B player always goes 2nd, has O
 
 */

const populateBoard = (moves) => {
    let grid = Array(3).fill().map(() => Array(3).fill('E'));
    
    let idx = 0;
    
    for (let move of moves) {
        let x = move[0];
        let y = move[1];
        let mark = idx % 2 == 0 ? 'X': 'O';
        
        grid[x][y] = mark;
        idx++
    }
    
    console.log({grid})
    return grid;
}


var tictactoe = function(moves) {
    let grid = populateBoard(moves);
    
    // check rows and cols
    let idx = 0;
    for (row of grid) {
        if (row.every(el => el == 'X')) return 'A';
        if (row.every(el => el == 'O')) return 'B';
        
        let col = [grid[0][idx],grid[1][idx],grid[2][idx]];
        console.log({col})
        if (col.every(el => el == 'X')) return 'A';
        if (col.every(el => el == 'O')) return 'B';
        
        idx++
    }

    // check diags
    let rightDiag = [grid[0][0],grid[1][1],grid[2][2]];
    let leftDiag = [grid[2][0],grid[1][1],grid[0][2]];
    if (rightDiag.every(el => el == 'X')) return 'A';
    if (leftDiag.every(el => el == 'X')) return 'A';
    
    if (rightDiag.every(el => el == 'O')) return 'B';
    if (leftDiag.every(el => el == 'O')) return 'B';
    
    // check board full? draw else pending
    console.log({grid})
    let eFound = grid.some(row => row.some(el => el == 'E'))
    console.log({ eFound })
    
    return eFound ? 'Pending': 'Draw';
    
};