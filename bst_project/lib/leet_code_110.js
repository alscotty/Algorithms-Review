// View the full problem and run the test cases at:
//  https://leetcode.com/problems/balanced-binary-tree/

function getHeight(root){
    if(!root) return -1;
    return 1+Math.max(getHeight(root.left),getHeight(root.right))
}

function isBalanced(root) {
    if(!root) return true;

    let heightDifference=Math.abs(getHeight(root.left)-getHeight(root.right))<=1;

    //then combine multiple booleans into one final true/false return statement::
    return heightDifference && isBalanced(root.left) && isBalanced(root.right);
}