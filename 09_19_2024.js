/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    if (numRows === 0) return [];
    if (numRows === 1) return [[1]];

    let triangleArray = [[1], [1, 1]];

    for (let i = 2; i < numRows; i++) {
        let prevRow = triangleArray[i - 1];
        let newRow = [1]; // Start each row with a 1

        // Fill in the middle values
        for (let j = 1; j < prevRow.length; j++) {
            newRow.push(prevRow[j - 1] + prevRow[j]);
        }

        newRow.push(1); // End each row with a 1
        triangleArray.push(newRow);
    }

    return triangleArray;
};

console.log(generate(5));

// easy problem - given array of nums, all appear twice except for 1, return that number
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let seenSet = new Set();

    nums.forEach(num => {
        if (seenSet.has(num)) {
            seenSet.delete(num)
        } else {
            seenSet.add(num)
        }
    })

    return Array.from(seenSet)[0];
};