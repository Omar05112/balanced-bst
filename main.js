import prettyPrint from "./prettyprint.js";
import Tree from "./tree.js";

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(array);

console.log(tree.root.right.data);
