/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */
var require;
var exports;
/**
 * Tree pentomino module
 *
 * Add pentomino values to the leaf nodes of the tree
 */
const pentUtils = require("./pent_utils");

/**
 * Add pentomino property to each node in the tree that has a figure value.
 *
 * @param {Array} p Existing Tree
 * @return {Array} Tree with pentomino value set in appropriate nodes
 */
const setPentominos = (p) => p.map((x) => (
    x.hasOwnProperty("figure")
    ? pentUtils.putInNewProp(x, "pentomino", Math.min(
        ...getPentNumbers(x).flat(10)
    ))
    : x
));

/**
 * Find all figure values for pentominos that are rotations of the pentomino
 * generated from this node.
 *
 * @param {Array} x node in tree
 * @return {Array} nested Arrays of all pentomino orientations for this node
 */
const getPentNumbers = (x) => wrapAllOrientations(0, getPts(x));

/**
 * There are eight possible orientation for a chirally asymetric figure:
 * Two orientations along the x-axis, times two orientations along the y-axis,
 * times two orientations along a diagonal (flipping both ways).  Compute
 * figure value for all eight.
 *
 * @param {Integer} n representation of one of the eight orientations
 * @param {Array} x list of points
 * @return {Array} nested Arrays of all pentomino orientations for this node
 */
const wrapAllOrientations = (n, x) => (
    n > 7
    ? Math.pow(2, 23)
    : [expandAnOrientation(n, x), wrapAllOrientations(n + 1, x)]
);

/**
 * Wrapper to do diagonal flipping if needed.
 *
 * @param {Integer} n representation of one of the eight orientations
 * @param {Array} x list of points
 * @return {Integer} pentomino value corresponding to x rotated using the
 *    the nth rotation method.
 */
const expandAnOrientation = (n, x) => wrapFurtherRotations(n % 4)(
    n >= 4
    ? flipDiagonally(x)
    : x
);

/**
 * Wrapper to do orientations beyond diagonal flipping if needed.
 *
 * @param {Integer} n representation of one of the eight orientations
 * @param {Array} x list of points
 * @return {Integer} pentomino value corresponding to x rotated using the
 *    the nth rotation method.
 */
const wrapFurtherRotations = (n) => (x) => wrapLaterShift(
    findHorizontalShift(flipColumns(n, flipRows(n, x)))
);

/**
 * Reorient figure diagonally (swap x and y axis).
 *
 * @param {Array} x list of points
 * @return {Array} reoriented list of points
 */
const flipDiagonally = (x) => x.map((y) => ({col: y.row, row: y.col}));

/**
 * Flip figure vertically
 *
 * @param {Integer} n orientation representation
 * @return {Array} reoriented list of points
 */
const flipColumns = (n, x) => (
    n > 1
    ? x.map((y) => ({col: 0 - y.col, row: y.row}))
    : x
);

/**
 * Flip figure horizontally
 *
 * @param {Integer} n orientation representation
 * @return {Array} reoriented list of points
 */
const flipRows = (n, x) => (
    n % 2 === 0
    ? x.map((y) => ({col: y.col, row: 0 - y.row}))
    : x
);

/**
 * Figure out how far we need to shift the column to line up left side
 * of pentomino after a reorientation was performed.
 *
 * @param {Array} x list of points
 * @return {Integer} horizontal offset for all points
 */
const findHorizontalShift = (x) => doHorizontalShift(Math.min(
    ...x.map((y) => y.col)
))(x);

/**
 * Shift column so that minimum column number is 0.
 *
 * @param {Integer} m number to shift
 * @param {Array} x points to shift
 * @return {Array} points in x aligned with leftmost columnn being 0.
 */
const doHorizontalShift = (m) => (x) => x.map(
    (y) => ({col: y.col - m, row: y.row})
);

/**
 * Get Pentomino number by removing the origin and performing last
 * adjustment (Shifting the rows to line up).
 *
 * @param {Array} x points to shift
 * @return {Integer} figure value
 */
const wrapLaterShift = (x) => reduceToPentNumb(removeOrigin(
    wrapVerticalShift(x)
));

/**
 * Call vertical shifting routines.
 *
 * @param {Array} x points to shift
 * @return {Integer} figure value
 */
const wrapVerticalShift = (x) => doVerticalShift(Math.min(
    ...findVerticalShift(x)
))(x);

/**
 * Figure out how far we need to shift the row to line up the top
 * of pentomino after a reorientation was performed.
 *
 * @param {Array} x list of points
 * @return {Integer} vertical offset for all points
 */
const findVerticalShift = (x) => x.filter((z) => z.col === 0).map(
    (y) => y.row
);

/**
 * Shift rows so that for column 0 the minimum row number is 0.
 *
 * @param {Integer} m number to shift
 * @param {Array} x points to shift
 * @return {Array} points in x aligned with topmost point in column 0 is
 *     row 0.
 */
const doVerticalShift = (m) => (x) => x.map(
    (y) => ({col: y.col, row: y.row - m})
);

/**
 * Given a list of points, remove (0,0) from the list.
 *
 * @param {Array} q List of points
 * @return {Array} q without the (0,0) entry
 */
const removeOrigin = (q) => q.filter((x) => x.row !== 0 || x.col !== 0);

/**
 * Given a set of points, calculate the figure value (used to get
 * pentomino values).
 *
 * @param {Array} q List of points
 * @return {Integer} corresponding figure value
 */
const reduceToPentNumb = (q) => q.map(
    (x) => Math.pow(2, pentUtils.evalNumb(x))
).reduce((a, b) => a + b, 0);

/**
 * Get a list of points on the path of the figure
 *
 * @param {Array} x Node on the tree
 * @return {Array} list of points in the figure
 */
const getPts = (x) => convNumsToPts(
    getRawNumbs(x)
).concat({"col": 0, "row": 0});

/**
 * Extract the grid numbers of points from the point pair list
 *
 * @param {Array} x Node in the tree
 * @return {Array} List of grid numbers
 */
const getRawNumbs = (x) => getRawPtPairs(x).filter(
    (y) => y[0] === 1
).map((z) => z[1]);

/**
 * Return an Array of point pairs.  Each pair contains a 1 as the first
 * value if it is a point in the figure.  The seccond value is the number
 * of the figure in the grid (ranging from 1 to 20).
 *
 * @param {Array} x Node in the tree (we are using the figure value).
 * @return {Array} Array of point pairs
 */
const getRawPtPairs = (x) => getRawPoints(getRawLocations(x.figure).flat(25));

/**
 * Given a figure number decompose it into bits used to represent the pointss
 * in the figure.
 *
 * @param {Integer} x Figure number
 * @return {Array} nested array of bits indicating if a number is in the
 *     figure (1 if it is, 0 if it is not).
 */
const getRawLocations = (x) => (
    x === 0
    ? 0
    : [x % 2, getRawLocations(Math.floor(x / 2))]
);

/**
 * Return an Array of point pairs
 *
 * @param {Array} x List of points
 * @return {Array} Array of point pairs
 */
const getRawPoints = (x) => x.map((y, indx) => [y, indx + 1]);

/**
 * Convert a list of point numbers to the corresponding points.
 *
 * @param {Array} x List of points to be fed to convNumToPt
 * @return {Array} List of corresponding points
 */
const convNumsToPts = (x) => x.map((y) => convNumToPt(
    Math.floor(Math.sqrt(y))
)(y));

/**
 * Given a point number (the second value) of a point pair, return the
 * corresponding point
 *
 * @param {Integer} r Number used by conversion routine to get in neighborhood
 *     of the point
 * @param {Integer} x Point number
 * @return {Array} point (in row: col: form)
 */
const convNumToPt = (r) => (x) => (
    x > (r * r + r)
    ? getFPoint(x, r + 1)
    : getFPoint(x, r)
);

/**
 * First step of point calculation
 *
 * @param {Integer} x point number
 * @param {Integer} r intermediate number derived from r value in convNumToPt
 * @return {Array} point (in row: col: form)
 */
const getFPoint = (x, r) => getFcol(x - (r * r))(r);

/**
 * Last step of point calculation to get column set correctly
 *
 * @param {Integer} rw Row number
 * @param {Integer} x Intermediate number used to calculate the point value
 * @return {Array} point object (in row: col: form)
 */
const getFcol = (rw) => (x) => ({"col": x - Math.abs(rw), "row": rw});

exports.setPentominos = setPentominos;
