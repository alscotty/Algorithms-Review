/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

const traverseGrid = (startingPos, board, word, visited = new Set(), letterPath = '') => {
    const [x, y] = startingPos;
    let posString = `${x},${y}`;

    // Base cases
    if (letterPath === word || letterPath === word.split('').reverse().join('')) return true;
    if (letterPath.length == word.length) return false;
    if (visited.has(posString)) return false;
    if (!(board[x] && board[x][y])) return false;

    visited.add(posString); // Mark the current cell as visited
    let currentLetter = board[x][y];
    letterPath += currentLetter;

    console.log({letterPath})

    // Recursively explore all neighbors
    let pathBools = [
        traverseGrid([x - 1, y], board, word, visited, letterPath), // Up
        traverseGrid([x + 1, y], board, word, visited, letterPath), // Down
        traverseGrid([x, y - 1], board, word, visited, letterPath), // Left
        traverseGrid([x, y + 1], board, word, visited, letterPath)  // Right
    ];

    visited.delete(posString); // Unmark the current cell as visited (backtracking)
    return pathBools.some(bool => bool === true);
};


var exist = function(board, word) {
    let width = board[0].length;
    let height = board.length;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let canExist = traverseGrid([x, y],board, word);

            if (canExist) return true;
        }
    }

    return false;
};