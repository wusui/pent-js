/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Tree pentomino module
 *
 * Add pentomino values to the leaf nodes of the tree
 */
const pentUtils = require('./pent_utils');

/**
 * Add pentomino property to each node in the tree that has a figure value.
 *
 * @param {Array} pTree Existing Tree
 * @return {Array} Tree with pentomino value set in appropriate nodes
 */
const setPentominos = (pTree) => pTree.map((xNode) => (
    xNode.hasOwnProperty('figure') ?
    pentUtils.putInNewProp(xNode, 'pentomino', Math.min(
        ...getPentNumbers(xNode).flat(10)
    )) :
    xNode
));

/**
 * Find all figure values for pentominos that are rotations of the pentomino
 * generated from this node.
 *
 * @param {Array} xNode node in tree
 * @return {Array} nested Arrays of all pentomino orientations for this node
 */
const getPentNumbers = (xNode) => wrapAllOrientations(0, getPts(xNode));

/**
 * There are eight possible orientation for a chirally asymetric figure:
 * Two orientations along the x-axis, times two orientations along the y-axis,
 * times two orientations along a diagonal (flipping both ways).  Compute
 * figure value for all eight.
 *
 * @param {Integer} oNumb representation of one of the eight orientations
 * @param {Array} xPoints list of points
 * @return {Array} nested Arrays of all pentomino orientations for this node
 */
const wrapAllOrientations = (oNumb, xPoints) => (
    oNumb > 7 ? Math.pow(2, 23) :
    [
      expandAnOrientation(oNumb, xPoints),
      wrapAllOrientations(oNumb + 1, xPoints)
    ]
);

/**
 * Wrapper to do diagonal flipping if needed.
 *
 * @param {Integer} oNumb representation of one of the eight orientations
 * @param {Array} xPoints list of points
 * @return {Integer} pentomino value corresponding to x rotated using the
 *    the nth rotation method.
 */
const expandAnOrientation = (oNumb, xPoints) => wrapFurtherRotations(
    oNumb % 4
)(
    oNumb >= 4 ?
    flipDiagonally(xPoints) :
    xPoints
);

/**
 * Wrapper to do orientations beyond diagonal flipping if needed.
 *
 * @param {Integer} oNumb representation of one of the eight orientations
 * @param {Array} xPoints list of points
 * @return {Integer} pentomino value corresponding to x rotated using the
 *    the nth rotation method.
 */
const wrapFurtherRotations = (oNumb) => (xPoints) => wrapLaterShift(
    findHorizontalShift(flipColumns(oNumb, flipRows(oNumb, xPoints)))
);

/**
 * Reorient figure diagonally (swap x and y axis).
 *
 * @param {Array} xaxis list of points
 * @return {Array} reoriented list of points
 */
const flipDiagonally = (xaxis) => xaxis.map(
    (yaxis) => ({col: yaxis.row, row: yaxis.col})
);

/**
 * Flip figure vertically
 *
 * @param {Integer} oNumb orientation representation
 * @param {Array} xPoints list of points
 * @return {Array} reoriented list of points
 */
const flipColumns = (oNumb, xPoints) => (
    oNumb > 1 ?
    xPoints.map((point) => ({col: 0 - point.col, row: point.row})) :
    xPoints
);

/**
 * Flip figure horizontally
 *
 * @param {Integer} oNumb orientation representation
 * @param {Array} xPoints list of points
 * @return {Array} reoriented list of points
 */
const flipRows = (oNumb, xPoints) => (
    oNumb % 2 === 0 ?
    xPoints.map((point) => ({col: point.col, row: 0 - point.row})) :
    xPoints
);

/**
 * Figure out how far we need to shift the column to line up left side
 * of pentomino after a reorientation was performed.
 *
 * @param {Array} xPoints list of points
 * @return {Integer} horizontal offset for all points
 */
const findHorizontalShift = (xPoints) => doHorizontalShift(Math.min(
    ...xPoints.map((yPoints) => yPoints.col)
))(xPoints);

/**
 * Shift column so that minimum column number is 0.
 *
 * @param {Integer} shifth number to shift
 * @param {Array} x points to shift
 * @return {Array} points in x aligned with leftmost columnn being 0.
 */
const doHorizontalShift = (shifth) => (xPoint) => xPoint.map(
    (yPoint) => ({col: yPoint.col - shifth, row: yPoint.row})
);

/**
 * Get Pentomino number by removing the origin and performing last
 * adjustment (Shifting the rows to line up).
 *
 * @param {Array} xPoint points to shift
 * @return {Integer} figure value
 */
const wrapLaterShift = (xPoint) => reduceToPentNumb(removeOrigin(
    wrapVerticalShift(xPoint)
));

/**
 * Call vertical shifting routines.
 *
 * @param {Array} xPoint points to shift
 * @return {Integer} figure value
 */
const wrapVerticalShift = (xPoint) => doVerticalShift(Math.min(
    ...findVerticalShift(xPoint)
))(xPoint);

/**
 * Figure out how far we need to shift the row to line up the top
 * of pentomino after a reorientation was performed.
 *
 * @param {Array} xPoint list of points
 * @return {Integer} vertical offset for all points
 */
const findVerticalShift = (xPoint) => xPoint.filter(
    (zPoint) => zPoint.col === 0
).map(
    (yPoint) => yPoint.row
);

/**
 * Shift rows so that for column 0 the minimum row number is 0.
 *
 * @param {Integer} shiftv number to shift
 * @param {Array} xPoint points to shift
 * @return {Array} points aligned with topmost point in column 0 is
 *     row 0.
 */
const doVerticalShift = (shiftv) => (xPoint) => xPoint.map(
    (yPoint) => ({col: yPoint.col, row: yPoint.row - shiftv})
);

/**
 * Given a list of points, remove (0,0) from the list.
 *
 * @param {Array} pList List of points
 * @return {Array} q without the (0,0) entry
 */
const removeOrigin = (pList) => pList.filter(
    (xPoint) => xPoint.row !== 0 || xPoint.col !== 0
);

/**
 * Given a set of points, calculate the figure value (used to get
 * pentomino values).
 *
 * @param {Array} pList List of points
 * @return {Integer} corresponding figure value
 */
const reduceToPentNumb = (pList) => pList.map(
    (xPoint) => Math.pow(2, pentUtils.evalNumb(xPoint))
).reduce((accum, bpoint) => accum + bpoint, 0);

/**
 * Get a list of points on the path of the figure
 *
 * @param {Array} xNode Node on the tree
 * @return {Array} list of points in the figure
 */
const getPts = (xNode) => convNumsToPts(
    getRawNumbs(xNode)
).concat({'col': 0, 'row': 0});

/**
 * Extract the grid numbers of points from the point pair list
 *
 * @param {Array} xNode Node in the tree
 * @return {Array} List of grid numbers
 */
const getRawNumbs = (xNode) => getRawPtPairs(xNode).filter(
    (xfield) => xfield[0] === 1
).map((nfield) => nfield[1]);

/**
 * Return an Array of point pairs.  Each pair contains a 1 as the first
 * value if it is a point in the figure.  The seccond value is the number
 * of the figure in the grid (ranging from 1 to 20).
 *
 * @param {Array} xNode Node in the tree (we are using the figure value).
 * @return {Array} Array of point pairs
 */
const getRawPtPairs = (xNode) => getRawPoints(
    getRawLocations(xNode.figure).flat(25)
);

/**
 * Given a figure number decompose it into bits used to represent the pointss
 * in the figure.
 *
 * @param {Integer} xFigN Figure number
 * @return {Array} nested array of bits indicating if a number is in the
 *     figure (1 if it is, 0 if it is not).
 */
const getRawLocations = (xFigN) => (
    xFigN === 0 ?
    0 :
    [xFigN % 2, getRawLocations(Math.floor(xFigN / 2))]
);

/**
 * Return an Array of point pairs
 *
 * @param {Array} xPoints List of points
 * @return {Array} Array of point pairs
 */
const getRawPoints = (xPoints) => xPoints.map(
    (yPoints, indx) => [yPoints, indx + 1]
);

/**
 * Convert a list of point numbers to the corresponding points.
 *
 * @param {Array} xPoints List of points to be fed to convNumToPt
 * @return {Array} List of corresponding points
 */
const convNumsToPts = (xPoints) => xPoints.map(
    (yPoint) => convNumToPt(Math.floor(Math.sqrt(yPoint)))(yPoint)
);

/**
 * Given a point number (the second value) of a point pair, return the
 * corresponding point
 *
 * @param {Integer} rLoc Number used by conversion routine to get in
 *     neighborhood of the point
 * @param {Integer} xPoint Point number
 * @return {Array} point (in row: col: form)
 */
const convNumToPt = (rLoc) => (xPoint) => (
    xPoint > (rLoc * rLoc + rLoc) ?
    getFPoint(xPoint, rLoc + 1) :
    getFPoint(xPoint, rLoc)
);

/**
 * First step of point calculation
 *
 * @param {Integer} xPoint point number
 * @param {Integer} rLoc intermediate number derived from rLoc value
 *                  in convNumToPt
 * @return {Array} point (in row: col: form)
 */
const getFPoint = (xPoint, rLoc) => getFcol(xPoint - (rLoc * rLoc))(rLoc);

/**
 * Last step of point calculation to get column set correctly
 *
 * @param {Integer} rowN Row number
 * @param {Integer} x Intermediate number used to calculate the point value
 * @return {Array} point object (in row: col: form)
 */
const getFcol = (rowN) => (xPoint) => (
  {'col': xPoint - Math.abs(rowN), 'row': rowN}
);

exports.setPentominos = setPentominos;
