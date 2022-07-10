// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

const removeNode = (head, targetVal) => {
  if (head.val == targetVal) return head.next;

  let currentNode = head
  let prevNode = null

  while (currentNode) {
    if (currentNode.val == targetVal) {
      prevNode.next = currentNode.next
      break
    }

    prevNode = currentNode;
    currentNode = currentNode.next
  }    

  return head
};

module.exports = {
  removeNode,
};



