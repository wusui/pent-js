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

// const findPentSolutions = () => func1(tTreeMain.treeData());

//const func1 = tree => func3(tree)(getPentominoStartingLoc(tree)(0))
//  (rectGetX.solverGetRectsWithX());
//const func1 = tree => func3(tree)(getPentominoStartingLoc(tree)(0))
//  (rectGetX.solverGetRectsWithX());
//const getPentominoStartingLoc = tree => node => 'branches' in tree[node] ?
//  getPentominoStartingLoc(tree)(tree[node]['branches'][0]) : node;

//const func3 = tree => startIndex => rectList =>
//  console.log("xxxxx", startIndex, tree[startIndex], rectList);

//findPentSolutions()

tree = tTreeMain.treeData();
console.log(tree[0]);
xxx = rectGetX.solverGetRectsWithX();
//sindx = getPentominoStartingLoc(tree)(0);
//console.log("sindx", sindx);
//console.log(tree);
//xxx[3][1][0][1] = 'X';
//xxx[3][1][1][0] = 'X';
//xxx[3][1][5][5] = 'L';
console.log(xxx[3][1]);
foo = rectFindPent.getPlacements(tree)(xxx[3][1]);
console.log("rect placement value", foo, foo.map(x => tree[x]));
console.log(rectHoles.areHolesValidSizes(xxx[3][1]));
console.log(rectSymmetry.checkSym(xxx[3][1]));
console.log('answer', rectPlacePent.putPentInRect(tree, xxx[3][1], 75));
console.log("_____________________________________________");


const func1 = tree => rect =>
  func2(tree)(getPentominoStartingLoc(tree)(0))(rect);

const func2 = tree => rect => {
    
    console.log("func2 rect", rect);
    v1 = rectFindPent.getPlacements(tree)(rect);
    console.log("func2", v1);
    return v1.map(x => foo1(tree, x, rect));
}

const foo1 = (tree, x, rect) => ["foo1", x];

const xxfunc2 = tree => rect =>
  rectFindPent.getPlacements(tree)(rect).map(
  x => wrapMakeSureItsOkay(tree, rectPlacePent.putPentInRect(tree, rect, x)));

const wrapMakeSureItsOkay = (tree, rect) => makeSureItsOkay(rect) ?
  func3(tree, rect) : false;

const func3 = (tree, rect) => {
  console.log("func3", rect);
  x = rect.flat(1).find(x => x == '.') == undefined ? rect : func2(tree)(rect);
  console.log("func3 return", x);
  return x;
  }
const makeSureItsOkay = rect => rectHoles.areHolesValidSizes(rect) &&
  (! rectSymmetry.checkSym(rect));

//console.log(func1(tree)(xxx[3][1]));
