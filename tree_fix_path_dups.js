/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */
var require;
var exports;
const pUtils = require("./pent_utils");

/**
 * Curry the index of the first duplicate entry found and call
 * curryFirstDupAndRepeat
 *
 * @param {Array} nodeList List of nodes
 * @return {Integer} Index of duplicate entry
 */
const rmDupPaths = (nodeList) => curryFirstDupAndRepeat(
    firstDupFound(nodeList)
)(nodeList);

/**
 * Remove the entry corresponding to the duplicate node entry and
 * recursively call rmDupPaths with a shorter Array of nodes.  Terminate
 * if no more duplicate node entries are found.
 *
 * @param {Array} dupInd Index of duplicate node
 * @param {Array} nodeList List of new nodes
 */
const curryFirstDupAndRepeat = (dupInd) => (nodeList) => (
    dupInd < 0
    ? nodeList
    : exports.rmDupPaths(removeDups(addDupLabel(dupInd)(nodeList)))
);

/**
 * Use zipped file from alignSetFindDups to find the first figure value
 * that is the same as a previous figure value.
 *
 * @param {Array} nodeList List of new nodes
 * @return {Array} List of Boolean values where the first false value
 *         indicates that the corresponding entry is a duplicate
 */
const firstDupFound = (nodeList) => alignSetFindDups(
    nodeList.map((node) => node.figure)
).map((zpoint) => zpoint[0] === zpoint[1]).indexOf(false);

/**
 * Return a zipped list where an Array of figure values is zipped with
 * a Set of figure values.  Used to find first duplicate figure value
 * that occurs.
 *
 * @param {Array} figs Array of figure values
 * @return {Array} figs Array zipped with Set(f).
 */
const alignSetFindDups = (figs) => pUtils.zip(figs, Array.from(new Set(figs)));

const IAMADUP = "iamadup";
Object.freeze(IAMADUP);
/**
 * Add iamadup property to the first entry in the new node list that
 *
 * @param Integer dup_node node index that is being searched for
 * @param Array nodeList List of nodes to be searched
 * @return List of nodes with iamdup property added to nodes with duplicate
 *         values of figure.
 */
const addDupLabel = (dupNode) => (nodeList) => nodeList.map(
    (node, indx) => (
        indx === dupNode
        ? pUtils.putInNewProp(node, IAMADUP, 0)
        : node
    )
);

/**
 * Remove entries that have the iamadup property.
 *
 * @param {Array} nodeList list of new nodes to be added
 * @return {Array} same list with entries removed that have the
 *         iamadup property
 */

const removeDups = (nodeList) => nodeList.filter(
    (node) => !node.hasOwnProperty(IAMADUP)
);

exports.rmDupPaths = rmDupPaths;
