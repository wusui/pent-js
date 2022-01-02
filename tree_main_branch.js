/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

/**
 * Main Tree Module
 *
 * Generate the tree used to scan for pentominos
 */
const treeNode = require('./tree_nodes');
const tFixDupPts = require('./tree_fix_pt_dups');
const tTreeMakeTier = require('./tree_make_tier');
const tTreeFigures = require('./tree_figures');
const tFixPathDups = require('./tree_fix_path_dups');
const tNewBranches = require('./tree_new_branches');
const tPentominos = require('./tree_pentominos');
const tGenSymbols = require('./tree_gen_symbols');

/**
 * Get complete tree to be used by the rectangle searching code.
 *
 * @return {Array} search tree
 */
const treeData = () => simplePentTree(
    tGenSymbols.generateTreeWithSymbols(generateTree())
);

/**
 * Generate an instance of the pentomino tree
 *
 * @return {Array} Complete tree
 */
const generateTree = () => pentominoTree(
    {parent: undefined, point: {col: 0, row: 0}}
);

/**
 * Generate pentomino tree.
 *
 * @param {node} rNode Root node
 * @return {Array} List of nodes forming the tree
 */
const pentominoTree = (rNode) => tPentominos.setPentominos(
    getFullTree(4, [rNode])
);

/**
 * Recursively add levels onto a tree
 *
 * @param {Integer} levels Number of levels to add. If 0, add the root node
 *         passed. Note that since the root node is already given,
 *         this value should be one less than the number of nodes in
 *         the final figure.  So for pentominos, this value should be
 *         5 minus 1.
 * @param {node} rNode Root node
 * @return {Array} List of nodes forming the tree
 */
const getFullTree = (levels, rNode) => (
    levels === 0 ?
    rNode :
    getFullTree(levels - 1, setTreeLev(rNode))
);

/**
 * Add a level onto the tree.
 *
 * @param {Array} lTree Tree where level will be added
 * @return {Array} List of nodes forming the Tree
 */
const setTreeLev = (lTree) => ptAndPathWrapper(dupPointFixer(lTree));

/**
 * Add branches to existing tree and remove nodes that duplicate points.
 *
 * @param {Array} nTree Tree of nodes found so far
 * @return {Array} List of nodes forming the tree (updated)
 */
const dupPointFixer = (nTree) => tFixDupPts.removeDupPoints(
    nTree.map(treeNode.addBranches(nTree))
);

/**
 * Wrap the calls that generate the new points, remove duplicate paths, and
 * merges the nodes into the tree.
 *
 * @param {Array} nTree Tree of nodes found so far
 * @return {Array} List of nodes forming the tree (updated)
 */
const ptAndPathWrapper = (nTree) => setBranchLinks(dupPathFixer(nTree))(nTree);

/**
 * First generate the next set of points to be added to the tree.  Then
 * add figure properties to nodes in the new node list and remove nodes
 * that would cause duplicate figures to be in the tree.
 *
 * @param {Array} gNodes List of nodes to be added
 * @return {Array} updaated tree
 */
const dupPathFixer = (gNodes) => tFixPathDups.rmDupPaths(
    tTreeFigures.getFigs(
        tTreeMakeTier.genNextTier(gNodes)
    )(gNodes)
);

/**
 * When this function is called, there are two sets of nodes.  One
 * is the original tree with offspring parameters on the end nodes.
 * The second is a list of new nodes to be added to the tree.  This
 * function merges those two lists and sets the branch values from
 * the old tree to the elements in the second list.
 *
 * @param {Array} pTree Original tree
 * @param {Array} g List of new nodes to add to the tree
 * @return {Array} List of nodes forming the tree
 */
const setBranchLinks = (pTree) => (gNodes) => tNewBranches.assignBranchLinks(
    pTree
)(gNodes).concat(pTree);

/**
 * Remove extraneous properties.  Intermediate nodes will have points,
 * parents, and branches.  Leaf nodes will have points, parents, and
 * symbol values
 *
 * @param {Array} xTree tree
 * @return {Array} Modified tree
 */
const simplePentTree = (xTree) => xTree.map((iTree) => (
    iTree.hasOwnProperty('branches') ?
    {branches: iTree.branches, parent: iTree.parent, point: iTree.point} :
    {parent: iTree.parent, point: iTree.point, symbol: iTree.symbol}
));

exports.treeData = treeData;
