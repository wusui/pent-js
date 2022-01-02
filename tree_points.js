/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Point Module
 *
 * A point is an object that represents a location on a grid.  It consists of
 * row, an integer x-axis coordinate, and col, an integer y-axis coordinate.
 */

/**
 * Compare two points.  Points are considered the same if their corresponding
 * row values and col values are equal.
 *
 * @param {point} point1 First point
 * @param {point} point2 Second point
 * @return {Boolean} true if x and y are the same, false otherwise
 */
const compPoints = (point1) => (point2) => (
  point1.row === point2.row && point1.col === point2.col
);

/**
 * Given a point, list all valid neighboring points on the grid.
 *
 * @param {point} point Point
 * @return {Array} List of valid points next to point.
 */
const getNextPoints = (point) => getNeighbors(point).filter(isValidLocation);

/**
 * Given a point, list location of all possible neighboring points on the
 *         grid (points immediately above, below, left, and right).
 *
 * @param {point} point Point
 * @return {Array} List of points next to point.
 */
const getNeighbors = (point) => [
  {col: point.col + 1, row: point.row},
  {col: point.col - 1, row: point.row},
  {col: point.col, row: point.row + 1},
  {col: point.col, row: point.row - 1}
];

/**
 * Test if a point is a valid location.  Scanning will be done left to right,
 * top to bottom, so a point is not valid if the col value is negative
 * (too far to the left), or if the col value is 0 and then row value
 * is negative (too high).
 *
 * @param {point} point Point
 * @return {Boolean} true if point is valid, false if not
 */
const isValidLocation = (point) => point.col >= 0 && (
  point.row >= 0 || point.col > 0
);

exports.compPoints = compPoints;
exports.getNextPoints = getNextPoints;
