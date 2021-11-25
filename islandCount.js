const islandCount = (grid) => {
    let landCoords = new Set();
    let width = grid[0].length;
    let height = grid.length;
    let numIslands = 0;

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            console.log(`Traversing row; ${i},col:${j}`)
            console.log(grid[i][j])

            if (grid[i][j] == "L" && !landCoords.has(`${i},${j}`)) {
                console.log('starting island traversal')
                numIslands += 1;
                traverseLand(i, j, grid, landCoords)
            }
        }
    }

    return numIslands;
};

/* 
  recursively check and add positions that are connected, 
  go horizontally and vertically:
*/
const traverseLand = (row, col, grid, landCoords) => {
    let currentPos = grid[row] ? grid[row][col] : undefined;
    if (!currentPos) return;
    if (currentPos == 'W') return;

    if (currentPos == 'L' && !landCoords.has(`${row},${col}`)) {
        console.log(`Island traversing pos: ${row},${col}`)
        console.log(landCoords)
        landCoords.add(`${row},${col}`)
        traverseLand(row + 1, col, grid, landCoords);
        traverseLand(row - 1, col, grid, landCoords);
        traverseLand(row, col + 1, grid, landCoords);
        traverseLand(row, col - 1, grid, landCoords);
    }
}



// const grid = [
//   ['W', 'L', 'W', 'W', 'W'],
//   ['W', 'L', 'W', 'W', 'W'],
//   ['W', 'W', 'W', 'L', 'W'],
//   ['W', 'W', 'L', 'L', 'W'],
//   ['L', 'W', 'W', 'L', 'L'],
//   ['L', 'L', 'W', 'W', 'W'],
// ];

// console.log(islandCount(grid)); // -> 3






















module.exports = {
    islandCount
};