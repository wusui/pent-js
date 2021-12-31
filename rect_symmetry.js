/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * If, due to the location of the X-pentomino, there is symmetry possible
 * by rotating along an axis where the rectangle size is odd, then make sure
 * the W-pentomino is on one side only.
 */
var exports;

/**
 * Return true if there is symmetry along one axis and the W-pentomino is
 * in the top/left half.
 *
 * @param {Array} board Rectangle being filled
 * @return {Boolean} True if symmetric and W-pentomino is filled in early
 */
const checkSym = (board) => doSymChecks(alignBoard(board))();

/**
 * Return true if X-pentomino location causes symmetry and the W-pentomino
 * is placed in the first half.
 *
 * @param {Array} board Rectangle being filled
 * @return {boolean} True if X-pentomino aligns along the middle row or rotated
 *         column, and the W-pentomino is mostly in the first half
 *         (top or left side) of the rectangle.
 */
const doSymChecks = (board) => () => findCenter(board) && wChecker(board);

/**
 * Test if row dimension is odd.  If so, "flip" the board.
 *
 * @param {Array} board Rectangle being filled
 * @return {Array} Board layout with x axis and y axis reversed, if needed
 */
const alignBoard = (board) => (
    board[0].length % 2 === 1
    ? flipBoard(board)
    : board
);

/**
 * Actually flip the board
 *
 * @param {Array} board Rectangle being filled
 * @return {Array} New board layout with x axis and y axis reversed.
 */
const flipBoard = (board) => board.reduce((prev, next) => next.map(
    (item, indx) => wrapPrevLine(indx, prev).concat(item)
), []);

/*
 * Extract prev item or new Array if not available
 *
 * @param {Integer} indx Line index
 * @param {Array} prev Previous line information
 * @return {Array} List of lines with new line added.
 */
const wrapPrevLine = (indx, prev) => prev[indx] || [];

/**
 * Return True if the number of rows are odd and the X-pentomino lines up
 * on the middle row
 *
 * @param {Array} board Rectangle being filled
 * @return {Boolean} Symmetry condition exists.
 */
const findCenter = (board) => (
    board.length % 2 === 0
    ? false
    : checkCenter(board, middleRowNumb(board))
);

/**
 * Return the row number of the middle row
 *
 * @param {Array} board Rectangle being filled
 * @return {Integer} row number
 */
const middleRowNumb = (board) => (board.length - 1) / 2;

/**
 * Test if X-pentomino's center lines up on the row specified
 *
 * @param {Array} board Rectangle being filled
 * @param {Integer} row Row number (the center row)
 * @return {Boolean} True if the middle of the X-pentomino is in this row
 */
const checkCenter = (board, row) => board[row].filter(
    (xchar) => xchar === "X"
).length === 3;

/**
 * Check the W-pentomino location
 *
 * @param {Array} board Rectangle being filled
 * @return {Boolean} True if at least two squares of the W-pentomino lie
 *         in the first half of the rectangle layout.
 */
const wChecker = (board) => board.slice(
    0,
    middleRowNumb(board)
).flat(1).filter(
    (wchar) => wchar === "W"
).length >= 2;

exports.checkSym = checkSym;
