/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Find all possible pentominos to fit in the first available spot in
 * a configuration of pentominos in a rectangle
 */
const constants = require('./constants');
const rectNextStart = require('./rect_next_start');
const pentUtils = require('./pent_utils');

/**
 * Get a list of pentominos (based on leaf node number) that can fill
 * a given configuration.
 *
 * First bad nodes are found and marked.  Then those nodes that are bad
 * are removed and then those nodes that are leaf nodes are removed. Finally,
 * those leaf nodes for pentominos in use are removed.  The indices of the
 * remaining nodes are extracted.
 *
 * @param {Array} tree Tree data structure
 * @param {Array} rect 2-dimensional layout of board to be solved
 * @return {Array} list of leaf nodes of pentominos that fit
 */
const getPlacements = (tree) => (rect) => markBadNodesWrap(
    rectNextStart.findNextStartSq(rect)
)(tree)(rect).map((bnode0, indx) => [bnode0, indx]).filter(
    (bnode1) => !bnode1[0].hasOwnProperty('bad')
).filter((bnode2) => bnode2[0].hasOwnProperty('symbol')).map(
    (bnode3) => bnode3[1]
).filter((bnode4) => notInRect(tree[bnode4].symbol, rect));

/**
 * If bad property is set for a node, make sure that all offspring nodes
 * are also marked as being bad.
 *
 * @param {Array} origin [row, col] coordinates of first location where
 *                       a pentomnino is to be added
 * @param {Array} tree tree
 * @param {Array} rect Board Layout
 * @return {Array} new tree image with bad nodes marked
 */
const markBadNodesWrap = (origin) => (tree) => (rect) => repeatCall(
    markBadNodes(origin)(tree)(rect),
    constants.DEPTH_OF_PENTOMINO_IN_TREE
);

/**
 * Mark nodes as bad if the corresponding point is not blank in rect
 *
 * @param {Array} origin [row, col] coordinates of first location where
 *                       a pentomnino is to be added
 * @param {Array} tree tree
 * @param {Array} rect Board Layout
 * @return {Array} new tree image with bad node marked
 */
const markBadNodes = (origin) => (tree) => (rect) => tree.map(
    (squareloc) => calcSqLoc(origin, squareloc, rect) ?
    squareloc :
    pentUtils.putInNewProp(squareloc, 'bad', true)
);

/**
 * Find a location in the rectangle by adding origin and node locations
 * together
 *
 * @param {Array} origin [row, col] coordinates of first location where
 *                       a pentomnino is to be added
 * @param {Array} node node in ree being checked
 * @param {Array} rect Board Layout
 * @return {boolean} true if point is empty
 */
const calcSqLoc = (origin, node, rect) => evalSq(
    origin[0] + node.point.row,
    origin[1] + node.point.col,
    rect
);
/**
 * Recursively call wrapBadNodeCheck to find all offspring of bad nodes
 *
 * @param {Array} tree tree
 * @param {Integer} count Number of times to call left
 * @return {Array} Copy of tree with bad nodes marked
 */
const repeatCall = (tree, count) => (
    count === 0 ?
    wrapBadNodeCheck(tree) :
    repeatCall(wrapBadNodeCheck(tree), count - 1)
);

/**
 * Mark nodes that are bad, but make sure that [0, 0] is skipped
 *
 * @param {Array} tree tree
 * @param {Integer} count count
 * @return {Array} bad nodes
 */
const wrapBadNodeCheck = (tree) => tree.map(
    (squareloc) => squareloc.parent === undefined ?
    squareloc :
    badNodeCheck(tree, squareloc)
);

/**
 * Set bad flag in node if parent has bad flag set
 *
 * @param {Array} tree tree
 * @param {Array} node node entry in tree
 * @return {Array} node node entry with bad property set if set in parent
 */
const badNodeCheck = (tree, node) => (
    tree[node.parent].hasOwnProperty('bad') ?
    pentUtils.putInNewProp(node, 'bad', true) :
    node
);

/**
 * Check if pentomino is already in a rectangle
 *
 * @param {character} symbol Symbol field in node of tree
 * @param {Array} rect Board layout
 * @return {boolean} false if in rect, true otherwise
 */
const notInRect = (symbol, rect) => rect.flat(1).find(
    (pentval) => pentval === symbol
) === undefined;

/**
 * Test if square is open.  Return false if invalid (not on board) or
 * if square is not empty
 *
 * @param {Integer} rnum Row number of square being checked
 * @param {Integer} cnum Column number of square being checked
 * @param {Array} rect Board layout
 * @return {boolean} true if square is valid and empty
 */
const evalSq = (rnum, cnum, rect) => (
    rnum < 0 ?
    false :
    (rnum >= rect.length) ?
    false :
    cnum >= rect[0].length ?
    false :
    rect[rnum][cnum] === '.'
);

exports.getPlacements = getPlacements;
