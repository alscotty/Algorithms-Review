function numRegions(graph, visited = new Set()) {
    let nodes = Object.keys(graph)
    let totalRegions=0;

    nodes.forEach(nodeInGraph => {
     if(isNewRegion(nodeInGraph, graph,visited)) totalRegions++
    })

    return totalRegions;
}

function isNewRegion(node,graph,visited){
    if(visited.has(node)) return false;

    visited.add(node);
    graph[node].forEach(neighbor => {
        isNewRegion(neighbor,graph,visited)
    });

    return true
}

module.exports = {
    numRegions
};