/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Main routine
 *
 * Find all solutions for filling rectangles with pentominos.
 */
var require;
var exports;
const tTreeMain = require("./tree_main_branch");
const pentOutput = require("./pent_output");
const rectGetX = require("./rect_getXlocations");
const rectHoles = require("./rect_holes");
const rectSymmetry = require("./rect_symmetry");
const rectFindPent = require("./rect_find_pent");
const rectPlacePent = require("./rect_place_pent");
const pentUtils = require("./pent_utils");

/**
 * Solve all rectangular pentomino tilings.
 *
 * Get tree and board layouts and call solveSize
 *
 * @return {String} pentomino solutions
 */
const pentominoRectangles = () => solveSize(tTreeMain.treeData())(
    rectGetX.solverGetRectsWithX()
);

/**
 * Get solutions for each rectangle size.
 *
 * @param {Array} tree Pentomino solving tree
 * @param {Array} rect Pentomino solution rectangle
 * @return {String} pentomino Solutions
 */
const solveSize = (tree) => (rect) => pentUtils.rangeNum(4, 0).map(
    (sizeInd) => handlePlacements(sizeInd, tree, rect)
).reduce((answer, board) => answer + board, "");

/**
 * Loop through possible X-pentomino locations for this rectangle
 *
 * @param {Integer} size Index of rectangle size
 * @param {Array} tree tree
 * @param {Array} rect Board layout
 * @return {String} Solutions for a given pentomino size
 */
const handlePlacements = (size, tree, rect) => rect[size].map(
    (indvrect) => solver(tree, indvrect)
).reduce((answer, board) => answer + board, "");

/**
 * Find all solutions for a given rectangle configuration
 *
 * This routine is essentially the heart of this program.  It recursively
 * tries pentominos, backtracking if failures are found.
 *
 * First make sure that there are no holes in the rectangle of a size
 * that is not evenly divisible by 5.  Such holes can not be filled with
 * an integer number of pentominos.
 *
 * Next make sure there are no W-flipping symmetry issues,
 * and then sees if there are any open squares are left in rect.
 *
 * If there are no open squares, then a solution is returned.
 * Otherwise, find all possible open squares and via a reduce call
 * recursively call solver again with each possible pentomino used to fill
 * the open squares.
 *
 * @param {Array} tree tree
 * @param {Array} rect Board layout
 * @return {Array} List of solutions for the pentomino solver
 */
const solver = (tree, rect) => (
    !rectHoles.areHolesValidSizes(rect)
    ? ""
    : rectSymmetry.checkSym(rect)
    ? ""
    : rect.flat(1).find((rectsq) => rectsq === ".") === undefined
    ? pentOutput.pentToString(rect)
    : rectFindPent.getPlacements(tree)(rect).reduce(
        (answer, board) => answer + (solver(tree, rectPlacePent.putPentInRect(
            tree,
            rect,
            board
        ))),
        ""
    )
);

exports.pentominoRectangles = pentominoRectangles;
