/*
USER TIME ACTION
100  1000 A
200  1100 A 
200  1200 B 
100  1200 B
100  1300 C
200  1400 A
300  1500 B
300  1550 B


A (2)
  -> B (2)
    -> C (1)
    -> A (1)
B (1)    
  -> B (1)   

  */

  class UserAction {
    constructor(userId, actionType, userIdWithAction) {
      this.userId = userId;
      this.actionType = actionType;
      this.userIdWithAction = userIdWithAction;
      this.edges = []
    }
  
    setEdge(edgeNode) {
      let currentEdges = this.edges
      this.edges = [...currentEdges, edgeNode]
    }
  }
  
  const sample_logs = [
    [100, 1000, 'A'],
    [200, 1100, 'A'],
    [200, 1200, 'B'],
    [100, 1200, 'B'],
    [100, 1300, 'C'],
    [200, 1400, 'A'],
    [300, 1500, 'B'],
    [300, 1550, 'B'],
  ];
  
  // -  userId A: freq 
  // Trie of nodes
  // [userId,
  // actionType]
  // freq. // save for final print iteration, can increment
  // edges - {} 
  /* {
    userId: Node
  }
  */
  const logUserActions = (sample_logs) => {
    let userActionNodeList = {};
  
    sample_logs.forEach(log => {
      let userId = log[0];
      let time = log[1];
      let actionType = log[2];
      let userIdWithAction = `${userId}:${actionType}`
  
      if (!userActionNodeList[userId]) {
        userActionNodeList[userId] = new UserAction(userId, actionType, userIdWithAction)
      } else {
        let currentNode = userActionNodeList[userId];
        let continueNesting = true;
  
        while (continueNesting) {
          let currentNodeEdges = currentNode.edges.map(node => node.userIdWithAction);
          console.log(`Checking for ${userIdWithAction}`);
          console.log({ currentNodeEdges });
          console.log({ userActionNodeList });
          console.log(`Add at currentLevel ${!currentNodeEdges.includes(userIdWithAction)}`);
  
          if (!currentNodeEdges.includes(userIdWithAction)) {
            let newNode = new UserAction(userId, actionType, userIdWithAction)
            // currentNode.edges.push(newNode);
            currentNode.setEdge(newNode)
  
            continueNesting = false;
          } else {
            currentNode = currentNode.edges.filter(node => {
              node.userIdWithAction == userIdWithAction
            })[0];
            console.log(`Continuing down the tree, next:`)
            console.log({ currentNode });
            continue;
          }
        }
      }
  
  
    })
  
    console.log({ userActionNodeList })
    return userActionNodeList
  }
  
  let res = logUserActions(sample_logs)
  // console.log({ res });
  // 1st nest : 200B
  
  // console.log(res['100'].edges);
  
  /*
  approach
  - iterate usertimeaction - [
    userId,
    timeInSec,
    ActionType
  ]
  
  dataStruct within fxn
  {
    ActionType: {
      frequency: number
      userIds [...userId]
      childActionType { ... }
    }
  }
  
  {
  A: {
  freq: 1
  userIds: [ 100 ]
  }
  }
  
  print {} ... iterate over object, format string, arrows, etc.
  */
  