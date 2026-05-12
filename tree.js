import mergeSort from "./mergesort.js";
import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let noDupes = [...new Set(array)];
    let newArray = mergeSort(noDupes);
    let start = 0;
    let end = newArray.length - 1;

    return sortedArrayToBST(newArray, start, end);

    function sortedArrayToBST(array, start, end) {
      if (start > end) return null;
      let mid = Math.floor((start + end) / 2);
      let root = new Node(array[mid]);

      root.right = sortedArrayToBST(array, mid + 1, end);
      root.left = sortedArrayToBST(array, start, mid - 1);

      return root;
    }
  }

  includes(value) {
    let node = this.root;
    while (node !== null) {
      if (value > node.data) {
        node = node.left;
      } else if (value < node.data) {
        node = node.right;
      } else if (value === node.data) {
        return true;
      }
    }
    return false;
  }

  insert(value) {
    if (this.includes(value)) return null;

    let node = this.root;
    this.root = trulyInsert(node, value);
    function trulyInsert(node, value) {
      if (node === null) {
        let insertedNode = new Node(value);
        return insertedNode;
      }
      if (value < node.data) node.left = trulyInsert(node.left, value);
      else node.right = trulyInsert(node.right, value);

      return node;
    }
  }

  delNode(value) {
    function getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) curr = curr.left;
      return curr;
    }
    let node = this.root;
    this.root = trulyDelNode(node, value);
    function trulyDelNode(node, value) {
      if (node === null) return node;
      if (node.data > value) node.left = trulyDelNode(node.left, value);
      else if (node.data < value) node.right = trulyDelNode(node.right, value);
      else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const succ = getSuccessor(node);
        node.data = succ.data;
        node.right = trulyDelNode(node.right, succ.data);
      }
      return node;
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("No callback provided");
    let node = this.root;
    let queue = [];
    queue.push(node);

    while (queue.length !== 0) {
      shiftedElement = queue.shift();
      callback(shiftedElement.data);
      if (shiftedElement.right !== null) queue.push(shiftedElement.right);
      if (shiftedElement.left !== null) queue.push(shiftedElement.left);
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("No callback provided");
    let node = this.root;
    trulyPreOrderForEach(node, callback);
    function trulyPreOrderForEach(node, callback) {
      if (node === null) return undefined;
      callback(node.data);
      trulyPreOrderForEach(node.left, callback);
      trulyPreOrderForEach(node.right, callback);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("No callback provided");
    let node = this.root;
    trulyPreOrderForEach(node, callback);
    function trulyPreOrderForEach(node, callback) {
      if (node === null) return undefined;
      trulyPreOrderForEach(node.left, callback);
      callback(node.data);
      trulyPreOrderForEach(node.right, callback);
    }
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("No callback provided");
    let node = this.root;
    trulyPreOrderForEach(node, callback);
    function trulyPreOrderForEach(node, callback) {
      if (node === null) return undefined;
      trulyPreOrderForEach(node.left, callback);
      trulyPreOrderForEach(node.right, callback);
      callback(node.data);
    }
  }

  height(value) {
    if (!this.includes(value)) return undefined;
    let node = this.root;
    while (node !== null) {
      if (value < node.data) {
        node = node.left;
      } else if (value > node.data) {
        node = node.right;
      } else {
        break;
      }
    }
    return findHeight(node);
    function findHeight(node) {
      if (node === null) return -1;
      else {
        return 1 + Math.max(findHeight(node.left), findHeight(node.right));
      }
    }
  }

  depth(value) {
    if (!this.includes(value)) return undefined;
    let node = this.root;
    let depth = 0;
    while (node !== null) {
      if (value < node.data) {
        depth++;
        node = node.left;
      } else if (value > node.data) {
        depth++;
        node = node.right;
      } else {
        break;
      }
    }
    return depth;
  }
}
