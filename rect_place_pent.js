/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */
const rectNextStart = require('./rect_next_start');

/**
 * Add a pentomino to the rectangle
 * 
 * First get the list of nodes that comprise this pentomino.
 * Next find the location of the corresponding square in the rectangle.
 * Then create new one-dimensional copies of the rectangle with the various
 * points added.
 * Combine these copies, and reconfigure back into two dimensions.
 * 
 * @param {Array} tree tree
 * @param {Array} rect Board layout
 * @param {Array} node Index of leaf node of pentomino being added.
 * @return {Array} New rect with pentomino added
 */
exports.putPentInRect = (tree, rect, node) =>
  regroupWrap(getPnodes(tree, node).flat(5).
  map(x => constructPoint(rectNextStart.findNextStartSq(rect))(tree, x)).
  map(x => modRect(rect, tree[node].symbol, x).flat(1)).
  reduce(squareChkr), rect[0].length);

/**
 * @param {Array} a List accumulator of reduced data
 * @param {character} character to be merge in if square is blank
 * @return {character} new value in square
 */
const squareChkr = (a, b) => a.map((x, indx) => x == '.' ? b[indx] : x);

/**
 * Set point value of added square in rectangle
 * 
 * @param {Array} rect Board layout
 * @param {character} symbol Letter value of pentomino to be added
 * @param {Array} rpnt point being added to new Array
 * @return {Array} list of lines in new rect Array
 */
const modRect = (rect, symbol, rpnt) =>
  rect.map((x, indx) => indx == rpnt[0] ? modLine(x, rpnt[1], symbol) : x);

/**
 * Set line in rectangle being added
 * 
 * @param {Array} rline Old line
 * @param {Integer} column Index of square where we are adding a square from
 *                         a pentomino
 * @param {character} symbol Character representation of pentomino being added
 * @return {Array} new line in new rectangle
 */
const modLine = (rline, column, symbol) =>
  rline.map((item, indx)=> indx == column ? symbol : item);

/**
 * get [row, column] value of location of a point in the pentomino
 * 
 * @param {Array} origin [row, col] coordinates of the first empty square
 *                       in the rectangle
 * @param {Array} tree tree
 * @param {Integer} node Index of leaf node in tree
 * @return [row, column] value of the location of this point
 */
const constructPoint = (origin) => (tree, node) =>
  [tree[node].point.row + origin[0], tree[node].point.col + origin[1]];

/**
 * Get nested list of nodes we are adding
 * 
 * @param {Array} tree tree
 * @param {Integer} node Index in tree of leaf node of the pentomino for
 *                       which we are placing all points.
 */
const getPnodes = (tree, node) =>
  tree[node] == undefined ? [] : [node, getPnodes(tree, tree[node].parent)];

/**
 * Wrap regroup and remove empty Array from the end of the first parameter.
 * 
 * @param {Array} pdata List of square values in the rectangle
 * @param {Integer} n Length of the rectangle
 * @return {Array} Rectangle reformed from list of square values
 */
const regroupWrap = (pdata, n) =>
  regroup(pdata, n).filter(x => x.length > 0);

/**
 * Reform rectangle form the list of square values
 * 
 * @param {Array} pdata List of square values in the rectangle
 * @param {Integer} n Length of the rectangle
 * @return {Array} Rectangle reformed from list of square values
 */
const regroup = (pdata, n) => pdata.length < n ? [pdata] : 
  [pdata.slice(0, n), ...regroup(pdata .slice(n), n)];
