/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
const shuffle = (nums, n) => {
    let pairedElements = [];
    let midIdx = Math.min(nums.length/2.0);
    
    for (let idx = 0; idx < midIdx; idx++) {
        pairedElements.push(nums[idx]);
        pairedElements.push(nums[idx + midIdx]);
    }
    
    return pairedElements;
};


/**
 * @param {string} text
 * @return {number}
 */
const longestSubstringForDirection = (text) => {
    let maxSubstringLength = 0;
       let currentSubstringLength = 0;
       
       for (let char of text) {
           
       }
       
       return maxSubstringLength
   }
   
   const maxRepOpt1 = function(text) {
       return Math.max(longestSubstringForDirection(text), longestSubstringForDirection(text.reverse()));    
   };


   /**
 * @param {number[][]} grid
 * @return {number}
 */

   // dfs, actually a bit extra complexity, not necessarily needed
const tallyIslandEdges = (grid, rowIdx, colIdx, width, height, runningTally = 0) => {
    // check if new test spot if out of bounds
    if (rowIdx < 0 || colIdx < 0 || rowIdx >= width || colIdx >= height || !grid[rowIdx]) return 0;
    // check if seen before
     if (grid[rowIdx][colIdx] == 0) return 0;

    console.log(`Visiting spot with coordinates: X: ${rowIdx} Y:${colIdx}`);
    grid[rowIdx][colIdx] = 0;
    
    let surroundingSpotCount = 0;
    if (grid[rowIdx+1] && grid[rowIdx+1][colIdx] == 1) surroundingSpotCount++;
    if (grid[rowIdx-1] && grid[rowIdx-1][colIdx] == 1) surroundingSpotCount++;
    if (grid[rowIdx][colIdx+1] == 1) surroundingSpotCount++;
    if (grid[rowIdx][colIdx-1] == 1) surroundingSpotCount++;
    
    let edgesForCurrentSpot = 4 - surroundingSpotCount;
    runningTally += edgesForCurrentSpot;
    console.log({surroundingSpotCount})
    console.log(`Adding to tally: ${edgesForCurrentSpot}`)
    console.log({ runningTally })
    
    runningTally += tallyIslandEdges(grid, rowIdx+1, colIdx, width, height, runningTally)
    runningTally += tallyIslandEdges(grid, rowIdx-1, colIdx, width, height, runningTally)
    runningTally += tallyIslandEdges(grid, rowIdx, colIdx+1, width, height, runningTally)
    runningTally += tallyIslandEdges(grid, rowIdx, colIdx-1, width, height, runningTally)
    
    return runningTally;
}

const islandPerimeter = function(grid) {
    const width = grid[0].length;
    const height = grid.length;
    
    for (let rowIdx =0; rowIdx < width; rowidx++){
        for (let colIdx = 0; colIdx < height; colIdx++){
            if (grid[rowIdx][colIdx] == 1) {
                return tallyIslandEdges(grid, rowIdx, colIdx);
            }
        }
    }
  
    return 0;
};


/**
 * @param {number[][]} grid
 * @return {number}
 */
const islandPerimeterSimple = function(grid) {
    const height = grid.length;
    const width = grid[0].length;
    let perimeter = 0;
    
    // Loop through each cell in the grid
    for (let rowIdx = 0; rowIdx < height; rowIdx++) {
        for (let colIdx = 0; colIdx < width; colIdx++) {
            if (grid[rowIdx][colIdx] === 1) {
                // Start with 4 edges for each land cell
                perimeter += 4;
                
                // Subtract 2 edges for each neighboring land cell (to the right or below)
                if (rowIdx > 0 && grid[rowIdx - 1][colIdx] === 1) {
                    perimeter -= 2;  // Top neighbor
                }
                if (colIdx > 0 && grid[rowIdx][colIdx - 1] === 1) {
                    perimeter -= 2;  // Left neighbor
                }
            }
        }
    }
    
    return perimeter;
};
