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

  insert(value) {
    if (this.root === null) return (this.root = new Node(value));

    let currentNode = this.root;

    while (currentNode !== null) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        return;
      }
    }
  }

  deleteItem(value) {
    let currentNode = this.root;
    let parent = null;

    // Search
    while (currentNode !== null && currentNode.data !== value) {
      parent = currentNode;

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    // Value not found
    if (currentNode === null) return;

    // CASE 1 — LEAF NODE
    if (currentNode.left === null && currentNode.right === null) {
      if (parent === null) {
        this.root = null; // deleting root
      } else if (parent.left === currentNode) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      return;
    }

    // CASE 2 — ONE CHILD
    if (
      (currentNode.left !== null && currentNode.right === null) ||
      (currentNode.left === null && currentNode.right !== null)
    ) {
      const child =
        currentNode.left !== null ? currentNode.left : currentNode.right;

      if (parent === null) {
        this.root = child; // deleting root
      } else if (parent.left === currentNode) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      return;
    }

    // CASE 3 — TWO CHILDREN
    let successorParent = currentNode;
    let successor = currentNode.right;

    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    // Replace value
    currentNode.data = successor.data;

    // Remove successor node
    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("No callback passed");
    }

    if (!this.root) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw Error("No callback passed");

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }
    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw Error("No callback passed");
    }

    function traverse(node) {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw Error("No callback passed");
    }

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }
    traverse(this.root);
  }

  height(value) {
    let target = this.find(value);
    if (target === null) return null;

    function getHeight(node) {
      if (node === null) return -1;
      let leftHeight = getHeight(node.left);
      let rightHeight = getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }

    return getHeight(target);
  }

  depth(value) {
    let currentNode = this.root;
    let count = 0;

    while (currentNode !== null) {
      if (value === currentNode.data) {
        return count;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
        count++;
      } else {
        currentNode = currentNode.right;
        count++;
      }
    }

    return null;
  }

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
