/**
 * 
 * [
#     0    1    2    3    4    5    6    7    8    
    ['X', ' ', ' ', 'D', ' ', ' ', 'X', ' ', 'X'], # 0
    ['X', ' ', 'X', 'X', ' ', ' ', ' ', ' ', 'X'], # 1
    [' ', ' ', ' ', 'D', 'X', 'X', ' ', 'X', ' '], # 2
    [' ', ' ', ' ', 'D', ' ', 'X', ' ', ' ', ' '], # 3
    [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X'], # 4
    [' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X']  # 5
]

' ' represents an open road that you can travel over in any direction (up, down, left, or right).
'X' represents an blocked road that you cannot travel through. 
'D' represents a DashMart.

# list of pairs [row, col]
locations = [
    [200, 200],
    [1, 4], 
    [0, 3],
    [5, 8],
    [1, 8], 
    [5, 5]    
]

answer = [-1, 2, 0, -1, 6, 9]

can't start on blockd road: -1
can end on a blocked road

Provided:
- city: char[][]
- locations: int[][2]

Return:
- answer: int[]
 */

const traverseMap = (mapArray, startLocation, currentHopTotal = 0, visited = new Set()) => {
    // reached a dashmart
    if (mapArray[startLocation[0]][startLocation[1]] === 'D') {
        return currentHopTotal;
    }


    let currentX = startLocation[0];
    let currentY = startLocation[1];
    let xAdditions = [-1, 0, 1];
    let yAdditions = [-1, 0, 1];

    let possibleCoordinates = [];

    xAdditions.forEach(x => {
        yAdditions.forEach(y => {
            if (!(x == 0 && y == 0)) {
                let possibleSpot = [currentX + x, currentY + y]
                if (!mapArray[possibleSpot[0]]) return;
                // check if X or out of bounds
                if (mapArray[possibleSpot[0]][possibleSpot[1]] === 'X') {
                    console.log('hit end of road')
                    return;
                } else if (possibleSpot[0] < 0 || possibleSpot[0] > mapArray[0].length) {
                    console.log('x out of bounds')
                    return;
                } else if (possibleSpot[1] < 0 || possibleSpot[1] > mapArray.length) {
                    console.log('y out of bounds')
                    return;
                } else {
                    if (!visited.has(possibleSpot)) {
                        console.log('Adding')
                        console.log(possibleSpot)
                        possibleCoordinates.push(possibleSpot)
                    }
                }
            }
        })
    })
    console.log(possibleCoordinates)

    // out of places to go
    if (possibleCoordinates.length = 0) return currentHopTotal;

    visited.add(startLocation)
    let possibleHops = []
    for (let possibleCoordinate of possibleCoordinates) {
        currentHopTotal++
        possibleHops.push(traverseMap(mapArray, possibleCoordinate, currentHopTotal, visited))
    }

    return Math.min(possibleHops)
}

const findClosestDashMart = (mapArray, startLocations) => {
    let numHopsPerStartLocation = [];

    for (let startLocation of startLocations) {
        console.log('testing')
        console.log(startLocation)

        // check if in bounds
        if (startLocation[0] >= mapArray[0].length || startLocation[1] >= mapArray.length) {
            numHopsPerStartLocation.push(-1);
            // check if start on x
        } else if (mapArray[startLocation[0]][startLocation[1]] === 'X') {
            numHopsPerStartLocation.push(-1);
            //traverse and find distance
        } else {
            let minNumHops = traverseMap(mapArray, startLocation);
            numHopsPerStartLocation.push(minNumHops);
        }
    }

    return numHopsPerStartLocation;
}

let startLocations = [
    [200, 200],
    [1, 4],
    [0, 3],
    [5, 8],
    [1, 8], // todo: retest/validate
    [5, 5]
]
let mapArray = [
    ['X', ' ', ' ', 'D', ' ', ' ', 'X', ' ', 'X'],
    ['X', ' ', 'X', 'X', ' ', ' ', ' ', ' ', 'X'],
    [' ', ' ', ' ', 'D', 'X', 'X', ' ', 'X', ' '],
    [' ', ' ', ' ', 'D', ' ', 'X', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X'],
    [' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X']
]

console.log(findClosestDashMart(mapArray, startLocations))
// answer = [-1, 2, 0, -1, 6, 9]