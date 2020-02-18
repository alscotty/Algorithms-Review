//depth first, implement via a stack

function depthFirstSearch(root, targetVal) {
    if(!root) return;

    let stack=[root];

    while(stack.length>0){
        if (root.left) stack.push(root.left);
        
        let checkedNode=stack.pop();
        if(checkedNode.val===targetVal) return checkedNode;
        if (root.right) stack.push(root.right);
         root=checkedNode;
    }

    return null;
}


module.exports = {
    depthFirstSearch
};