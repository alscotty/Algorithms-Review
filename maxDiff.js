
const maxTrailingDiff = (tempArray) => {
    let min = max = tempArray[0];
    let maxDiff = -1;
    tempArray.forEach(temp=>{
        min = Math.min(min,temp);
        if (temp > max){
            maxDiff = Math.max(maxDiff, temp-min);
            max = temp;
        }
    });
    return maxDiff;
}

// more optimized: 
// 0(n), linear time instead of O(n^2) 
console.log(maxTrailingDiff([1,2,8])); // 7
console.log(maxTrailingDiff([5,4,3])); // -1
console.log(maxTrailingDiff([8,100,1,1000])); // 999