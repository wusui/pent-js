/**
 * (c) 2021 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

var require;
var exports;
/**
 * Main Tree Module
 *
 * Generate the tree used to scan for pentominos
 */
const tPoints = require("./tree_points");
const treeNode = require("./tree_nodes");
const tFixDupPts = require("./tree_fix_pt_dups");
const tTreeMakeTier = require("./tree_make_tier");
const tTreeFigures = require("./tree_figures");
const tFixPathDups = require("./tree_fix_path_dups");
const tNewBranches = require("./tree_new_branches");
const tPentominos = require("./tree_pentominos");
const tGenSymbols = require("./tree_gen_symbols");

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
 * @param {node} x Root node
 * @return {Array} List of nodes forming the tree
 */
const pentominoTree = (x) => tPentominos.setPentominos(getFullTree(4, [x]));

/**
 * Recursively add levels onto a tree
 *
 * @param {Integer} c Number of levels to add. If 0, add the root node passed.
 *         Note that since the root node is already given, this value should
 *         be one less than the number of nodes in the final figure.  So for
 *         pentominos, this value should be 5 minus 1.
 * @param {node} x Root node
 * @return {Array} List of nodes forming the tree
 */
const getFullTree = (c, x) => (
    c === 0
    ? x
    : getFullTree(c - 1, setTreeLev(x))
);

/**
 * Add a level onto the tree.
 *
 * @param {Array} x Tree where level will be added
 * @return {Array} List of nodes forming the Tree
 */
const setTreeLev = (x) => ptAndPathWrapper(dupPointFixer(x));

/**
 * Add branches to existing tree and remove nodes that duplicate points.
 *
 * @param {Array} x Tree of nodes found so far
 * @return {Array} List of nodes forming the tree (updated)
 */
const dupPointFixer = (x) => tFixDupPts.removeDupPoints(
    x.map(treeNode.addBranches(x))
);

/**
 * Wrap the calls that generate the new points, remove duplicate paths, and
 * merges the nodes into the tree.
 *
 * @param {Array} x Tree of nodes found so far
 * @return {Array} List of nodes forming the tree (updated)
 */
const ptAndPathWrapper = (x) => setBranchLinks(dupPathFixer(x))(x);

/**
 * First generate the next set of points to be added to the tree.  Then
 * add figure properties to nodes in the new node list and remove nodes
 * that would cause duplicate figures to be in the tree.
 *
 * @param {Array} g List of nodes to e added
 * @return {Array} updaated tree
 */
const dupPathFixer = (g) => tFixPathDups.rmDupPaths(
    tTreeFigures.getFigs(
        tTreeMakeTier.genNextTier(g)
    )(g)
);

/**
 * When this function is called, there are two sets of nodes.  One
 * is the original tree with offspring parameters on the end nodes.
 * The second is a list of new nodes to be added to the tree.  This
 * function merges those two lists and sets the branch values from
 * the old tree to the elements in the second list.
 *
 * @param {Array} p Original tree
 * @param {Array} g List of new nodes to add to the tree
 * @return {Array} List of nodes forming the tree
 */
const setBranchLinks = (p) => (g) => tNewBranches.assignBranchLinks(
    p
)(g).concat(p);

/**
 * Remove extraneous properties.  Intermediate nodes will have points,
 * parents, and branches.  Leaf nodes will have points, parents, and
 * symbol values
 *
 * @param {Array} x tree
 * @return {Array} Modified tree
 */
const simplePentTree = (x) => x.map((x) => (
    x.hasOwnProperty("branches")
    ? ({branches: x.branches, parent: x.parent, point: x.point})
    : ({parent: x.parent, point: x.point, symbol: x.symbol})
));

exports.treeData = treeData;
