/**
 * @param {number} n - grid is square, so n * n grid
 * @param {number} k - possible moves available
 * @param {number} row - starting location x
 * @param {number} column - starting location y
 * @return {number}
 */

// correct! possible to optimize with a cache for saved values, etc.!

const knightProbability = function (n, k, row, column, movesTaken = 0) {
    // base cases:
    if (row < 0 || row >= n || column < 0 || column >= n) return 0;
    if (movesTaken == k) return 1

    movesTaken++;

    return (
        knightProbability(n, k, row + 2, column + 1, movesTaken) +
        knightProbability(n, k, row + 2, column - 1, movesTaken) +
        knightProbability(n, k, row + 1, column - 2, movesTaken) +
        knightProbability(n, k, row + 1, column + 2, movesTaken) +
        knightProbability(n, k, row - 2, column + 1, movesTaken) +
        knightProbability(n, k, row - 2, column - 1, movesTaken) +
        knightProbability(n, k, row - 1, column + 2, movesTaken) +
        knightProbability(n, k, row - 1, column - 2, movesTaken) 
  ) / 8.0

};

console.log(knightProbability(3,2,0,0)) // expect: 0.06250