/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Pentomino output file
 *
 * Routines to make data nicer for output.
 */

/**
 * Convert Array representing a pentomino solution into a string.
 * 
 * @param {Array} x Two dimensional board representation
 * @return {String} displayable string representation
 */
exports.pentToString = x => ''.concat(x.reduce(rowToString, '')).concat('\n');

/**
 * Convert a row of the pentomino solution Array into a string
 * 
 * @param {Array} p1 Solution so far
 * @param {Array} p2 Next row of data
 * @return {String} String representation of data so far
 */
const rowToString = (p1, p2) => p1.concat(p2.join('').concat('\n'));
