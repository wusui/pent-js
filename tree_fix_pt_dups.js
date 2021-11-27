const tPoints = require('./tree_points');
const treeNode = require('./tree_nodes');

/**
 * Apply removeSamePoint test to every entry in tree.
 *
 * @param {Array} tree List of nodes in the tree
 * @return {Array} tree List of nodes that have offspring values (newly
 *         added nodes) where none of the nodes ancestor nodes match the
 *         node being added.
 */
const removeDupPoints = tree => tree.map(removeSamePoint(tree));

/**
 * If node has offspring, reset offspring property to be Array of nodes that
 * do not have duplicate entries in their list of ancestors.
 *
 * @param {Array} tree List of nodes in the tree
 * @param {node} tnode Node whose offspring values are being tested
 * @return {node} Tnode where offspring that are also ancestors are removed
 */
const removeSamePoint = tree => tnode => tnode.hasOwnProperty('offspring') ?
  {point: tnode['point'], parent: tnode['parent'],
  offspring: removeSamePointOffspring(tree)(tnode)} : tnode;

/**
 * Remove nodes from offspring list that are duplicates of ancestor nodes
 *
 * @param {Array} tree List of nodes in the tree
 * @param {node} tnode Node whose offspring values are being tested
 * @returns {Array} offspring field modified with duplicates removed
 */
const removeSamePointOffspring = tree => tnode =>
  ({points: (checkDupPoint
  (treeNode.getParents(tree)(tnode.offspring.index))
  (tnode.offspring.points)), index: tnode.offspring.index});

/**
 * Scan an Array and filter entries to only allow values that do not match
 * every value in another Array being compared against.
 *
 * @param {Array} plist List of points which is being compared against
 * @param {Array} pointList List of points which individually must not contain
 *         any of the points in plist
 * @return {Array} Subset of pointList which is the set of all points that
 *         are not in plist
 */
const checkDupPoint = plist => pointList => pointList.filter(
  x => plist.every(pointNotMatch(x)));

/**
 * Return true if points do not match
 *
 * @param {point} point First point
 * @param {point} pentry Second point
 * @return {Boolean} 
 */
const pointNotMatch = point => pentry => !tPoints.compPoints(point)(pentry);

exports.removeDupPoints = removeDupPoints;
