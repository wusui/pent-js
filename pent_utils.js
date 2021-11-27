/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

/**
 * Util Module
 *
 * Catch-all taxon for functions that are used by the rest of the code
 * in MOPFPPP.
 */

/**
 * zip two Arrays. zip([a,b,c], [d,e,f]) becomes [[a,d], [b,e], [c,f]].
 *
 * @param {Array} a First Array
 * @param {Array} b Second Array
 * @return {Array} zipped array of a and b values
 */
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

/**
 * Get Integer Id for this point
 *
 * @param {point} point Point for which we will find a unique Integer value 
 * @return {Integer} uniqe id for this point
 */
const evalNumb = point => evalNumb2(Math.abs(point.row) +
  Math.abs(point.col))(point.row);

/**
 * Calculate unique id for point
 *
 * @param {Integer} sumv Distance a point is from the root (0,0)
 * @param {Integer} rowv Row.  When used as a parameter to this function,
 *         in coordination with sumv we can generate a unique number.
 * @return {Integer} uniqe id for this point
 */
const evalNumb2 = sumv => rowv => [0, 0, 2, 6, 12][sumv] + rowv -
  [0, 0, -1, -2, -3][sumv];

exports.zip = zip;
exports.evalNumb = evalNumb;
