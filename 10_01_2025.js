// LeetCode Hard Problems - October 1, 2025

// =============================================================================
// Problem 1: Serialize and Deserialize Binary Tree (Hard)
// =============================================================================
// Serialization is the process of converting a data structure or object into a 
// sequence of bits so that it can be stored in a file or memory buffer, or 
// transmitted across a network connection link to be reconstructed later in 
// the same or another computer environment.

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTreeSerializer {
    constructor() {
        this.nullMarker = '#';
        this.delimiter = ',';
    }

    // Convert tree to string representation
    serialize(root) {
        if (!root) return this.nullMarker;
        
        const result = [];
        const queue = [root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            
            if (node === null) {
                result.push(this.nullMarker);
            } else {
                result.push(node.val.toString());
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        
        return result.join(this.delimiter);
    }

    // Reconstruct tree from string
    deserialize(data) {
        if (data === this.nullMarker) return null;
        
        const values = data.split(this.delimiter);
        const root = new TreeNode(parseInt(values[0]));
        const queue = [root];
        let index = 1;
        
        while (queue.length > 0 && index < values.length) {
            const node = queue.shift();
            
            // Process left child
            if (index < values.length && values[index] !== this.nullMarker) {
                node.left = new TreeNode(parseInt(values[index]));
                queue.push(node.left);
            }
            index++;
            
            // Process right child
            if (index < values.length && values[index] !== this.nullMarker) {
                node.right = new TreeNode(parseInt(values[index]));
                queue.push(node.right);
            }
            index++;
        }
        
        return root;
    }
}

// =============================================================================
// Problem 2: Trapping Rain Water (Hard)
// =============================================================================
// Given n non-negative integers representing an elevation map where the width 
// of each bar is 1, compute how much water it can trap after raining.

function calculateTrappedWater(elevationMap) {
    if (elevationMap.length < 3) return 0;
    
    let totalWater = 0;
    let left = 0;
    let right = elevationMap.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    
    // Two-pointer approach for optimal space complexity
    while (left < right) {
        if (elevationMap[left] < elevationMap[right]) {
            // Process left side
            if (elevationMap[left] >= leftMax) {
                leftMax = elevationMap[left];
            } else {
                totalWater += leftMax - elevationMap[left];
            }
            left++;
        } else {
            // Process right side
            if (elevationMap[right] >= rightMax) {
                rightMax = elevationMap[right];
            } else {
                totalWater += rightMax - elevationMap[right];
            }
            right--;
        }
    }
    
    return totalWater;
}

// Alternative approach using stack
function calculateTrappedWaterStack(elevationMap) {
    if (elevationMap.length < 3) return 0;
    
    let totalWater = 0;
    const stack = [];
    
    for (let i = 0; i < elevationMap.length; i++) {
        while (stack.length > 0 && elevationMap[i] > elevationMap[stack[stack.length - 1]]) {
            const top = stack.pop();
            
            if (stack.length === 0) break;
            
            const distance = i - stack[stack.length - 1] - 1;
            const boundedHeight = Math.min(elevationMap[i], elevationMap[stack[stack.length - 1]]) - elevationMap[top];
            totalWater += distance * boundedHeight;
        }
        
        stack.push(i);
    }
    
    return totalWater;
}

// =============================================================================
// Problem 3: Merge k Sorted Lists (Hard)
// =============================================================================
// You are given an array of k linked-lists lists, each linked-list is sorted 
// in ascending order. Merge all the linked-lists into one sorted linked-list.

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeKSortedLists(lists) {
    if (!lists || lists.length === 0) return null;
    if (lists.length === 1) return lists[0];
    
    // Divide and conquer approach
    return divideAndMerge(lists, 0, lists.length - 1);
}

function divideAndMerge(lists, start, end) {
    if (start === end) return lists[start];
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const left = divideAndMerge(lists, start, mid);
    const right = divideAndMerge(lists, mid + 1, end);
    
    return mergeTwoLists(left, right);
}

function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes
    current.next = list1 || list2;
    
    return dummy.next;
}

// Alternative approach using priority queue
function mergeKSortedListsHeap(lists) {
    if (!lists || lists.length === 0) return null;
    
    // Filter out null lists and create min-heap
    const validLists = lists.filter(list => list !== null);
    if (validLists.length === 0) return null;
    if (validLists.length === 1) return validLists[0];
    
    // Simple heap implementation
    const heap = new MinHeap();
    
    // Add first node from each list to heap
    validLists.forEach(list => {
        if (list) {
            heap.insert({ val: list.val, list: list });
        }
    });
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (!heap.isEmpty()) {
        const { val, list } = heap.extractMin();
        
        current.next = new ListNode(val);
        current = current.next;
        
        if (list.next) {
            heap.insert({ val: list.next.val, list: list.next });
        }
    }
    
    return dummy.next;
}

// Simple MinHeap implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(item) {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        
        return min;
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].val <= this.heap[index].val) break;
            
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    heapifyDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild].val < this.heap[smallest].val) {
                smallest = leftChild;
            }
            
            if (rightChild < this.heap.length && this.heap[rightChild].val < this.heap[smallest].val) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

// =============================================================================
// Test Cases
// =============================================================================

// Test Binary Tree Serialization
console.log("=== Binary Tree Serialization Tests ===");
const serializer = new BinaryTreeSerializer();
const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));
const serialized = serializer.serialize(tree);
console.log("Serialized tree:", serialized);
const deserialized = serializer.deserialize(serialized);
console.log("Deserialized tree root value:", deserialized.val);

// Test Trapping Rain Water
console.log("\n=== Trapping Rain Water Tests ===");
const elevation1 = [0,1,0,2,1,0,1,3,2,1,2,1];
const elevation2 = [4,2,0,3,2,5];
console.log("Water trapped in [0,1,0,2,1,0,1,3,2,1,2,1]:", calculateTrappedWater(elevation1));
console.log("Water trapped in [4,2,0,3,2,5]:", calculateTrappedWater(elevation2));

// Test Merge K Sorted Lists
console.log("\n=== Merge K Sorted Lists Tests ===");
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));
const merged = mergeKSortedLists([list1, list2, list3]);

// Helper function to print linked list
function printList(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

console.log("Merged list:", printList(merged));
