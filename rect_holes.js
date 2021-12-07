/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

/**
 * Make sure that the sizes of all holes on the board is a multiple of five
 * tiles (pentominoes can't fit if they are not).
 */

/**
 * Test a board to make sure that it is possible to fit pentominoes into
 * all holes (all holes are a multiple of 5 tiles)
 * 
 * @param {Array} board Board in current state (some tiles filled in).
 * @return {Boolean} True if it is possible to fit pentominoes on this board,
 *         false if not.
 */
const areHolesValidSizes = board => countHoleSizes(
  mergeBlankRows(false, mergeBlankRows(true, getOpenRows(board))));

/**
 * Return an Array of lists.  Each array entry is a consecutive set of
 * open square numbers
 * 
 * @param {Array} board Board in current state (some tiles filled in)
 * @return {Array} Array whose entries are lists of consecutive points in
 *         the same row.
 */
const getOpenRows = board => rowOpWrapper(
  markRowHeads(getHoleNumbers(board)));

/**
 * Replace every empty square in the solution with an integer value
 * derived from the row number and column number.
 * 
 * @param {Array} board Board in current state (some tiles filled in)
 * @return {Array} Board with integer location values filled in
 */
const getHoleNumbers = board => board.map((y, i) =>
  getBlanksWrap(y, i)).flat(1).map(x => x[0] * 100 + x[1]);

/**
 * Scan a row of the board, extracting number values
 * 
 * @param {Integer} x Row value
 * @param {Integer} j Column index
 * @return {Array} coordinates of blanks on the board
 */
const getBlanksWrap = (x, j) =>
  Object.values(x).map((y, i) => getBlanks(y, j, i)).filter
  (b => (typeof b[1]) == 'number');

/**
 * Given a square, return the coordinates if the square is blank.
 * 
 * @param {Integer} x Square value (blank or figure letter)
 * @param {Integer} j Row index
 * @param {Integer} z Column index
 * 
 * @return {Array} Row/Column coordinates if blank.
 */
const getBlanks = (x, j, z) => (x == '.') ? [j, z] : x;

/**
 * Mark the blank squares in the rectangle that start a row
 * of rectangles.
 * 
 * @param {Array} x List of blank locations in Integer form
 * @return {Array} List of tuples consisting of the blank location and
 *   a true/false value that is true when the square to the left is not
 *   empty
 */
const markRowHeads = x => x.map(y => [y, x.includes(y - 1)]);

/**
 * We have a list of hole sizes.  Return true if they are all divisible
 * by 5, false otherwise.
 * 
 * @param {Array} holeSizes List of hole sizes
 * @return {Boolean} True only if all holes have a valid size
 */
const countHoleSizes = holeSizes => holeSizes.map(x => x.length % 5).reduce(
  (a,b) => a + b, 0) == 0;

/**
 * Run reducing of markRowHeads data
 * 
 * @param x {Array} Output of markRowHeads
 * @return {Array} List of lists of points in the same contiguous row
 */
const rowOpWrapper = x => x.reduce(addPointToRow, []);

/**
 * Add point to row data. Start new list if front of row, otherwise
 * merge into last row.
 * 
 * @param a {Array} Row data
 * @param b {Array} markRowHeads data for this point
 * @return {Array} updated row data
 */
const addPointToRow = (a, b) => b[1] ? MergePtIntoExistingRow(a, b) :
  a.concat( [[b[0]]] );

/**
 * Merge a point into the last existing row
 * 
 * @param x {Array} Row data
 * @param b {Array} markRowHeads data for this point
 * @return {Array} updated row data
 */
const MergePtIntoExistingRow = (x, b) => x.slice(0, -1).concat(
  [x[x.length - 1].concat([b[0]])]);

/**
 * Merge blank row information in adjacent columns. The first time, only
 * include rows that end with no possible continuations.  The second time,
 * merge all rows in order to get "dead end" squares merged with rows
 * above the "dead end" squares
 * 
 * @param {Boolean} flg True if first pass, false if second
 * @param {Array} rowData List of row data
 * @return {Array} blank square groups after rows are merged
 */
const mergeBlankRows = (flg, rowData) => combinedRows(
  morePossibleRowCombos(rowData))(rowData, flg);

/**
 * Get further possible combinations of contiguous rows
 * 
 * @param {Array} x List of lists of contiguous blank spaces
 * @param {Array} List of 3-tuple lists consisting of all permutations of
 *   indices into x and a Boolean that is true if lists indexed by the
 *   first two indices can be merged
 * @return {Array} Lists of possible row combinations
 */
const morePossibleRowCombos = x => x.map((y, i) => rowComboWrap(x, i, y));

/**
 * Wrapper for rowComboCheck (handle parameter passing)
 * 
 * @param {Array} x List of blank points
 * @param {Integer} i column
 * @param {Integer} y row
 * @return {Array} Array of Boolean indicators that the combo specified is
 *   contiguous
 */
const rowComboWrap = (x, i, y) => x.map((z, j) => [i, j,
  rowComboCheck(y, z)]);

/**
 * Check if two rows given are contiguous
 * 
 * @param {Array} y Row 1
 * @param {Array} z Row 2
 * @return true if contiguous, false otherwise
 */
const rowComboCheck = (y, z) => y.map(q => q + 100).filter(
  v => z.includes(v)).length > 0;

/**
 * @param {Array} rowInfo More row information extracted from
 *        morePossibleRowCombos
 * @param {Array} rowData List of row segments containing numeric blanks
 *        space indicators
 * @param {Boolean} flg
 * @return {Array} blank square groups after rows are merged
 */
const combinedRows = rowInfo => (rowData, flg) => rowMergeSwitch(
  recurseThruRows(rowData, groupRowInfo(rowInfo).filter(
  x => x[2]).map(m => [m[0], m[1]])), rowInfo, flg);

/**
 * Combined row information into one list (essentially flatten from the
 * top).
 * 
 * @param {Array} rowInfo Row segement pairs and match indicator
 * @return {Array} "top flattened" list of rowInfo
 */
const groupRowInfo = rowInfo => rowInfo.reduce((a,b) => a.concat(b), []);

/**
 * Step through row data, combining to form the complete set of points in
 * every hole.
 * 
 * @param {Array} rowData List of row segments containing numeric blanks
 *        space indicators
 * @param {Array} rowPairs Pairs of row numbers to be merged
 * @return {Array} rowData containing all the points in a hole 
 */
const recurseThruRows = (rowData, rowPairs) => rowPairs.length === 0 ?
  rowData : recurseThruRows(rowMerge(rowData, rowPairs[0]), rowPairs.slice(1));

/**
 * Merge row data, insuring that values are not overwritten
 * 
 * @param {Array} rowData List of row segments containing numeric blanks
 *        space indicators
 * @param {Array} rowPairs Pairs of row numbers to be merged
 * @return {Array} merged copy of rowData
 */
const rowMerge = (rowData, rowPairs) => rowData.map((x, i) =>
  i === rowPairs[1] ? [...(new Set(x.concat(rowData[rowPairs[0]])))] : x);

/**
 * Switch behavior of combinedRows depending on flg
 * 
 * @param {Array} rowSegLists List of row segments
 * @param {Array} rowSegComb Row segment combinations
 * @param {Boolean} flg if true, call passOneHoles, otherwise use
 *        rowSegLists
 * @return {Array} appropriate Row segment information for pass determined
 *         by flg
 */
const rowMergeSwitch = (rowSegLists, rowSegComb, flg) => flg ?
  passOneHoles(rowSegLists, rowSegComb) : rowSegLists;

/**
 * Check holes for the first pass through the list
 * 
 * @param {Array} rowSegLists List of row segments
 * @param {Array} rowSegComb Row segment combinations
 * @return {Array} List of hole information -- each hole is represented
 *         by an Array of corresponding point numbers
 */
const passOneHoles = (rowSegLists, rowSegComb) =>
  rowSegLists.filter((x,i) => detectValidGroups(rowSegComb)[i]);

/**
 * Given a list of row segment pairs and a boolean indicating whether a
 * segment pair does not have segment pairs following, return an Array
 * of booleans whose true values correspond to the index of Arrays of
 * groups of points that are in the rectangle.
 * 
 * @param {Array} rowSegComb Array of group-pairs and termination indicator
 * @return {Array} List of booleans where true values indicate that
 *         corresponding list of points are the set of points in a
 *         hole
 */
const detectValidGroups = rowSegComb => rowSegComb.map(x => x.map(
  y => y[2])).map(z => z.reduce((a, b) => a && (!b), []));

exports.areHolesValidSizes = areHolesValidSizes;