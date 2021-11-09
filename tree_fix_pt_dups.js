const tPoints = require('./tree_points');
const treeNode = require('./tree_nodes');

const removeSamePoint = tree => tnode => tnode.hasOwnProperty('offspring') ?
  {point: tnode['point'], parent: tnode['parent'],
  offspring: removeSamePointOffspring(tree)(tnode)} : tnode;

const removeSamePointOffspring = tree => tnode =>
  ({points: (checkDupPoint(tree)
  (treeNode.getParents(tree, tnode.offspring.index))
  (tnode.offspring.points)), index: tnode.offspring.index});

const checkDupPoint = tree => plist => pointList => pointList.filter(
  checkIfIamDup(tree)(plist));

const checkIfIamDup = tree => plist => point => plist.every(
  pointNotMatch(point));

const pointNotMatch = point => pentry => !tPoints.compPoints(point, pentry);

const removeDupPoints = tree => tree.map(removeSamePoint(tree));

exports.removeDupPoints = removeDupPoints;
