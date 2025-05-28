// 1. Merge K Sorted Lists
// LeetCode 23: Merge K Sorted Lists
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
// Merge all the linked-lists into one sorted linked-list and return it.
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
    if (!lists.length) return null;
    
    // Use min heap to always get the smallest element
    const minHeap = new MinHeap();
    
    // Add first node of each list to heap
    for (let list of lists) {
        if (list) minHeap.insert(list);
    }
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (minHeap.size() > 0) {
        const node = minHeap.remove();
        current.next = node;
        current = current.next;
        
        if (node.next) {
            minHeap.insert(node.next);
        }
    }
    
    return dummy.next;
}

// MinHeap implementation for the above solution
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    size() {
        return this.heap.length;
    }
    
    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }
    
    remove() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        
        return min;
    }
    
    bubbleUp() {
        let index = this.size() - 1;
        const node = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].val <= node.val) break;
            
            this.heap[index] = this.heap[parentIndex];
            index = parentIndex;
        }
        
        this.heap[index] = node;
    }
    
    bubbleDown() {
        let index = 0;
        const node = this.heap[index];
        
        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallest = index;
            
            if (leftIndex < this.size() && this.heap[leftIndex].val < this.heap[smallest].val) {
                smallest = leftIndex;
            }
            
            if (rightIndex < this.size() && this.heap[rightIndex].val < this.heap[smallest].val) {
                smallest = rightIndex;
            }
            
            if (smallest === index) break;
            
            this.heap[index] = this.heap[smallest];
            index = smallest;
        }
        
        this.heap[index] = node;
    }
}

// 2. Trapping Rain Water
// LeetCode 42: Trapping Rain Water
// Given n non-negative integers representing an elevation map where the width of each bar is 1,
// compute how much water it can trap after raining.
/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    if (!height.length) return 0;
    
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        // Update max heights
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        
        // Calculate water at current position
        if (leftMax < rightMax) {
            water += leftMax - height[left];
            left++;
        } else {
            water += rightMax - height[right];
            right--;
        }
    }
    
    return water;
}

// 3. Regular Expression Matching
// LeetCode 10: Regular Expression Matching
// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
function isMatch(s, p) {
    const dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    
    // Handle patterns like a*, a*b*, a*b*c*
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2]; // Match 0 occurrences
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j]; // Match 1 or more occurrences
                }
            }
        }
    }
    
    return dp[s.length][p.length];
}

// Example usage:
// For Merge K Sorted Lists
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));
console.log(mergeKLists([list1, list2, list3])); // 1->1->2->3->4->4->5->6

// For Trapping Rain Water
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6

// For Regular Expression Matching
console.log(isMatch("aa", "a*")); // true
console.log(isMatch("ab", ".*")); // true
console.log(isMatch("mississippi", "mis*is*p*.")); // false 