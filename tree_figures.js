/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

/**
 * Figure Module
 *
 * Assign figure values to nodes that will be added.  Figure values are
 * Integers that uniquely represent a set of points that comprise a figure.
 *
 * The figure assigned to a node is determined by the point value in that node
 * and the point values of all ancestor nodes.  Each possible point location
 * is mapped to an integer.  When 2 is raised to that integer's power, a
 * unique bit location in an integer is returned.  The sum of all these
 * integers then results in a unique id for that set of points.
 */
const pentUtils = require('./pent_utils');

/**
 * Get figure properties for new nodes.
 *
 * @param {Array} tnew New node for which figure property will be assigned
 * @param {Array} tree Existing tree
 * @return {Array} New nodes with figure values assigned
 */
const getFigs = tnew => tree => tnew.map(setFigValue(tree));

/**
 * Assign figure property to a specific node.
 *
 * @param {Array} tree Existing tree
 * @param {node} tnode Entry in tree we are calculating figure for
 * @return {node} Node with figure set
 */
const setFigValue = tree => tnode => ({...tnode,
  'figure': getFigValue(tree)(tnode)});

/**
 * Recursively calculate the figure value by calling evalNumb for all
 * nodes in the path and adding these values up.
 *
 * @param {Array} tree Existing tree
 * @param {node} tnode Node in tree
 * @return {Integer} unique Id for this figure
 */
const getFigValue = tree => tnode => tnode.parent !== undefined ?
  (2 ** pentUtils.evalNumb(tnode.point) +
  getFigValue(tree)(tree[tnode.parent])) : 0;

exports.getFigs = getFigs;