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
     * @debug: only verify if debug is set to true (defaults to false)
     * @graph: (optional) a JSON representation of the graph to initialize
     */
    var Graph = function(debug, graph) {
        debug = debug || false;
        this._nodes = !!graph ? graph.nodes : {}; // set of nodes in graph
        this._nodeCount = !!graph ? graph.nodeCount : 0; // number of nodes
        this._edgeCount = !!graph ? graph.edgeCount : 0; // number of edges

        // verify the graph if debug is true
        if (debug && !!graph) {
            _verify(this);
        }
    };

    /**
     * Graph define properties
     */
    Object.defineProperties(Graph.prototype, {
        // nodeCount
        nodeCount: {
            get: function() { // getter
                return this._nodeCount;
            },
        },
        // edgeCount
        edgeCount: {
            get: function() { // getter
                return this._edgeCount;
            },
        },
        // nodes
        nodes: {
            get: function() { // getter
                return this._nodes;
            },
        },
    });

    /**
     * Graph.find: returns the node specified by ID (or undefined)
     * @id: the ID of the node to find
     */
    Graph.prototype.find = function(id) {
        return this.nodes[id];
    };

    /**
     * Graph.exists: checks if the specified ID already exists in the graph
     * @id: the ID of the node to check
     */
    Graph.prototype.exists = function(id) {
        return this.nodes[id] !== undefined;
    };

    /**
     * Graph.addNode: add a new node to the graph
     * @id: the node's ID (a number) (required)
     * @props: object of properties for the node (optional), valid keys are:
     *    @neighbors: the neighbors of the node to add
     *    @weight: the weight of the node to create
     *    @nType: the type of the node to create
     */
    Graph.prototype.addNode = function(id, props) {
        _assert(!!id, 'Cannot create a node without an id');

        // only add node if it does not already exist (TODO: might change)
        if (!this.exists(id)) {
            // create & add new node
            this.nodes[id] = new Node(id, props.neighbors, props.weight, props.nType);
            ++this.nodeCount;
        }
        return this.nodes[id];
    };

    /**
     * Graph.deleteNode: delete a node from the graph. true if successful
     * @id: the ID of the node to delete
     */
    Graph.prototype.deleteNode = function(id) {
        // only remove if it exists
        if (this.exists(id)) {
            // remove all incident edges
            for (var i = 0; i < this.nodes[id]._neighbors.length; i++) {
                var n = this.nodes[this.nodes[id]._neighbors[i]]; // get node
                var index = n._neighbors.indexOf(id); // index n's neighbors w/ id

                if (index > -1) {
                    n._neighbors.splice(index, 1);
                    --this.edgeCount;
                }
            }
            // remove from nodes
            delete this.nodes[id];
            --this.nodeCount;

            return true;
        }

        return false;
    };

    /**
     * Graph.addEdge: connect two nodes (undirected edges)
     * @source: ID of one end of the edge
     * @target: ID of the other end of the edge
     */
    Graph.prototype.addEdge = function(source, target) {
        // create the source & target nodes
        var s = this.addNode(source);
        var t = this.addNode(target);

        // add each node to the other's edge list
        s._neighbors.push(t._id);
        t._neighbors.push(s._id);
        ++this.edgeCount;

        return true;
    };

    /**
     * Graph.deleteEdge: delete an edge from the graph. true if successful
     * @source: ID of one end of the edge to delete
     * @target: ID of the other end of the edge to delete
     */
    Graph.prototype.deleteEdge = function(source, target) {
        var s = this.nodes[source]; // the node corresponding to source ID
        var t = this.nodes[target]; // the node corresponding to target ID

        // ensure they exist
        if (s === undefined || t === undefined) {
            return false;
        }

        // delete from neighbor array
        s._neighbors.splice(s._neighbors.indexOf(target), 1);
        t._neighbors.splice(t._neighbors.indexOf(source), 1);
        --this.edgeCount;

        return true;
    };

    /**
     * Graph.weight: return the weight of the specified edge/node
     * the weight of an edge is defined as the weight of the source node
     * @source: ID of the node to check
     */
    Graph.prototype.weight = function(source) {
        return this.nodes[source]._weight;
    };

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
        var keys = Object.keys(graph.nodes);
        // for (var i in keys) {
        for (var i = 0; i < keys.length; i++) {
            var n = graph.nodes[keys[i]];
            // should have non-negative weight and type between 1 and 6
            _assert(n._weight >= 0, 'Negative Weight (' + n._weight + ')');
            _assert(n._nType > 0 && n._nType <= 9, 'Irregular Type (' +
                n._nType + ')');

            // should have consistent edges and no self edges
            for (var j = 0; j < n._neighbors.length; j++) {
                numEdges++; // count number of edges (should be double)
                var k = graph.nodes[n._neighbors[j]];

                _assert(k._id !== n._id, 'Cannot have self edge (' +
                    n._id + ')');

                _assert(k._neighbors.includes(n._id), 'Inconsisent Edge (' +
                    n._id + ',' + k._id + ')');
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