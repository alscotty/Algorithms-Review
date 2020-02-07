// ============================================================================
// Implementation Exercise: Stack
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Stack and all of its methods below!
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
    constructor(){
        this.value=null;
        this.next=null;
    }
}

class Stack {
    constructor(){
        this.top=null;
        this.bottom=null;
        this.length=0;
    }

    push(nodeVal){
        let node = new Node();
            node.value=nodeVal;
        let currentTopNode=this.top;

       if(this.length===0){
           this.top=node;
           this.bottom=node;
       } else {
           node.next=currentTopNode;
           this.top=node
       }

        this.length+=1;
        return this.length;

    }

    pop(){

        let removedNode=this.top;

        if(!this.length) {
            return null
        } else if(this.length===1){
            this.top=null;
            this.bottom=null;
        } else{
        let newHead=removedNode.next;

        removedNode.next=null;
        this.top=newHead;
        }
        this.length--;
        return removedNode.value;
    }

    size(){
        return this.length;
    }


}

exports.Node = Node;
exports.Stack = Stack;
