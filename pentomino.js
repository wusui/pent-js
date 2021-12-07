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
const rectHoles = require('./rect_holes');

/**
 * Temporary non-functional programming debugging/testing code.
 */
//console.log(tTreeMain.treeData());
xxx = rectGetX.solverGetRectsWithX();
outstr = '';
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < xxx[i].length; j++) {
    pentStr = pentOutput.pentToString(xxx[i][j]);
    outstr = outstr.concat(pentStr);
  }
}
//console.out(outstr);

/**
 * Test the valid hole size checking code.
 */
xxx[3][1][0][0] = 'I';
xxx[3][1][1][0] = 'I';
xxx[3][1][2][0] = 'I';
xxx[3][1][3][0] = 'I';
xxx[3][1][4][0] = 'I';

console.log(rectHoles.areHolesValidSizes(xxx[3][1]));
console.log(rectHoles.areHolesValidSizes(xxx[0][2]));
console.log(rectHoles.areHolesValidSizes(xxx[3][0]));
console.log(rectHoles.areHolesValidSizes(xxx[0][0]));
