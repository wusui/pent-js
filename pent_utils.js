/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Util Module
 *
 * Catch-all module for functions that are used by the rest of the code
 * in MOPFPPP.
 */

/**
 * zip two Arrays. zip([a,b,c], [d,e,f]) becomes [[a,d], [b,e], [c,f]].
 *
 * @param {Array} array1 First Array
 * @param {Array} array2 Second Array
 * @return {Array} zipped array of a and b values
 */
const zip = (array1, array2) => array1.map(
    (keyval, indexval) => [keyval, array2[indexval]]
);

/**
 * Get Integer Id for this point
 *
 * @param {point} point Point for which we will find a unique Integer value
 * @return {Integer} unique id for this point
 */
const evalNumb = (point) => evalNumb2(
    Math.abs(point.row) + Math.abs(point.col)
)(point.row);

/**
 * Generate a range of Integers with the length (size) and starting point
 * specified
 *
 * @param {Integer} size Length of range generated
 * @param {Integer} start Lowest number in range
 * @return {Array} Array of numbers from start to start + size - 1;
 */
const rangeNum = (size, start) => [...new Array(size).keys()].map(
    (keyval) => keyval + start
);

const HORIZONTAL_OFFSETS = [0, 0, 2, 6, 12];
Object.freeze(HORIZONTAL_OFFSETS);
const VERTICAL_OFFSETS = [0, 0, 1, 2, 3];
Object.freeze(VERTICAL_OFFSETS);

/**
 * Calculate unique id for point
 *
 * @param {Integer} sumv Distance a point is from the root (0,0)
 * @param {Integer} rowv Row.  When used as a parameter to this function,
 *         in coordination with sumv we can generate a unique number.
 * @return {Integer} uniqe id for this point
 */
const evalNumb2 = (sumv) => (rowv) => (
  HORIZONTAL_OFFSETS[sumv] + rowv + VERTICAL_OFFSETS[sumv]
);

/**
 * Create a new object with an extra property added
 *
 * @param {Object} oldobj Original object
 * @param {String} attr Name of property to be added
 * @param {String} value Value of property to be added
 * @return {Object} new object
 */
const putInNewProp = (oldobj, attr, value) => Object.fromEntries(
    Object.getOwnPropertyNames(oldobj).map(
        (propName) => [propName, oldobj[propName]]
    ).concat([[attr, value]])
);

exports.zip = zip;
exports.evalNumb = evalNumb;
exports.rangeNum = rangeNum;
exports.putInNewProp = putInNewProp;
