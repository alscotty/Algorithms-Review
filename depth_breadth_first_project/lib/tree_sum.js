function treeSum(root) {
    if(!root) return 0;

    let sum=0;
    let stack = [root];

    while (stack.length > 0) {
        
        let checkedNode = stack.pop();
        sum+=checkedNode.val;
        if (checkedNode.left) stack.push(checkedNode.left);
        if (checkedNode.right) stack.push(checkedNode.right);
    }

    return sum;
}


module.exports = {
    treeSum
};