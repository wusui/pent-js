/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Find the next starting square when filling a rectangle with pentominos
 */

/**
 * Scan for next starting square
 *
 * @param {Array} rect Rectangle to be filled
 * @return {Array} [Row, Column] coordinates of first empty square
 */
const findNextStartSq = (rect) => findBestRowWrap(findFirstEmptyPerRow(rect));

/**
 * Find first blank spot in each row.
 *
 * @param {Array} rect Rectangle to be filled
 * @return {Array} list of first empty spot in each row (100 if none).
 */
const findFirstEmptyPerRow = (rect) => rect.map((row) => row.findIndex(
    (col) => col === '.'
)).map((zpoint) => (
    zpoint < 0 ?
    100 :
    zpoint
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
 * @param {Integer} rowCol Lowest column value found
 * @return {Array} [Row, Column] coordinates of first empty square
 */
const findRowWithBestColValue = (rowData, rowCol) => [rowData.findIndex(
    (colIndx) => colIndx === rowCol
), rowCol];

exports.findNextStartSq = findNextStartSq;
