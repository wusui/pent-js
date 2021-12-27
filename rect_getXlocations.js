/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * GetXlocations Module
 *
 * Find all starting board configurations where X pentomino is already placed.
 */
const pentUtils = require('./pent_utils');

/**
 * @return {Array} list of rectangles of all valid dimensions with all
 *   upper left quadrant locations for the X-pentomino set.
 */
exports.solverGetRectsWithX = () => setupRectangles(pentUtils.rangeNum(4, 3));

/**
 * Generate a rectangle for each of the possible sizes.
 * 
 * @param {Integer} size Number of rows in this set of rectangles
 * @param {Array} Rectangles of this row size with X-pentomino filled in
 */
const setupRectangles = sizes => sizes.map(x => addOneRect(x));

/**
 * Generate the whole rectangle given the number of rows.
 * 
 * @param {Integer} size Number of rows in this set of rectangles
 * @returns {Array} empty rectangle with the correct size
 */
const addOneRect = size => setXOneRect(
  Array(size).fill(0).map(x => Array(60 / size).fill('.')));

/**
 * Remove the X-pentomino in the highest lefmost location (invalid because
 * if leaves one tile that will nont get filled in).
 * 
 * @param {Array} rect Rectangle to be filled
 * @return {Array} list of all valid rectangles
 */
const setXOneRect = rect => setXcenters(rect).map(x => rectSetX(
  rect, x)).filter((_,indx) => indx != 0);

/**
 * @param {Array} rect Rectangle
 * @param {Array} x Location of the center of the X-pentomino
 * @reeturn {Array} Rectangle with X-pentomino filled in
 */
const rectSetX = (rect, x) => rect.map((y, indx) => y.map(
  ((_, indx2) => setXvalInRect(indx, indx2, x))));

/**
 * Do the actual tile setting of the non-centerX-pentomino squares.
 * 
 *  @param {Integer} indx Row number
 *  @param {Integer} indx2 Column number
 *  @return {character} X if pentomino location
 */
const setXvalInRect = (indx, indx2, x) =>
  (Math.abs(indx - x[0]) <= 1 && indx2 == x[1]) ||
  (indx == x[0] && Math.abs(indx2 - x[1]) <= 1) ? 'X' : '.';

/**
 * Find the centers of all X locations
 * 
 * @param {Array} rect Retangle being filed
 * @return {Array} center points of where the X-pentomino will go
 */
const setXcenters = rect => loopXforRow(genRange(rect[0].length),
  genRange(rect.length));

/**
 * generate the range of squares for the X-center point  These will be
 * in the upper left quadrant of the rectangle.
 * 
 * @param {Integer} numb dimension of rectangle
 * @return {Integer} highest index along this side that remains in the uppper
 *   left quadrant
 */
const genRange = numb => pentUtils.rangeNum(Math.floor((numb - 1) / 2), 1);

/**
 *  Generate list of points for possible row values
 *  
 *  @param {Integer} x Row dimension
 *  @param {Integer} y Col dimension
 *  @return {Array} list of row values that are valid
 */
const loopXforRow = (x, y) => x.map(z => loopXforCol(z)(y)).flat(1);

/**
 * Generate list of points for possible column values
 * 
 * @param {Integer} x Row dimension
 * @param {Integer} y Col dimension
 * @param {Array} list of X-pentomino center points
 */
const loopXforCol = x => y => y.map(z => [z, x]);
