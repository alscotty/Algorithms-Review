class UserAction {
    constructor(actionType) {
      this.actionType = actionType;
      this.frequency = 1;
      this.edges = {};
    }
  
    incrementFrequency() {
      this.frequency += 1;
    }
  
    getOrCreateEdge(actionType) {
      if (!this.edges[actionType]) {
        this.edges[actionType] = new UserAction(actionType);
      } else {
        this.edges[actionType].incrementFrequency();
      }
      return this.edges[actionType];
    }
  }
  
  const logUserActions = (sample_logs) => {
    let actionTree = {};
  
    // Track last action for each user
    let lastActionPerUser = {};
  
    sample_logs.forEach(([userId, _, actionType]) => {
      if (!lastActionPerUser[userId]) {
        lastActionPerUser[userId] = [];
      }
  
      let userSequence = lastActionPerUser[userId];
      
      if (userSequence.length === 0) {
        // First action for this user
        if (!actionTree[actionType]) {
          actionTree[actionType] = new UserAction(actionType);
        } else {
          actionTree[actionType].incrementFrequency();
        }
        userSequence.push(actionTree[actionType]);
      } else {
        // Find the parent node (last action taken by the user)
        let parentNode = userSequence[userSequence.length - 1];
        let newNode = parentNode.getOrCreateEdge(actionType);
        userSequence.push(newNode);
      }
    });
  
    return actionTree;
  };
  
  // Function to print tree in desired format
  const printTree = (node, level = 0) => {
    console.log(`${'  '.repeat(level)}${node.actionType} (${node.frequency})`);
    Object.values(node.edges).forEach(edge => {
      console.log(`${'  '.repeat(level + 1)}->`);
      printTree(edge, level + 2);
    });
  };
  
  // Sample logs
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
  
  let res = logUserActions(sample_logs);
  
  // Print the action tree
  Object.values(res).forEach(root => printTree(root));
  