(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// browserify.js
// needed for browserify to inject required resources
require('./graph-dijkstra.js');

},{"./graph-dijkstra.js":3}],2:[function(require,module,exports){
/**
 * dijkstra.js
 * 06/01/16
 *
 * runs Dijkstra's shortest path algorithm on a graph
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var MinHeap = require('./min_heap.js');
    var Dijkstra = function() {
        var service = {
            // the previously run search (caching)
            prev: {
                s: null, // previous source
                t: null, // previous target
                r: {} // previous results
            },

            run: run,
            getPath: getPath
        };

        return service;

        //------------------------------------------------//

        /**
         * run: run Dijkstra's shortest path algorithm
         * returns an array of the shortest path from source to target, [] if one DNE
         * @source: the starting point for the path (a node ID)
         * @target: the ending point for the path (a node ID)
         * @graph: the graph on which to run algorithm`
         */
        function run(source, target, graph, pathType) {
            if (source === service.prev.s && target === service.prev.t) {
                service.prev.r.cached = true;
                return service.prev.r;
            } else {
                service.prev.r.cached = false;
                service.prev.s = source;
                service.prev.t = target;
            }

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

            _assert(graph.nodes[source] !== undefined, 'Source does not exist (' +
                source + ')');
            _assert(graph.nodes[target] !== undefined, 'Target does not exist (' +
                target + ')');

            // Initialization
            dist[source] = 0; // source is distance 0 from source
            // for each node in the graph...
            for (var id in graph.nodes) {
                if (!graph.nodes.hasOwnProperty(id)) {
                    continue; // ensure we are getting the right property
                }
                var node = graph.nodes[id];

                if (node.id !== parseInt(source, 10)) {
                    prev[node.id] = null; // set previous to undefined
                    dist[node.id] = Infinity; // set distance to Infinity
                }
                // push node to unvisited with distance Infinity
                unvisited.push({
                    id: node.id,
                    distance: dist[node.id]
                });
            }

            // return if source is the same as target (i.e., already there)
            if (source === target) {
                console.log('Same Spot');
                service.prev.r = {
                    dist: dist,
                    prev: prev
                };
                return service.prev.r;
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
    };

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

},{"./min_heap.js":7}],3:[function(require,module,exports){
// graph-dijkstra.js
(function() {
  'use strict';

  var Graphing = require('./graphing.js');
  var Dijkstra = require('./dijkstra.js');

  /* global angular */
  angular.module('graphDijkstra.lib', [])
    .factory('Graphing', Graphing)
    .factory('Dijkstra', Dijkstra);

})();
},{"./dijkstra.js":2,"./graphing.js":6}],4:[function(require,module,exports){
// graph-node.js
(function() {
    'use strict';

    var DEFAULTS = {
        weight: 0,
        nType: 0,
        neighbors: []
    };

    /**
     * Node
     * create a new node with @id @neighbors, @weight, and @nType
     * @props: object of properties for the node (optional), valid keys are:
     *    @weight: the weight of the node to create (i.e., distance in path algorithm)
     *    @nType:  an integer that represents the type of nodes (e.g., an enumeration)
     *    @neighbors: list of node ids that are the neighbors
     */
    var Node = function(id, props) {
        props = props || {};
        this._id = id;
        this._weight = props.weight || DEFAULTS.weight;
        this._nType = props.nType || DEFAULTS.nType;
        this._neighbors = (props.neighbors || DEFAULTS.neighbors).slice();
    };

    /**
     * Node define properties
     */
    Object.defineProperties(Node.prototype, {
        // id
        id: {
            get: function() {
                return this._id;
            },
        },
        // neighbors
        neighbors: {
            get: function() {
                return this._neighbors;
            },
            set: function(value) {
                this._neighbors = value.slice();
            }
        },
        // weight
        weight: {
            get: function() {
                return this._weight;
            },
            set: function(value) {
                this._weight = value;
            }
        },
        // nType
        nType: {
            get: function() {
                return this._nType;
            },
            set: function(value) {
                this._nType = value;
            }
        }
    });

    module.exports = Node;
})();

},{}],5:[function(require,module,exports){
/**
 * graph.js
 * 05/31/16
 *
 * a simple undirected graph to represent the office
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var Node = require('./graph-node.js');

    /**
     * Graph
     * @params: (optional) object of parameters for initializing graph, valid keys are:
     *    @debug: only verify if debug is set to true (defaults to false)
     *    @graph: a JSON representation of the graph to initialize
     *    * the graph should an object with two arrays, nodes and edges.
     *    * nodes: an array of objects with integer id and object props (keys: weight, nType, and neighbors)
     *    * edges: an array of length 2 arrays representing the source and target ids for the edge
     */
    var Graph = function(params) {
        params = params || {};
        params.debug = params.debug || false;
        this._nodes = {}; // initialize nodes to empty
        this._nodeCount = 0; // initialize node count to 0
        this._edgeCount = 0; // initialize edge count to 0

        // this._nodeCount = !!params.graph ? params.graph.nodeCount : 0; // number of nodes
        // this._edgeCount = !!params.graph ? params.graph.edgeCount : 0; // number of edges

        // if a graph is supplied, initialize to that
        if (!!params.graph) {
            // add each of the nodes in the supplied graph
            for (var i = 0; i < params.graph.nodes.length; i++) {
                var nodeVals = params.graph.nodes[i];
                this.addNode(nodeVals.id, nodeVals.props);
            }

            // add each of the edges in the supplied graph
            for (i = 0; i < params.graph.edges.length; i++) {
                var source = params.graph.edges[i][0];
                var target = params.graph.edges[i][1];
                this.addEdge(source, target);
            }
        }

        // verify the graph if debug is true
        if (params.debug && !!params.graph) {
            _verify(this);
        }
    };

    /**
     * Graph define properties
     */
    Object.defineProperties(Graph.prototype, {
        // nodeCount
        nodeCount: {
            get: function() {
                return this._nodeCount;
            },
            set: function(value) {
                this._nodeCount = value;
            }
        },
        // edgeCount
        edgeCount: {
            get: function() {
                return this._edgeCount;
            },
            set: function(value) {
                this._edgeCount = value;
            }
        },
        // nodes
        nodes: {
            get: function() {
                return this._nodes;
            },
            set: function(value) {
                this._nodes = value;
            }
        },
    });

    /**
     * Graph.find: returns the node specified by ID (or undefined)
     * @id: the ID of the node to find
     * returns the node if found, null otherwise
     */
    Graph.prototype.find = function(id) {
        return this.nodes[id] || null;
    };

    /**
     * Graph.exists: checks if the specified ID already exists in the graph
     * @id: the ID of the node to check
     * returns true if it is a node, false otherwise
     */
    Graph.prototype.exists = function(id) {
        return this.nodes[id] !== undefined;
    };

    /**
     * Graph.addNode: add a new node to the graph
     * @id: the node's ID (a number) (required)
     * @props: object of properties for the node (optional), valid keys are:
     *    @neighbors: the neighbors of the node to add (create node if it does not exist)
     *    @weight: the weight of the node to create
     *    @nType: the type of the node to create
     * return the added (or existing) node with @id
     */
    Graph.prototype.addNode = function(id, props) {
        _assert(!!id, 'Cannot create a node without an id');
        props = props || {};

        // only add node if it does not already exist
        // do not overwrite existing properties (TODO: might change)
        if (!this.exists(id)) {
            // create & add new node
            var node = new Node(id, props);
            this.nodes[id] = node;

            // ensure consistency of graph by adding necessary edges to specifeid neighbors
            for (var i = 0; i < node.neighbors.length; i++) {
                var neigh = this.addNode(node.neighbors[i]); // create neighbor (if necessary)

                // fix inconsistent edge between new node and its neighbor
                this.addEdge(id, neigh.id);
                ++this.edgeCount; // one more edge! (add edge will not account for it)
                // neigh.neighbors.push(id); // add id to neighbor's neighbors
            }
            ++this.nodeCount;
        }
        return this.nodes[id];
    };

    /**
     * Graph.deleteNode: delete a node from the graph. true if successful
     * @id: the ID of the node to delete (required)
     * return the node that was deleted or null if it does not exist
     */
    Graph.prototype.deleteNode = function(id) {
         _assert(!!id, 'Cannot delete a node without an id');

        // only remove if it exists
        if (this.exists(id)) {
            var node = this.nodes[id]; // node to delete

            // remove all incident edges
            for (var i = 0; i < node.neighbors.length; i++) {
                var n = this.nodes[node.neighbors[i]]; // get node
                var index = n.neighbors.indexOf(id); // index n's neighbors w/ id

                if (index > -1) {
                    n.neighbors.splice(index, 1);
                    --this.edgeCount;
                }
            }
            // remove from nodes
            delete this.nodes[id];
            --this.nodeCount;

            return node;
        }

        return null;
    };

    /**
     * Graph.addEdge: connect two nodes (undirected edge) that both exist
     * do not allow self edges (by nature of being a simple graph)
     * @source: ID of one end of the edge
     * @target: ID of the other end of the edge
     * return true if able to add edge, false otherwise (i.e., self edge or invalid)
     */
    Graph.prototype.addEdge = function(source, target) {
        // is this a self edge?
        if (source === target) {
            // console.log('Cannot add self edge in simple graph');
            return false;
        }

        // find the source & target nodes
        var s = this.find(source);
        var t = this.find(target);

        // continue if invalid edge (i.e., either source or target does not exist)
        if (!s || !t) {
            // console.log('Unable to add edge (' + source + ',' + target + '): node does not exist');
            return false;
        }

        // do not add redundant edges (but fix edge if inconsistent)
        if (s.neighbors.indexOf(t.id) < 0 && t.neighbors.indexOf(s.id) < 0) {
            // add each node to the other's edge list
            s.neighbors.push(t.id);
            t.neighbors.push(s.id);
            ++this.edgeCount;
        } else if (s.neighbors.indexOf(t.id) < 0) {
            s.neighbors.push(t.id); // fix inconsistency in source
        } else if (t.neighbors.indexOf(s.id) < 0) {
            t.neighbors.push(s.id); // fix inconsistency in target
        }
        return true; // return true even if it is redundant
    };

    /**
     * Graph.deleteEdge: delete an edge from the graph
     * @source: ID of one end of the edge to delete
     * @target: ID of the other end of the edge to delete
     * return true if successful, false otherwise
     */
    Graph.prototype.deleteEdge = function(source, target) {
        var s = this.nodes[source]; // the node corresponding to source ID
        var t = this.nodes[target]; // the node corresponding to target ID

        // ensure the edge exists (i.e., connected)
        if (!this.connected(source, target)) {
            return false;
        }

        // delete from neighbor arrays
        s.neighbors.splice(s.neighbors.indexOf(target), 1);
        t.neighbors.splice(t.neighbors.indexOf(source), 1);
        --this.edgeCount;

        return true;
    };

    /**
     * Graph.connected: return whether there is a consistent edge connecting
     * the @source and @target (note only returns true if it is consistent)
     * return true is yes, false if no
     */
    Graph.prototype.connected = function(source, target) {
        if (!this.exists(source) || !this.exists(target)) {
            return false; // clearly not connected if does not exist
        }
        return this.find(source).neighbors.indexOf(target) >= 0 && this.find(target).neighbors.indexOf(source) >= 0;
    };

    // /**
    //  * Graph.weight: return the weight of the specified edge/node
    //  * the weight of an edge is defined as the weight of the source node
    //  * @source: ID of the node to check
    //  */
    // Graph.prototype.weight = function(source) {
    //     return this.nodes[source].weight;
    // };

    module.exports = Graph;

    /**
     * _verify: ensure that the graph is consistent (debugging)
     * i.e., nodes and edges exist and that all edges are bi-directional
     */
    function _verify(graph) {
        console.info('Verifying Graph');
        // the number of nodes should be the same as the nodeCount
        var numNodes = Object.keys(graph.nodes).length;
        _assert(numNodes === graph.nodeCount, 'Inconsistent nodeCount (' +
            numNodes + ' != ' + graph.nodeCount + ')');

        // verify each node
        var numEdges = 0;
        // var keys = Object.keys(graph.nodes);
        // for (var i = 0; i < keys.length; i++) {
        for (var id in graph.nodes) {
            if (!graph.nodes.hasOwnProperty(id)) {
                continue; // ensure we are getting the right property
            }
            var n = graph.nodes[id];
            // should have non-negative weight and type between 1 and 6
            _assert(n.weight >= 0, 'Negative Weight (' + n.weight + ')');
            _assert(n.nType > 0 && n.nType <= 9, 'Irregular Type (' +
                n.nType + ')');

            // should have consistent edges and no self edges
            for (var j = 0; j < n.neighbors.length; j++) {
                numEdges++; // count number of edges (should be double)
                var k = graph.nodes[n.neighbors[j]];

                _assert(k.id !== n.id, 'Cannot have self edge (' +
                    n.id + ')');

                _assert(k._neighbors.includes(n.id), 'Inconsisent Edge (' +
                    n.id + ',' + k.id + ')');
            }
        }
        // number of edges should be same as the edgeCount
        _assert(numEdges / 2 === graph.edgeCount, 'Inconsistent edgeCount (' +
            numEdges / 2 + ' != ' + graph.edgeCount + ')');

        return true;
    }

    /**
     * _assert: debugging function
     * @condition: condition that should be true
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
/*----------------------------------------------------------------------------*/

},{"./graph-node.js":4}],6:[function(require,module,exports){
/**
 * graphing.js
 * 05/31/16
 *
 * an angular wrapper for the graph
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var Graph = require('./graph.js');
    var Graphing = function($http) {
        var service = {
            graph: null,

            createGraph: createGraph
        };

        return service;

        //------------------------------------------------//

        function createGraph(url, debug) {
            $http.get(url)
                .success(function(data) {
                    service.graph = new Graph({
                        graph: data,
                        debug: debug || false // default to false
                    });

                    return service.graph;
                })
                .error(function(error) {
                    console.error(error || 'Request failed');
                });
        }
    };

    Graphing.$inject = ['$http'];
    module.exports = Graphing;
})();
/*----------------------------------------------------------------------------*/
},{"./graph.js":5}],7:[function(require,module,exports){
/*
 * min_heap.js
 * adapted from https://github.com/rombdn/js-binaryheap-decreasekey
 * 06/01/16
 *
=================================
js-binaryheap-decreasekey - v0.1
https://github.com/rombdn/js-binaryheap-decreasekey

Based on a Binary Heap implementation found in the book
Eloquent Javascript by Marijn Haverbeke
http://eloquentjavascript.net/appendix2.html

(c) 2013 Romain BEAUDON
BinaryHeap code may be freely distributed under the MIT License
=================================
/*----------------------------------------------------------------------------*/

(function() {
    'use strict';

    var MinHeap = function(scoreFunction, idFunction, valueProp) {
        this.content = [];
        this.scoreFunction = scoreFunction;
        this.idFunction = idFunction;
        this.valueProp = valueProp;
        this.map = {};
    };

    MinHeap.prototype = {
        size: function() {
            return this.content.length;
        },

        exists: function(elt) {
            return this.map[this.idFunction(elt)] !== undefined;
        },

        push: function(elt) {
            if (this.map[this.idFunction(elt)] !== undefined) {
                throw 'Error: id "' + this.idFunction(elt) + '" already present in heap';
            }

            this.content.push(elt);
            this.bubbleUp(this.content.length - 1);
            //var index = this.bubbleUp(this.content.length - 1);
            //this.map[this.idFunction(elt)] = index;
        },

        pop: function() {
            var result = this.content[0];
            var end = this.content.pop();

            delete this.map[this.idFunction(result)];

            if (this.content.length > 0) {
                this.content[0] = end;
                this.map[this.idFunction(end)] = 0;
                this.sinkDown(0);
                //var index = this.sinkDown(0);
                //this.map[this.idFunction(end)] = index;
            }

            return result;
        },

        bubbleUp: function(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (n > 0) {
                var parentN = Math.floor((n - 1) / 2);
                var parent = this.content[parentN];

                if (this.scoreFunction(parent) < score) {
                    break;
                }

                this.map[this.idFunction(element)] = parentN;
                this.map[this.idFunction(parent)] = n;

                this.content[parentN] = element;
                this.content[n] = parent;
                n = parentN;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        },

        sinkDown: function(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (true) {
                var child2N = (n + 1) * 2;
                var child1N = child2N - 1;
                var swap = null;
                var child1score;

                if (child1N < this.content.length) {
                    var child1 = this.content[child1N];
                    child1score = this.scoreFunction(child1);
                    if (score > child1score) {
                        swap = child1N;
                    }
                }

                if (child2N < this.content.length) {
                    var child2 = this.content[child2N];
                    var child2score = this.scoreFunction(child2);
                    if ((swap === null ? score : child1score) > child2score) {
                        swap = child2N;
                    }
                }

                if (swap === null) {
                    break;
                }

                this.map[this.idFunction(this.content[swap])] = n;
                this.map[this.idFunction(element)] = swap;

                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        },

        decreaseKey: function(id, value) {
            var n = this.map[id];
            this.content[n][this.valueProp] = value;
            this.bubbleUp(n);
        }
    };

    module.exports = MinHeap;
})();
},{}]},{},[1]);
