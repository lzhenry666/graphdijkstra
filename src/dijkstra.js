/**
 * @file Provides an implementation of Dijkstra's shortest path algorithm on a graph
 * @name dijkstra.js
 */
(function() {
    'use strict';

    /**
     * @ignore
     */
    var MinHeap = require('./min_heap.js');

    /**
     * A runner for Dijkstra's shortest path algorithm
     */
    var Dijkstra = function() { };

    module.exports = Dijkstra;

    //------------------------------------------------//

    /**
     * Run Dijkstra's algorithm to find the shortest path from one node to another
     *
     * @param {Graph} graph The graph on which to run the algorithm
     * @param {number} pathType The value of node type (nType) that is a valid path
     * @param {number} source The ID of the starting point
     * @param {number} target The ID of the ending point
     *
     * @returns {Object} The results of running Dijkstra's algorithm, or null if
     * the source/target do no exist
     *
     * @example <caption>The format of the results</caption>
     * {
     *     source: < The ID of the node that served as the source >
     *     target: < The ID of the node that served as the target >
     *     dist:   < The dist of each node from source (Infinity if not reached) >
     *     prev:   < The previous node along the optimal path from the source (null if not reached) >
     * }
     */
    Dijkstra.run = function(graph, pathType, source, target) {
        // jshint maxcomplexity: 11

        // return null if source or target does not exist (hence no path)
        if (!graph.exists(source) || !graph.exists(target)) {
            return null;
        }

        // return object
        var ret = {
            source: source,
            target: target
        };
        var dist = {}; // distance of the node from source
        var prev = {}; // previous node of the form 'node_id': 'prev_node_id'
        // binary min heap of the unvisited nodes (on distance)
        var unvisited = new MinHeap(
            function(e) {
                return e.distance;
            },
            function(e) {
                return e.id;
            },
            'distance'
        );

        // Initialization
        dist[source] = 0; // source is distance 0 from source
        prev[source] = source; // the previous of the source is itself (only prev of source can be itself)

        // for each node in the graph... initialize
        graph.eachNode(function(node) {
            if (node.id !== parseInt(source, 10)) {
                prev[node.id] = null; // set previous to null
                dist[node.id] = Infinity; // set distance to Infinity
            }
            // push node to unvisited with distance Infinity
            unvisited.push({
                id: node.id,
                distance: dist[node.id]
            });
        });

        // return if source is the same as target (i.e., already there)
        if (source === target) {
            // console.info('Same source and target');
            ret.dist = dist;
            ret.prev = prev;
        }

        // Run the loop of the algorithm
        // while there are still unvisited nodes
        while (unvisited.size() > 0) {
            var min = unvisited.pop(); // get minimum node dist and ID
            var minNode = graph.find(min.id); // get the minimum node

            // stop when we've found the target
            if (minNode.id === target) {
                break;
            }

            // for each neighbor of minNode that is in the unvisited queue
            for (var i = 0; i < minNode.neighbors.length; i++) {
                var n = graph.find(minNode.neighbors[i]); // node for the neighbor

                // ensure node exists, is in unvisited, and it is a valid path (unless it is the target)
                if (!n || !unvisited.exists(n) || (n.nType !== pathType && n.id !== parseInt(target, 10))) {
                    continue;
                }

                // calculate alternative distance
                var alt = min.distance + minNode.weight;

                // use this path instead, if alternative distance is shorter
                if (alt < dist[n.id]) {
                    dist[n.id] = alt;
                    prev[n.id] = min.id;
                    unvisited.decreaseKey(n.id, alt); // update key
                }
            }
        }

        ret.dist = dist;
        ret.prev = prev;
        return ret;
    };

    /**
     * Gets the optimal path from a node to the source given a prior run of Dijkstra's algorithm
     * @static
     *
     * @param {Object} prevList The `prev` results the prior run
     * @param {number} target The `target` from the prior run
     *
     * @returns {Array} An array of the path from source to target, or `[]` if there is not one
     */
    Dijkstra.getPath = function(prevList, target) {
        var path = []; // the path to return
        var t = target;

        // return [] if there was no path
        if (prevList[target] === null) {
            return [];
        }
        // while the previous is not itself (signaling reached the source)
        while (prevList[t] !== t) {
            path.unshift(t);
            t = prevList[t];
        }

        path.unshift(t); // add the source to the path

        return path;
    };

    module.exports = Dijkstra;
})();
