// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

const depthFirstValues = (root) => {
    if (root === null) return []
    stack = [root];
    let valuesArray = []

    while (stack.length > 0) {
      let currentNode = stack.pop();
      valuesArray.push(currentNode.val);

      if (currentNode.right !== null) stack.push(currentNode.right) 
      if (currentNode.left !== null) stack.push(currentNode.left) 
    }

    return valuesArray;
};

module.exports = {
  depthFirstValues,
};

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }

const breadthFirstValues = (root) => {
    if (root === null) return [];
    let queue = [root]
    let valuesArray = [];
  
    while (queue.length > 0) {
      let currentNode = queue.shift();
      valuesArray.push(currentNode.val);
  
      if (currentNode.left !== null) queue.push(currentNode.left)
      if (currentNode.right !== null) queue.push(currentNode.right)
    }
  
    return valuesArray;
  };
  
  module.exports = {
    breadthFirstValues,
  };
  

  /**
 * @param {number[][]} moves
 * @return {string}
 */

const verifyArray = (array) => {
    if (array.every(el => el == 'X')) return 'A'
    if (array.every(el => el == 'O')) return 'B'
}

const populateGrid =(moves) => {
    let grid = new Array(3);
    grid.fill('')
    for (let idx in grid) {
        let row = new Array(3);
        row.fill('')
        grid[idx] = row;
    }
    moves.forEach((move, idx) => {
        let rowIdx = move[0];
        let colIdx = move[1]
        if (idx % 2 == 0) { // A plays 'X'
            grid[rowIdx][colIdx] = 'X'
        } else { //B plays 'O'
            grid[rowIdx][colIdx] = 'O'
        }
    })
    return grid;
}

var tictactoe = function(moves) {
    const grid = populateGrid(moves);

    // check row wins
    for (let row of grid) {
        const result = verifyArray(row);
        if (result) return result;
    }

    // check column wins
    for (let idx of [0, 1, 2]) {
        const colEls = [grid[0][idx], grid[1][idx], grid[2][idx]];
        const result = verifyArray(colEls);
        if (result) return result;
    }

    // check diagonals
    const leftDiag = [grid[0][0], grid[1][1], grid[2][2]];
    const rightDiag = [grid[0][2], grid[1][1], grid[2][0]];

    let result = verifyArray(leftDiag);
    if (result) return result;
    result = verifyArray(rightDiag);
    if (result) return result;

    // check for pending moves
    for (let row of grid) {
        if (row.includes('')) return 'Pending';
    }

    // otherwise, it's a draw
    return 'Draw';
};


/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
const getHourHandToMinutes = (hour,min) => {
    let rawMinutes = hour == 12 ? 0 : (hour * 5);
    rawMinutes += (5 * (min/60));
    
    return rawMinutes;
}

var angleClock = function(hour, minutes) {
    const convertedMinutes = getHourHandToMinutes(hour,minutes);
    console.log({convertedMinutes})
    let angle = Math.abs(convertedMinutes - minutes) * (90/15)

    return Math.min(angle, 360-angle);
};