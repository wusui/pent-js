/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
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
 * @param {Array} nTree Tree
 * @return {Array} Updated tree
 */
const generateTreeWithSymbols = (nTree) => addSymbolProp(
    symbolEntries(nTree)
)(nTree);

const PENTOMINO = 'pentomino';
Object.freeze(PENTOMINO);
/**
 * For a node in the tree, add a symbol property if needed.
 *
 * @param {Object} tbl getFigTable data
 * @param {Array} nTree tree image
 * @return {Object} updated node
 */
const addSymbolProp = (tbl) => (nTree) => nTree.map((node) => (
    node.hasOwnProperty(PENTOMINO) ?
    pentUtils.putInNewProp(node, 'symbol', tbl[node.pentomino]) :
    node
));

const PENT_SYMBOLS = 'FPXNVTYWZLUI';
Object.freeze(PENT_SYMBOLS);
/**
 * Construct a table of symbols indexed by pentomino number
 *
 * @param {Array} nTree Tree
 * @return {Object} Object containing pentomino number to symbol associations
 */
const symbolEntries = (nTree) => Object.fromEntries(new Map(pentUtils.zip(
    Object.keys(getFigTable(nTree)),
    PENT_SYMBOLS
)));

/**
 * Construct a table of counts indexed by pentomino number.  Used for
 * visual checks.  Index list is used to construct symbolEntries map.
 *
 * @param {Array} nTree tree
 * @return {Array} List of symbolEntries
 */
const getFigTable = (nTree) => getFigInfo(nTree).reduce(
    (pmap, pent) => pentUtils.putInNewProp(
        pmap,
        [pent],
        (pmap[pent] || 0) + 1
    ),
    {}
);

/**
 * Get all pentomino properties in all tree nodes
 *
 * @param {Array} nTree tree image
 * @return {Array} List of pentomino numbers
 */
const getFigInfo = (nTree) => nTree.filter(
    (node) => node.hasOwnProperty(PENTOMINO)
).map((nodeProp) => nodeProp.pentomino);

exports.generateTreeWithSymbols = generateTreeWithSymbols;
