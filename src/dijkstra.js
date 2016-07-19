/**
 * dijkstra.js
 * 06/01/16
 *
 * runs Dijkstra's shortest path algorithm on a graph
 * relies on the graph defined in graph.js
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var MinHeap = require('./min_heap.js');

    var Dijkstra = {
        run: run,
        getPath: getPath
    };

    module.exports = Dijkstra;

    //------------------------------------------------//

    /**
     * run: run Dijkstra's shortest path algorithm
     * @return an object with the source (source), target (target), distance (dist)
     * and previous (prev) for the nodes as calculated or null if source/target do not exist
     * @graph: the graph on which to run algorithm
     * by Dijkstra's algorithm from source to target
     * @pathType: which values of node type (nType) are valid paths for the algorithm
     * @source: the starting point for the path (a node ID)
     * @target: the ending point for the path (a node ID)
     */
    // jshint maxcomplexity: 10
    function run(graph, pathType, source, target) {
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
            return ret;
        }

        // Run the loop of the algorithm
        // while there are still unvisited nodes
        while (unvisited.size() > 0) {
            var min = unvisited.pop(); // get minimum node dist and ID
            var minNode = graph.find(min.id); // get the minimum node

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
    }

    /**
     * getPath: gets the path given the previous array from Dijkstra's algorithm
     * @prevList: a previous object generated by a run of Dijkstra's
     * @target: the end of the path
     * @return an array of the path from source to target or [] if there is not one
     */
    function getPath(prevList, target) {
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
    }

    module.exports = Dijkstra;
})();
