/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Find the next starting square when filling a rectangle with pentominos
 */
var exports;

/**
 * Scan for next starting square
 *
 * @param {Array} x Rectangle to be filled
 * @return {Array} [Row, Column] coordinates of first empty square
 */
const findNextStartSq = (x) => findBestRowWrap(findFirstEmptyPerRow(x));

/**
 * Find first blank spot in each row.
 *
 * @param {Array} rect Rectangle to be filled
 * @return {Array} list of first empty spot in each row (100 if none).
 */
const findFirstEmptyPerRow = (rect) => rect.map((x) => x.findIndex(
    (y) => y === "."
)).map((z) => (
    z < 0
    ? 100
    : z
));

/**
 * Get the best column value and pass it to findRowWithBestColValue
 *
 * @param {Array} rowData First open square in each row
 * @return {Array} [Row, Column] coordinates of first empty square
 */
const findBestRowWrap = (rowData) => findRowWithBestColValue(
    rowData,
    Math.min(...rowData)
);

/**
 * Scan rows for first row with best column value
 *
 * @param {Array} rowData First open square in each row
 * @param {Integer} Lowest column value found
 * @return {Array} [Row, Column] coordinates of first empty square
 */
const findRowWithBestColValue = (rowData, rowCol) => [rowData.findIndex(
    (y) => y === rowCol
), rowCol];

exports.findNextStartSq = findNextStartSq;
