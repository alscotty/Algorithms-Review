function quickSort(array) {
    if(array.length<=1){return array}

    let pivot=array.shift();
    
    let lesser=array.filter(el=> el<pivot)
    let greater=array.filter(el=> el>=pivot)

    let lesserSorted=quickSort(lesser);
    let greaterSorted=quickSort(greater);

    return [...lesserSorted,pivot,...greaterSorted]
}


module.exports = {
    quickSort
};