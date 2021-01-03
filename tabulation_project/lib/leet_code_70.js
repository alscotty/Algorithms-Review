// Work through this problem on https://leetcode.com/problems/climbing-stairs/ and use the specs given there.
// Feel free to use this file for scratch work.

//tabulation:

function climbStairs(n) {
    if (n == 1) return 1;
    let table = new Array(n + 1);
    table[1] = 1;
    table[2] = 2;
    for (let i = 3; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}

//memoization
function climbStairsMemo(n, memo = { 1: 1, 2: 2 }) {
    if (memo[n]) return memo[n];

    let nextAnswer = climbStairs(n - 1, memo) + climbStairs(n - 2, memo)
    memo[n] = nextAnswer;
    return nextAnswer;
}
