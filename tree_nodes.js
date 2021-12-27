/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Node Module
 *
 * A node is an Object in the tree Array wrapping a point on the tree
 * (point is one of the properties of a node).
 *
 * Other properties that a node may have are parent (the node that is the
 * immediate ancestor of this node on the tree) and branches (descendant
 * nodes on the tree).
 */
const tPoints = require('./tree_points');

/**
 * Given a node (indicated by both the node and an index into the tree
 * (kind of redundant)), if the node has no branches, place potential
 * branch information into a property named offspring.
 *
 * @param {Array} tree Array of node objects forming the tree
 * @param {node} tnode Object representing this node
 * @param {Integer} index Index of tnode in tree
 * @return {node} new node with offspring property added when the node
 *         has no branches
 */
exports.addBranches = tree => (tnode, index) =>
  tnode.hasOwnProperty('branches') ?
  tnode : {...tnode, 'offspring': {'points':
  checkAllPts(exports.getParents(tree)(index)), 'index': index}};;

/**
 * Get all ancestor points to a node.
 *
 * @param {Array} tree Array of nodes
 * @param {Integer} indx Index of this point in tree
 * @return {Array} List of ancestor points to tree[indx]
 */
exports.getParents = tree => indx => findAllAncestors(tree)
  (tree[indx]).flat(5).map(tnode => tnode.point);

/**
 * Recursively scan parent properties in the tree to get an Array of
 * ancestor points.
 *
 * @param {Array} tree Array of nodes
 * @param {node} tnode Node in tree
 * @return {Array} list of points further up the tree that are ancestors to
 *         this node.
 */
const findAllAncestors = tree => tnode => tnode.parent !== undefined ?
  [tnode, findAllAncestors(tree)(tree[tnode.parent])] : [tnode];

/**
 * Get a list of all points that are next to points in an Array of points.
 *
 * @param {Array} x Array of points
 * @return {Array} Array of neighboring points
 */
const checkAllPts = x => x.map(tPoints.getNextPoints).flat(5);
