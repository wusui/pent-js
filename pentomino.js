/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

/**
 * Main routine
 * 
 * Find all solutions for filling rectangles with pentominos.
 */
const tTreeMain = require('./tree_main_branch');
const pentOutput = require('./pent_output');
const rectGetX = require('./rect_getXlocations');

/**
 * Temporary non-functional programming debugging/testing code.
 */
console.log(tTreeMain.treeData());
xxx = rectGetX.solverGetRectsWithX();
outstr = '';
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < xxx[i].length; j++) {
    pentStr = pentOutput.pentToString(xxx[i][j]);
    outstr = outstr.concat(pentStr);
  }
}
console.log(outstr);
console.log(xxx[1][1]);
console.log(pentOutput.pentToString(xxx[0][2]));
xxx[3][1][0][0] = 'I';
xxx[3][1][1][0] = 'I';
xxx[3][1][2][0] = 'I';
xxx[3][1][3][0] = 'I';
xxx[3][1][4][0] = 'I';
console.log(pentOutput.pentToString(xxx[3][1]));