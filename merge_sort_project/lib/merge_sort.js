function merge(array1, array2) {

    let sorted=[];

    while (array1.length && array2.length){
        if(array1[0]<array2[0]){
            sorted.push(array1.shift())
        } else {
            sorted.push(array2.shift())
        }
    }
    return sorted.concat(array1).concat(array2);
}

function mergeSort(array) {
    if (array.length <= 1){return array}

    let mid_idx = Math.floor(array.length/2);
    let left=array.slice(0,mid_idx)
    let right=array.slice(mid_idx)

    return merge(mergeSort(left),mergeSort(right))

}

module.exports = {
    merge,
    mergeSort
};

//asdakj