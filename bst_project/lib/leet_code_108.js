// View the full problem and run the test cases at:
//  https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/


function sortedArrayToBST(nums) {
    //if no number array given, return null
    if (!nums.length) return null;

    //since it's sorted, we find the middle number to be the root node
    let midIdx = Math.floor(nums.length/2);
    let root = new TreeNode (nums[midIdx]);
    //call sortedArrayToBST on each subtree
    root.left=sortedArrayToBST(nums.slice(0,midIdx));
    root.right=sortedArrayToBST(nums.slice(midIdx+1));

    return root;
}