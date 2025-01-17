/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function(root) {
    const finalOrder = [];
    const stack = [root];
    let currentNode = root;

    while (currentNode || stack.length > 0) {
        // Traverse to the leftmost node
        while (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }
        // Pop from the stack and visit the node
        currentNode = stack.pop();
        finalOrder.push(currentNode.val);

        // Move to the right subtree
        currentNode = currentNode.right;
    }

    return finalOrder;
};


