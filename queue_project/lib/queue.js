// ============================================================================
// Implementation Exercise: Queue
// ============================================================================
//wktgeltj
// -------
// Prompt:
// -------
//
// Implement a Queue and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {
    constructor(val){
        this.value=val;
        this.next=null;
    }
}

class Queue {
    constructor(){
        this.front=null;
        this.back=null;
        this.length=0;
    }

    enqueue(input){
        let node= new Node(input);

        if(this.length===0){
            this.front=node;
        } else{
        let prevBack=this.back
        prevBack.next=node;
        }

        this.back=node
        this.length++
        return this.length
    }

    dequeue(){
        let removedNode=this.front;
        if (!this.length) {
            return null
        } else if (this.length===1){
            this.front=null;
            this.back=null;
        } else{
            let newFront=this.front.next;
            this.front=newFront;
        }
        this.length--;

        return removedNode.value;

    }

    size(){
        return this.length;
    }
}

exports.Node = Node;
exports.Queue = Queue;