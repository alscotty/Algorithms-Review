function binarySearch(array, target) {
    
    let mid_idx=Math.floor(array.length/2);
    if(array[mid_idx]===target) return true;
    if(array.length<1) return false;

    let left=array.slice(0,mid_idx);
    let right=array.slice(mid_idx+1);

    if(target>array[mid_idx]){
        return binarySearch(right,target);
    } else {
        return binarySearch(left,target);
    }
    
}

//binary searching

function binarySearchIndex(array, target) {

    let mid_idx = Math.floor(array.length / 2);
    if (array[mid_idx] === target) return mid_idx;
    if (array.length <= 1) return -1;
    
    let left = array.slice(0, mid_idx);
    let right = array.slice(mid_idx + 1);
    
    if (target > array[mid_idx]) {
        let res = binarySearchIndex(right, target);
        console.log(res)
        if(res==-1) return -1;
        if(res !== undefined) return res+mid_idx+1
    } else {
        return binarySearchIndex(left, target);
    }
    

}


module.exports = {
    binarySearch,
    binarySearchIndex
};