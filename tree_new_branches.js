/**
 * (c) 2021, 2022 Warren Usui MOPFPPP
 * This code is licensed under the MIT license (see LICENSE.txt for details)
 */

var exports;
var require;
/**
 * Tree New Branches Module
 *
 * Handle the linking of branches and parent properties when a new Array
 * of nodes is added to the bottom of the pentomino tree.
 */
const pentUtils = require("./pent_utils");

/**
 * Attach the links between the original tree and the new nodes so that
 * they can be concatenated together to form one tree.
 *
 * @param {Array} bottom New nodes to be added
 * @param {Array} topn Existing tree
 * @return {Array} tree with links properly set
 */
const assignBranchLinks = (bottom) => (topn) => fixNewBranchesWrap(
    setNewBranches(bottom)(topn)
);

/**
 * Call addNewBranches for new node. Otherwise copy existing node
 *
 * @param {Array} addon New nodes to be added
 * @param {Array} tree Existing tree
 * @return {Array} tree with links possibly containing newbranches property
 */
const setNewBranches = (addon) => (tree) => tree.map(
    (node) => node.hasOwnProperty("offspring")
    ? addNewBranches(node, addon)
    : ({
        "branches": node.branches,
        "parent": node.parent,
        "point": node.point
    })
);

/**
 * Insert newbranches property into nodes that are getting new branches
 * These will be processed by the code called from fixNewBranchesWrap.
 *
 * @param {Array} tree Existing tree
 * @param {Array} addon List of nodes to be added
 * @return {Array} tree with addon merged in (still some branch adjustments
 *         needed
 *
 */

const addNewBranches = (tree, addon) => pentUtils.putInNewProp(
    tree,
    "newbranches",
    addon.map((node) => node.parent)
);

/**
 * Assign new branches to former leaf nodes on the tree.  First curry
 * the size of the current tree.
 *
 * @param {Array} tree Tree
 * @return (Array} tree with branch values set
 */
const fixNewBranchesWrap = (tree) => fixNewBranches(tree.length)(tree);

/**
 * Call findABranch for all nodes in the tree
 *
 * @param {Integer} size Number of element in tree
 * @param {Array} tree tree
 * @return {Array} updated tree
 */
const fixNewBranches = (size) => (tree) => tree.map(
    (node) => findABranch(size)(node)
);

/**
 * Call fixABranch if this node has offspring property.  Otherwise return
 * the unchanged node.
 *
 * @param {Integer} size Number of element in tree
 * @param {Array} node Node in tree
 * @return {Array} updated node
 */
const findABranch = (size) => (node) => (
    node.hasOwnProperty("offspring")
    ? fixABranch(size)(node)
    : node
);

/**
 * Return a new node.  Call findBranchWrap to get new branch Array.
 *
 * @param {Integer} size Number of element in tree
 * @param {Array} node Node in tree
 * @return {Array} updated node
 */
const fixABranch = (size) => (node) => ({
    "branches": pullOutNegativeBranches(findBranchWrap(size)(node)),
    "parent": node.parent,
    "point": node.point
});

/**
 * Remove -1 entries from the list of branches.
 *
 * @param {Array} branch Branch numbers with -1 replacing invalid entries
 * @return {Array} Branch numbers with -1 removed
 */
const pullOutNegativeBranches = (branch) => branch.filter(
    (bNumb) => bNumb > 0
);

/**
 * Wrapper to pass newbranches information to the node
 *
 * @param {Integer} size Number of elements in tree
 * @param {node} node Element in the tree
 * @return {node} Updated tree node
 */
const findBranchWrap = (size) => (node) => findBranches(size)(
    node.offspring.index
)(node.newbranches);

/**
 * Set branch information in newbranch info Array.
 *
 * @param {Integer} size Number of elements in tree
 * @param {node} node Element in the tree
 * @param {binfo} newbranch information
 * @return {Array} list of new tree nodes
 */
const findBranches = (size) => (node) => (binfo) => binfo.map(
    setBranchValues(size)(node)
);

/**
 * Point new branch to node beyond current top of the tree (in the list
 * being concatenated).
 *
 * @param {Integer} size Number of elements in tree
 * @param {node} node This node in the tree
 * @param {node} binfo A node in this tree
 * @param {Integer} indx Index of x in this tree
 * @return {Array} links to the new nodes in the concatenated list
 */
const setBranchValues = (size) => (node) => (bnode, indx) => (
    bnode === node
    ? indx + size
    : -1
);

exports.assignBranchLinks = assignBranchLinks;
