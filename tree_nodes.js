const tPoints = require('./tree_points');

const tRoot = () => [{point: {row: 0, col: 0}, branches: [1,2]},
  {point: {row: 1, col: 0}, parent: 0},
  {point: {row: 0, col: 1}, parent: 0}];

const addBranches = (tnode, index) => tnode.hasOwnProperty('branches') ?
  tnode : {...tnode, 'offspring': {points: 
  tPoints.getNextPoints(tnode.point), index: index}};

const lukeIamYourFather = tree => tnode => tnode.hasOwnProperty('parent') ?
  [tnode, lukeIamYourFather(tree)(tree[tnode.parent])] : [tnode];

const getParentPoint = tnode => tnode.point;

const getParents = (tree, indx) => lukeIamYourFather(tree)
  (a[indx]).flat(5).map(getParentPoint);

exports.tRoot = tRoot;
exports.addBranches = addBranches;
exports.getParents = getParents;
