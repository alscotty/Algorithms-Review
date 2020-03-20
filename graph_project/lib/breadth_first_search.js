function breadthFirstSearch(startingNode, targetVal, visited = new Set()) {

    let queue=[startingNode];

    while (queue.length){
        let currNode=queue.shift();
        if(visited.has(currNode)) continue;
        visited.add(currNode);

        if(currNode.val === targetVal) return currNode;
        queue = queue.concat(currNode.neighbors)

    
    }
    return null;
}

module.exports = {
    breadthFirstSearch
};