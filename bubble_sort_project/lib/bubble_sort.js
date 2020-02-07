function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    return arr
}

function bubbleSort(arr) {
    let sorted=false;

    while (!sorted){
        sorted=true;
        for(let i=0; i<arr.length-1; i++){
            if(arr[i+1]<arr[i]){
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
                sorted=false;
            }

        }
    }

    return arr
}


module.exports = {
    bubbleSort,
    swap
};