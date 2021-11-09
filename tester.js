const tPoints = require('./tree_points');
const treeNode = require('./tree_nodes');
const tFixDupPts = require('./tree_fix_pt_dups');

b = treeNode.tRoot();

a = b.map(treeNode.addBranches);

console.log(a[2]); 
console.log(a[2].offspring);
console.log(treeNode.getParents(a, 2));
//z = removeSamePoint(a)(a[0]);

// g = a.map(removeSamePoint(a));
g = tFixDupPts.removeDupPoints(a);
console.log('===================================');
console.log(g);
console.log(g[1].offspring);
console.log(g[2].offspring);
console.log('===================================');
//console.log(a[1].offspring);
//console.log(treeNode.getParents(a, 1));
b1 = [{point: {row: 0, col: 0}}];
a1 = b1.map(treeNode.addBranches);
//console.log(treeNode.getParents(a1, 0));
g1 = tFixDupPts.removeDupPoints(a1);
console.log(g1);
console.log(g1[0].offspring);
