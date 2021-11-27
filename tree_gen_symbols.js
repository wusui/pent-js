/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

/**
 * Generate pentomino symbols 
 *
 * Given a pentomino tree, extract pentomino figure numbers and assign
 * a corresponding symbol to each
 */
const pentUtils = require('./pent_utils');

/**
 * For all nodes in a tree, add a symbol property if needed
 *
 * @param {Array} t Tree
 * @return {Array} Updated tree
 */
const generateTreeWithSymbols = t => addSymbolProp(symbolEntries(t))(t);

/**
 * For a node in the tree, add a symbol property if needed.
 *
 * @param {Object} tbl getFigTable data
 * @return {Object} updated node
 */
const addSymbolProp = tbl => x => x.map(y => y.hasOwnProperty('pentomino') ?
  ({...y, symbol: tbl[y.pentomino]}) : y);

/**
 * Construct a table of symbols indexed by pentomino number
 *
 * @param {Array} t Tree
 * @return {Object} Object containing pentomino number to symbol associations
 */
const symbolEntries = t => Object.fromEntries(new Map(pentUtils.zip(
  Object.keys(getFigTable(t)), 'FPXNVTYWZLUI')));

/**
 * Construct a table of counts indexed by pentomino number.  Used for
 * visual checks.  Index list is used to construct symbolEntries map.
 *
 * @param {Array} t tree
 * @return {Array} List of symbolEntries
 */
const getFigTable = t => getFigInfo(t).reduce((map, pent) => ({...map, [pent]:
    (map[pent] || 0) + 1}), {});

/**
 * Get all pentomino properties in all tree nodes
 *
 * @param {Array} x tree
 * @return {Array} List of pentomino numers
 */
const getFigInfo = t => t.filter(x => x.hasOwnProperty('pentomino')).map(
        x => x.pentomino);

exports.generateTreeWithSymbols = generateTreeWithSymbols
