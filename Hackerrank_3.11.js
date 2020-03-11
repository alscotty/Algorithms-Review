/*
 * Complete the 'minTime' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY boxes as parameter.
 * 
 * if boxes=[1,2,3]
 *  have 1 box on 1st floor, 2 on 2nd, etc.
 *  want to pick up more boxes on the way of from lower floors as needed
 * 
 *  Time cost: 
 *         Riding the elevator:
 *      n floors
 *         looking at floor i
 *          trip will take n-i minutes total
 *        Loading and unloading 1 box: 1 min.
 * 
 *  [1,2,3]
 * 
 * 
 */

function floorHasBox(boxes) {
    let empty = true
    boxes.forEach(floor => {
        if (floor !== 0) {
            empty = false;
        }
    })
    return !empty;
}


function minTime(boxes) {
    // Write your code here
    let totalFloors = boxes.length;
    let minTime = 0;

    while (floorHasBox(boxes)) {
        let initTrip = false;
        boxes.forEach((boxCount, floorLevel) => {

            if ((boxCount > 0)) {
                boxes[floorLevel]--
                minTime++
                //cost to pick up box
                let elevTrip = totalFloors - floorLevel;
                if (initTrip === false) {
                    minTime += elevTrip;
                }
                initTrip = true;
            }

        });
    }

    return minTime;
}



