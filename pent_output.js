/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Pentomino output file
 *
 * Routines to make data nicer for output.
 */
var exports;
/**
 * Convert Array representing a pentomino solution into a string.
 *
 * @param {Array} board Two dimensional board representation
 * @return {String} displayable string representation
 */
const pentToString = (board) => board.reduce(rowToString, "").concat("\n");

/**
 * Convert a row of the pentomino solution Array into a string
 *
 * @param {Array} pSoFar Solution so far
 * @param {Array} pNext Next row of data
 * @return {String} String representation of data so far
 */
const rowToString = (pSoFar, pNext) => pSoFar.concat(
    pNext.join("").concat("\n")
);

exports.pentToString = pentToString;
