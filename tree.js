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
}
