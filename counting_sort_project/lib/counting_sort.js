function countingSort(arr, max) {
    if (arr.length===0) return [];

    const results=[];
    const counters=new Array(max+1).fill(0);

    for (let i=0; i<arr.length; i++){
        counters[arr[i]]++
    }

    for (let i=0; i<counters.length;i++){
        while(counters[i]>0){
            results.push(i);
            counters[i]--
        }
    }

    return results
}


module.exports = {
    countingSort
};