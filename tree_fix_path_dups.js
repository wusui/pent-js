const pUtils = require('./pent_utils');

/**
 * Curry the index of the first duplicate entry found and call
 * curryFirstDupAndRepeat
 *
 * @param {Array} p List of nodes
 * @return {Integer} Index of duplicate entry
 */
const rmDupPaths = p => curryFirstDupAndRepeat(firstDupFound(p))(p);

/**
 * Remove the entry corresponding to the duplicate node entry and
 * recursively call rmDupPaths with a shorter Array of nodes.  Terminate
 * if no more duplicate node entries are found.
 *
 * @param {Array} z Index of duplicate node
 * @param {Array} p List of new nodes
 */
const curryFirstDupAndRepeat = z => p => z < 0 ? p :
  rmDupPaths(removeDups(addDupLabel(z)(p)));

/**
 * Use zipped file from alignSetFindDups to find the first figure value
 * that is the same as a previous figure value.
 *
 * @param {Array} p List of new nodes
 * @return {Array} List of Boolean values where the first false value
 *         indicates that the corresponding entry is a duplicate
 */
const firstDupFound = p => alignSetFindDups(p.map(x => x.figure)).map(
  x => x[0] === x[1]).indexOf(false);

/**
 * Return a zipped list where an Array of figure values is zipped with
 * a Set of figure values.  Used to find first duplicate figure value
 * that occurs.
 *
 * @param {Array} f Array of figure values
 * @return {Array} f Array zipped with Set(f).
 */
const alignSetFindDups = f => pUtils.zip(f, Array.from(new Set(f)));

/**
 * Add iamadup property to the first entry in the new node list that
 *
 * @param Integer dup_node node index that is being searched for
 * @param Array p List of nodes to be searched
 * @return List of nodes with iamdup property added to nodes with duplicate
 *         values of figure.
 */
const addDupLabel = dup_node => p => p.map((x,indx) => indx === dup_node ?
        ({...x, 'iamadup': 0}) : x);

/**
 * Remove entries that have the iamadup property.
 *
 * @param {Array} p list of new nodes to be added
 * @return {Array} same list with entries removed that have the
 *         iamadup property
 */       
const removeDups = p => p.filter(x => !x.hasOwnProperty('iamadup'));

exports.rmDupPaths = rmDupPaths;
