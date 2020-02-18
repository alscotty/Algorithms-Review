//implement with a queue

function breadthFirstArray(root) {
    if (!root) return;

    let queue=[root];
    let arr=[root.val]

    while (queue.length > 0) {
        let node = queue.shift();
        if (node.left) {queue.push(node.left) && arr.push(node.left.val)};
        if (node.right) {queue.push(node.right) && arr.push(node.right.val)};

    }


    return arr;   
}

module.exports = {
    breadthFirstArray
};