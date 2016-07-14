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
        var i = 0;
        if (!!params.graph && !!params.graph.nodes) {
            // add each of the nodes in the supplied graph
            for (i = 0; i < params.graph.nodes.length; i++) {
                var nodeVals = params.graph.nodes[i];
                this.addNode(nodeVals.id, nodeVals.props);
            }
        }
        if (!!params.graph && !!params.graph.nodes) {
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
