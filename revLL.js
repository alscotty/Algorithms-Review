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
 */
const reverseList = (head) => {
    if (!head) return [];
    let prev = null;
    let curr = head;
    let next = curr.next;
    // prev -> curr -> next
    while (curr) {
        curr.next = prev;
        prev = curr;
        curr = next;
        if (next) next = next.next;
    }
    return prev;
};


let head = new ListNode(5)
head.next = new ListNode(4)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(2)
head.next.next.next.next = new ListNode(1)

reverseList(head);