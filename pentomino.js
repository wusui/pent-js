/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Main routine
 *
 * Find all solutions for filling rectangles with pentominos.
 */
const tTreeMain = require('./tree_main_branch');
const pentOutput = require('./pent_output');
const rectGetX = require('./rect_getXlocations');
const rectHoles = require('./rect_holes');
const rectSymmetry = require('./rect_symmetry');
const rectFindPent = require('./rect_find_pent');
const rectPlacePent = require('./rect_place_pent');
const pentUtils = require('./pent_utils');

/**
 * Solve all rectangular pentomino tilings.
 *
 * First loop through all possible retangle dimensions
 *
 * @return {String} pentomino solutions
 */
exports.pentominoRectangles = () =>
  pentUtils.rangeNum(1, 0).
  map(x => solveSize(x)).reduce((a, b) => a + b, '');

/**
 * Get solutions for each size.
 *
 * @param {Integer} x Index for each possible rectangle size
 * @return {String} Solutions for a given pentomino size
 */
const solveSize = x => handlePlacements(x,
  tTreeMain.treeData(), rectGetX.solverGetRectsWithX());

/**
 * Loop through possible X-pentomino locations for this rectangle
 *
 * @param {Integer} size Index of rectangle size
 * @param {Array} tree tree
 * @param {Array} rect Board layout
 * @return {String} Solutions for a given pentomino size
 */
const handlePlacements = (size, tree, rect) =>
  rect[size].map(x => solver(tree, x)).reduce((a,b) => a + b, '');

/**
 * Find all solutions for a given rectangle configuration
 *
 * This routine is essentially the heart of this program.  It
 * (in coordination with getNextPent) recursively tries pentominos,
 * backtracking if failures are found.
 *
 * It first makes sure that there are no holes in the rectangle of a size
 * that is not evenly divisible by 5.  Such holes can not be filled with
 * an integer number of pentominos.
 *
 * Next it makes sure there are no W-flipping symmetry issues,
 * and then sees if there are any open squares are left in rect.
 *
 * If there are no open squares, then we have a solution which is returned.
 * Otherwise, we find all possible open squares and pass that value to
 * getPlacements
 *
 * @param {Array} tree tree
 * @param {Array} rect Board layout
 * @return {Array} List of solutions for the pentomino solver
 */
const solver = (tree, rect) =>
  ! rectHoles.areHolesValidSizes(rect) ? '' :
  rectSymmetry.checkSym(rect) ? '' :
  rect.flat(1).find(x => x == '.') == undefined ?
  pentOutput.pentToString(rect) :
  getNextPent(tree, rect, rectFindPent.getPlacements(tree)(rect));

/**
 * If there are no possible placements, return blank and return
 * (essentially backtracking up the recursive calls adding pentominos).
 *
 * Otherwise, place the solution into the rectangle and recursively call
 * solver.
 *
 * @param {Array} tree tree
 * @param {Array} rect Board layout
 * @param {Array} pents List of node numbers in tree that fit
 */
const getNextPent = (tree, rect, pents) =>
  pents == 0 ? '' :
  pents.reduce((a, b) => a + (solver(tree,rectPlacePent.
  putPentInRect(tree, rect, b))), '');
