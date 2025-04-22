class QuadTreeNode {
    constructor(val, isLeaf, topLeft = null, topRight = null, bottomLeft = null, bottomRight = null) {
      this.val = val;
      this.isLeaf = isLeaf;
      this.topLeft = topLeft;
      this.topRight = topRight;
      this.bottomLeft = bottomLeft;
      this.bottomRight = bottomRight;
    }
  }
  
  const isHomogeneous = (grid, xStart, yStart, size) => {
    const firstVal = grid[xStart][yStart];
    for (let i = xStart; i < xStart + size; i++) {
      for (let j = yStart; j < yStart + size; j++) {
        if (grid[i][j] !== firstVal) return false;
      }
    }
    return true;
  };
  
  const buildTree = (grid, xStart, yStart, size) => {
    if (isHomogeneous(grid, xStart, yStart, size)) {
      return new QuadTreeNode(grid[xStart][yStart], true);
    }
  
    const half = size / 2;
    const topLeft = buildTree(grid, xStart, yStart, half);
    const topRight = buildTree(grid, xStart, yStart + half, half);
    const bottomLeft = buildTree(grid, xStart + half, yStart, half);
    const bottomRight = buildTree(grid, xStart + half, yStart + half, half);
  
    return new QuadTreeNode(null, false, topLeft, topRight, bottomLeft, bottomRight);
  };
  
  const buildQuadTree = (grid) => {
    const height = grid.length;
    const width = grid[0].length;
  
    if (height !== width || (height & (height - 1)) !== 0) {
      throw new Error("Grid must be square with dimensions of power of 2");
    }
  
    return buildTree(grid, 0, 0, width);
  };
  
  // Test Input
  const input = [
    [2, 2, 3, 3],
    [2, 2, 3, 3],
    [2, 2, 5, 1],
    [2, 2, 5, 5],
  ];
  
  const tree = buildQuadTree(input);
  console.log(JSON.stringify(tree, null, 2));
  