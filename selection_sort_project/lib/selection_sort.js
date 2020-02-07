function swap(arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
}

function selectionSort(arr) {
    let sorted=false;

    while (!sorted){
        sorted=true;

        for(let i=0; i<arr.length-1; i++){
            if(arr[i]>arr[i+1]){
                swap(arr, i, i+1);
                sorted=false;
            }

        }

    }
    return arr
}

module.exports = {
    selectionSort,
    swap
};