/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = function(n) {
    let testNum = -Infinity;
    let testExponent = 0;
    while (testNum < n) {
        testNum = Math.pow(2,testExponent);
        console.log(`checking ${testNum} against input ${n}`)
        if (testNum == n) return true;
        
        testExponent++;
    }
    
    
    return false;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const convertLinkedListToArray = (head) => {
    let valueArray = [];
    let currentNode = head;
    while (currentNode) {
        valueArray.push(currentNode.val);
        currentNode = currentNode.next;
    }

    return valueArray;
}

var isPalindrome = function (head) {
    let valueArray = convertLinkedListToArray(head);
    let arraySize = valueArray.length;
    let midIdx = arraySize / 2;

    for (let i = 0; i < midIdx; i++) {
        if (valueArray[i] != valueArray[arraySize - i - 1]) return false;
    }

    return true;
};

