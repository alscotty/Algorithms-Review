function treeHeight(root) {
    if(!root) return -1;
    if (!root.left && !root.right) return 0;

    let maxHeight = 0;
    let height=0;

    let stack = [root];

    while (stack.length > 0) {

        let checkedNode = stack.pop();
        sum += checkedNode.val;
        if (checkedNode.left) stack.push(checkedNode.left);
        if (checkedNode.right) stack.push(checkedNode.right);
    }

    return maxHeight;


}


module.exports = {
    treeHeight
};