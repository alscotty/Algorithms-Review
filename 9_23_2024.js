// is anagram, input string, return boolean answer

const isAnagram = (word) => {
    let lastIdx = word.length - 1;
    let midIdx = word.length / 2;

    for (let idx = 0; idx < midIdx; idx++) {
        let leftChar = word[idx];
        let rightChar = word[lastIdx - idx];
        if (leftChar !== rightChar) return false;
    }

    return true;
}

// Test cases, passed:
// console.log(isAnagram('tacocat')) // true
// console.log(isAnagram('word')) // false


// linkedList! reverse a linked list:
class LinkedList {
    constructor(val) {
        this.val = val;
        this.next = null
    }
}

let head = new LinkedList(1)
let firstNode = new LinkedList(2)
head.next = firstNode;
let secondNode = new LinkedList(3)
firstNode.next = secondNode


// given the head of a linkedlist, reverse it and return the new head!
const reverseLinkedList = (head) => {
    let prevNode = null
    let currentNode = head;

    while (currentNode) {
        let savedNext = currentNode.next;
        currentNode.next = prevNode;
        
        prevNode = currentNode;
        currentNode = savedNext;
    }

    return prevNode;
}

// test passed!
console.log(reverseLinkedList(head))
console.log(secondNode)