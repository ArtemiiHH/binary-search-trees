class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {}

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  levelOrderForEach(callback) {}

  inOrderForEach(callback) {}

  preOrderForEach(callback) {}

  postOrderForEach(callback) {}

  height(value) {}

  depth(value) {}

  isBalanced() {}

  rebalance() {}

  prettyPrint() {}
}
