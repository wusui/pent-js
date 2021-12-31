/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * GetXlocations Module
 *
 * Find all starting board configurations where X pentomino is already placed.
 */
var require;
var exports;
const pentUtils = require("./pent_utils");

/**
 * Generate rectangles for all possible sizes.
 *
 * @return {Array} list of rectangles of all valid dimensions with all
 *   upper left quadrant locations for the X-pentomino set.
 */
const solverGetRectsWithX = () => setupRectangles(pentUtils.rangeNum(4, 3));

/**
 * Generate a rectangle for each of the possible sizes.
 *
 * @param {Array} sizes List of rectangle sizes (shortest dimension)
 * @return {Array} list of rectangles of all valid dimensions with all
 *   upper left quadrant locations for the X-pentomino set.
 */
const setupRectangles = (sizes) => sizes.map(
    (indvSize) => addOneRect(indvSize)
);

const SIZE_OF_ALL_PENTS = 60;
Object.freeze(SIZE_OF_ALL_PENTS);
/**
 * Generate the whole rectangle given the number of rows.
 *
 * @param {Integer} size Number of rows in this set of rectangles
 * @return {Array} empty rectangle with the correct size
 */
const addOneRect = (size) => setXOneRect(
    new Array(size).fill(size).map(
        (sizeparm) => new Array(SIZE_OF_ALL_PENTS / sizeparm).fill(".")
    )
);

/**
 * Remove the X-pentomino in the highest lefmost location (invalid because
 * if leaves one tile that will nont get filled in).
 *
 * @param {Array} rect Rectangle to be filled
 * @return {Array} list of all valid rectangles
 */
const setXOneRect = (rect) => setXcenters(rect).map(
    (indvRect) => rectSetX(
        rect,
        indvRect
    )
).filter((drect, indx) => indx !== 0 || drect === "");

/**
 * @param {Array} rect Rectangle
 * @param {Array} center Location of the center of the X-pentomino
 * @return {Array} Rectangle with X-pentomino filled in
 */
const rectSetX = (rect, center) => rect.map((indvRect, indx) => indvRect.map(
    (emptyInd, indx2) => setXvalInRect(indx, indx2, center, emptyInd)
));

/**
 * Do the actual tile setting of the non-centerX-pentomino squares.
 *
 * @param {Integer} indx Row number
 * @param {Integer} indx2 Column number
 * @param {Array} center Center Location
 * @param {character} emptyInd Empty square indicator
 * @return {character} X if pentomino location
 */
const setXvalInRect = (indx, indx2, center, emptyInd) => (
    ((Math.abs(indx - center[0]) <= 1 && indx2 === center[1]) || (
        (indx === center[0]) && (Math.abs(indx2 - center[1]) <= 1)
    ))
    ? "X"
    : emptyInd
);

/**
 * Find the centers of all X locations
 *
 * @param {Array} rect Retangle being filed
 * @return {Array} center points of where the X-pentomino will go
 */
const setXcenters = (rect) => loopXforRow(
    genRange(rect[0].length),
    genRange(rect.length)
);

/**
 * generate the range of squares for the X-center point  These will be
 * in the upper left quadrant of the rectangle.
 *
 * @param {Integer} numb dimension of rectangle
 * @return {Integer} highest index along this side that remains in the uppper
 *   left quadrant
 */
const genRange = (numb) => pentUtils.rangeNum(Math.floor((numb - 1) / 2), 1);

/**
 * Generate list of points for possible row values
 *
 * @param {Integer} rowDim Row dimension
 * @param {Integer} colDim Col dimension
 * @return {Array} list of row values that are valid
 */
const loopXforRow = (rowDim, colDim) => rowDim.map(
    (localIndex) => loopXforCol(localIndex)(colDim)
).flat(1);

/**
 * Generate list of points for possible column values
 *
 * @param {Integer} rowDim Row dimension
 * @param {Integer} colDim Col dimension
 * @param {Array} list of X-pentomino center points
 */
const loopXforCol = (rowDim) => (colDim) => colDim.map(
    (localIndex) => [localIndex, rowDim]
);

exports.solverGetRectsWithX = solverGetRectsWithX;
