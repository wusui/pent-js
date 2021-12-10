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
const rectNextStart = require('./rect_next_start');
const rectSymmetry = require('./rect_symmetry');

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

console.log(rectNextStart.findNextStartSq(xxx[3][1]));
console.log(rectNextStart.findNextStartSq(xxx[0][0]));

xxx[2][4][0][2] = 'W';
xxx[2][4][0][3] = 'W';
xxx[2][4][1][1] = 'W';
xxx[2][4][1][2] = 'W';
xxx[2][4][2][1] = 'W';

console.log(rectSymmetry.checkSym(xxx[2][2]));
console.log(rectSymmetry.checkSym(xxx[1][5]));
console.log(pentOutput.pentToString(xxx[2][4]));
console.log(rectSymmetry.checkSym(xxx[2][4]));
console.log(rectSymmetry.checkSym(xxx[2][3]));

xxx[2][2][3][9] = 'W';
xxx[2][2][3][8] = 'W';
xxx[2][2][2][8] = 'W';
xxx[2][2][2][7] = 'W';
xxx[2][2][1][6] = 'W';
console.log(rectSymmetry.checkSym(xxx[2][2]));


