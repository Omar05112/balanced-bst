import prettyPrint from "./prettyprint.js";
import Tree from "./tree.js";

let array = [];

for (let i = 0; i < 20; i++) {
  array.push(Math.floor(Math.random() * 100));
}

let tree = new Tree(array);

tree.buildTree(array);

console.log(tree.isBalanced());
tree.insert(111, 182, 236, 337, 872, 222, 761);
console.log(tree.isBalanced());

tree.levelOrderForEach((value) => console.log(value));
tree.preOrderForEach((value) => console.log(value));
tree.postOrderForEach((value) => console.log(value));
tree.inOrderForEach((value) => console.log(value));

console.log(tree.rebalance());
console.log(tree.isBalanced());

tree.levelOrderForEach((value) => console.log(value));
tree.preOrderForEach((value) => console.log(value));
tree.postOrderForEach((value) => console.log(value));
tree.inOrderForEach((value) => console.log(value));
