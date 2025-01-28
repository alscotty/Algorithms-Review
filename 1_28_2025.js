/**
 * @param {string} s
 * @return {number}
  {
 'letter': firstSeenIdx; 
 }
 */

 const buildOccurrencesHash = (string) => {
    let uniqOccurencesHash = {};
    let invalidChars = new Set();
    
    for (let idx= 0; idx<string.length; idx++) {
        let letter = string[idx];
        console.log(uniqOccurencesHash[letter])
        if (!invalidChars.has(letter) && (uniqOccurencesHash[letter] === undefined)) {
            uniqOccurencesHash[letter] = idx;
        } else if (uniqOccurencesHash[letter] !== undefined) {
            delete uniqOccurencesHash[letter];
            invalidChars.add(letter);
        }
    }
    console.log({uniqOccurencesHash})
    console.log({invalidChars})
    
    return uniqOccurencesHash;
}

var firstUniqChar = function(s) {
    let uniqOccurencesHash = buildOccurrencesHash(s);
    
    let firstIdx = Infinity;
    for (let letterKey in uniqOccurencesHash) {
        let letterIndex = uniqOccurencesHash[letterKey];
        if (letterIndex < firstIdx) firstIdx = letterIndex;
    }
    
    return firstIdx === Infinity ? -1 : firstIdx;
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
 * @return {ListNode}
 2 ptr strategy; Classic reverse a linked list problem!
 */
 var reverseList = function(head) {
    if (!head) return null;
    
    let prevNode = null
    let currNode = head
    
    while (currNode) {
        let savedNextNode = currNode.next;
        
        currNode.next = prevNode;
        prevNode = currNode;
        
        currNode = savedNextNode;
    }
    
return prevNode

};