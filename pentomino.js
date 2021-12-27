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

//tree = tTreeMain.treeData();
//xxx = rectGetX.solverGetRectsWithX();

const pentominoRectangles = () =>
  pentUtils.rangeNum(2, 0).
  map(x => solveSize(x)).reduce((a, b) => a + b, '');

const solveSize = x => handlePlacements(x,
  tTreeMain.treeData(), rectGetX.solverGetRectsWithX());

const handlePlacements = (x, tree, rect) =>
  rect[x].map(x => solver(tree, x)).reduce((a,b) => a + b, '');

const solver = (tree, rect) => {
  if (! rectHoles.areHolesValidSizes(rect)) return '';
  if (rectSymmetry.checkSym(rect)) return '';
  if (rect.flat(1).find(x => x == '.') == undefined) {
    return pentOutput.pentToString(rect);
  }
  pents = rectFindPent.getPlacements(tree)(rect);
  if (pents === []) return '';
  return pents.reduce((a, b) => a + (solver(tree,
          rectPlacePent.putPentInRect(tree, rect, b))), '');
}

console.log(pentominoRectangles());
// console.log(pentUtils.rangeNum(4,0));
// console.log(xxx[0].map(x => solver(tree, x)).reduce((a,b) => a + b, ''));
