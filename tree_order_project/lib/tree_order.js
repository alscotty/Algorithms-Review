function inOrderArray(node) {
        if (!node) return [];

      return[
        ...inOrderArray(node.left),
        node.val,
        ...inOrderArray(node.right)
      ]
}

function postOrderArray(root) {
    if (!root) return [];

    return [
        ...postOrderArray(root.left),
        ...postOrderArray(root.right),
        root.val,
    ];
}


module.exports = {
    inOrderArray,
    postOrderArray
};