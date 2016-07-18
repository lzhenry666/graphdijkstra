/**
 * dijkstra.js
 * 06/01/16
 *
 * runs Dijkstra's shortest path algorithm on a graph
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var MinHeap = require('./min_heap.js');

    var Dijkstra = {
        // // the previously run search (caching)
        // prev: {
        //     s: null, // previous source
        //     t: null, // previous target
        //     r: {} // previous results
        // },

        run: run,
        getPath: getPath
    };

    module.exports = Dijkstra;

    //------------------------------------------------//

    /**
     * run: run Dijkstra's shortest path algorithm
     * @returns an object with the distance (dist) and previous (prev) for the nodes as calculated
     * @graph: the graph on which to run algorithm
     * by Dijkstra's algorithm from source to target
     * @source: the starting point for the path (a node ID)
     * @target: the ending point for the path (a node ID)
     * @pathType: which values of node type (nType) are valid paths for the algorithm
     */
    function run(graph, source, target, pathType) {

        // // caching should be done by the wrapper
        // if (source === service.prev.s && target === service.prev.t) {
        //     service.prev.r.cached = true;
        //     return service.prev.r;
        // } else {
        //     service.prev.r.cached = false;
        //     service.prev.s = source;
        //     service.prev.t = target;
        // }

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
        var dist = {}; // distance of the node from source
        var prev = {}; // previous node of the form 'node_id': 'prev_node_id'

        // throw error if source or target is undefined
        _assert(graph.nodes[source] !== undefined, 'Source does not exist (' +
            source + ')');
        _assert(graph.nodes[target] !== undefined, 'Target does not exist (' +
            target + ')');

        // Initialization
        dist[source] = 0; // source is distance 0 from source
        // for each node in the graph...
        graph.eachNode(function(node) {
            // var node = graph.nodes[id];

            if (node.id !== parseInt(source, 10)) {
                prev[node.id] = null; // set previous to undefined
                dist[node.id] = Infinity; // set distance to Infinity
            }
            // push node to unvisited with distance Infinity
            unvisited.push({
                id: node.id,
                distance: dist[node.id]
            });
        });
        // for (var id in graph.nodes) {
        //     if (!graph.exists(id)) {
        //         continue; // ensure we are getting the right property
        //     }
        //     var node = graph.nodes[id];

        //     if (node.id !== parseInt(source, 10)) {
        //         prev[node.id] = null; // set previous to undefined
        //         dist[node.id] = Infinity; // set distance to Infinity
        //     }
        //     // push node to unvisited with distance Infinity
        //     unvisited.push({
        //         id: node.id,
        //         distance: dist[node.id]
        //     });
        // }

        // return if source is the same as target (i.e., already there)
        if (source === target) {
            console.info('Same source and target');
            // service.prev.r = {
            //     dist: dist,
            //     prev: prev
            // };
            // return service.prev.r;
            return {
                dist: dist,
                prev: prev
            };
        }

        return runAlgorithm();

        // Run the loop of the algorithm
        function runAlgorithm() {
            // while there are still unvisited nodes
            while (unvisited.size() > 0) {
                var min = unvisited.pop(); // get minimum node dist and ID
                var minNode = graph.nodes[min.id]; // get the minimum node

                // for each neighbor of minNode that is in the unvisited queue
                for (var i = 0; i < minNode.neighbors.length; i++) {
                    var n = graph.nodes[minNode.neighbors[i]]; // node for the neighbor

                    // ensure node is in unvisited and it is a PATH
                    if (!unvisited.exists(n) || (n.nType !== pathType && n.id !== parseInt(target, 10))) {
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

            // return distances and previous (and cache)
            service.prev.r = {
                dist: dist,
                prev: prev
            };
            return service.prev.r;
        }
    }

    /**
     * getPath: gets the path given the previous array from Dijkstra's algorithm
     * @prev: the previous array generated by a run of Dijkstra's
     * @target: the end of the path
     */
    function getPath(prev, target) {
        var path = []; // the path to return
        var t = target;

        // add a block to path
        while (prev[t] !== undefined && prev[t] !== null) {
            path.unshift(t);
            t = prev[t];
        }
        // TODO: this is not how you do this
        path.unshift(t); // add the source to path

        return path;
    }

    module.exports = Dijkstra;

    /*
     * assert: debugging function that throws an error if condition is true
     * @condition: condition to test for truth
     * @message: error message to display in failure
     */
    function _assert(condition, message) {
        if (!condition) {
            message = message || 'Assertion failed';
            if (typeof Error !== 'undefined') {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
})();
