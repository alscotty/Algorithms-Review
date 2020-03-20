function maxValue(node, visited=new Set()) {


    let queue = [node];
    let max=node.val

    while (queue.length) {
        let currNode = queue.shift();
        if (visited.has(currNode)) continue;
        visited.add(currNode);

        if (currNode.val > max) {
            max=currNode.val;
        }
        queue = queue.concat(currNode.neighbors)

    }

    return max;
}

module.exports = {
    maxValue
};