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

  buildTree(array) {
    // If array is empty
    if (!array || array.length === 0) {
      return null;
    }

    // Clean and sort array
    const cleanArr = [...new Set(array)].sort((a, b) => a - b);

    // Find middle index
    const middle = Math.floor(cleanArr.length / 2);

    // Creat new node
    const node = new Node(cleanArr[middle]);

    // Split array
    const left = cleanArr.slice(0, middle);
    const right = cleanArr.slice(middle + 1);

    // Recursively build children
    node.left = this.buildTree(left);
    node.right = this.buildTree(right);

    return node;
  }

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

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
