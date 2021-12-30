/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */
var require;
var exports;

/**
 * Add the next tier onto the tree (The tree contains n tile figures after
 * the nth tile is added)
 */
const pentUtils = require("./pent_utils");

/**
 * Generate the next tier on  the tree
 *
 * @param {Array} tree Existing tree
 * @return {Array} updated tree with nodes of the next tier added
 */
const genNextTier = (tree) => newNextTierNodes(
    makeNextTier(getNewLeafInfo(findNewNodes(tree)))
);

/**
 * Collects data from offspring property (Array of offspring.point values
 * and Array of offspring.index values).
 *
 * @param {Array} tree Existing tree
 * @return {Array} point and index values of offspring
 */
const getNewLeafInfo = (tree) => [tree.map(
    (x) => x.offspring.points
), tree.map((x) => x.offspring.index)];

/**
 * Map tier information into tree node information
 *
 * @param {Array} info tier information in non-node form
 * @return {Array} tree nodes (with point and parent properties)
 */
const newNextTierNodes = (info) => info.map((x) => (
    {parent: x[1], point: x[0]}
));

/**
 * Assemble tier information into Array of point and parent information
 *
 * @param {Array} levInfo Tier information for this level
 * @return {Array} Tier data used by newNextTierNodes
 */
const makeNextTier = (levInfo) => pentUtils.zip(
    levInfo[0].flat(),
    getFlatParentLinks(getParentLinkValues(levInfo)).flat(5)
);

/**
 * Return Array of Array values.  Each internal Array values contains a
 * pair of parent/offspring indices.
 *
 * @param {Array} nextLevel offspring data in Arrays
 * @return {Array} parent/offspring index values
 */
const getParentLinkValues = (nextLevel) => pentUtils.zip(
    extractLength(nextLevel),
    nextLevel[1]
);

/**
 * Extract the length of next level
 *
 * @param {Array} nextLevel offspring data in Arrays
 * @return {Array} lengths of nextLevel values
 */
const extractLength = (x) => x[0].map((q) => q.length);

/**
 * Reformat tier data for use by makeNextTier
 *
 * @param {Array} linkInfo parent/offspring index values
 * @return {Array} Tier data in flat form
 */
const getFlatParentLinks = (linkInfo) => linkInfo.map(
    (x) => new Array(x[0]).fill(x[1])
);

/**
 * Find all nodes that have the offspring property.
 *
 * @param {Array} tree Existing tree
 * @returns {Array} list of tree nodes with offspring property
 */
const findNewNodes = (tree) => tree.filter(
    (x) => x.hasOwnProperty("offspring")
);

exports.genNextTier = genNextTier;
