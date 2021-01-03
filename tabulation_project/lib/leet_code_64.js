// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

function minPathSum(grid) {
    let width = grid[0].length;
    let height = grid.length;

    let table = new Array(width).fill(new Array(height));
    table[0][0] = grid[0][0];

    for (let i = 0; i < table.length; i++) {

    }

    return table[width][height];
}

// var minPathSum = function (grid) {
//     if (!grid) return 0;

//     let row = grid.length;
//     let column = grid[0].length;

//     let res = [0];
//     for (let i = 0; i < row; i++) {
//         for (let j = 0; j < column; j++) {
//             if (i === 0) {
//                 res.push(res[j] + grid[i][j]);
//             } else if (j === 0) {
//                 res[j + 1] += grid[i][j];
//             } else {
//                 res[j + 1] = Math.min(res[j], res[j + 1]) + grid[i][j];
//             }
//         }
//     }

//     return res[column];
// };