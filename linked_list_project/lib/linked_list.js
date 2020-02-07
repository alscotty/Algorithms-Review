// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
    constructor(val) {
        this.value=val;
        this.next=null;
    }

}

// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head=null;
        this.tail=null;
        this.length=0;
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {

        let newNode=new Node(val)
        if (!this.head){
            this.head=newNode
        } else {
            this.tail.next=newNode;
        }
        this.tail=newNode
        this.length++;
        return this;
    }

    // TODO: Implement the removeTail method here
    removeTail() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    // TODO: Implement the addToHead method here
    addToHead(val) {
        let currentHead=this.head;
        let newHead=new Node(val);
        if (this.length<1){
            this.head=newHead;
            this.tail=newHead;
        } else{
        newHead.next=currentHead;
        this.head=newHead;
        }
        this.length++
        return this
    }

    // TODO: Implement the removeHead method here
    removeHead() {
        if(!this.length){return undefined}
        let prevHead=this.head

        if(this.length==1){
            this.tail=null
        }
        let newHead=this.head.next;
        this.head=newHead

        this.length--
        return prevHead
    }

    // TODO: Implement the contains method here
    contains(target) {
        let current=this.head;
        while(current){
            if(target===current.value){
                return true;
            }
            current=current.next;
        }
        return false;
    }

    // TODO: Implement the get method here
    get(index) {
        if(index>this.length-1 || index<0) return null;
        let count=0;
        let node=this.head;

        while(node){
            if(index==count) return node;
            count++
            node=node.next;
        }
    }

    // TODO: Implement the set method here
    set(index, val) {
        let checkNode=this.get(index);
        if(checkNode){
            checkNode.value = val
            return true
        } else {
            return false
        }
    }

    // TODO: Implement the insert method here
    insert(index, val) {
        if(index<0 || index>this.length-1) return false;
        let newNode=new Node(val)

        let prevNode=this.get(index-1);
        let nextNode=this.get(index);
        prevNode.next=newNode;
        newNode.next=nextNode;
        this.length++
        return true
    }

    // TODO: Implement the remove method here
    remove(index) {

    }

    // TODO: Implement the size method here
    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
