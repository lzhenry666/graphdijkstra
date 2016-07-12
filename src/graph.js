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
     * @props: object of properties for the graph (optional), valid keys are:
     *    @debug: only verify if debug is set to true (defaults to false)
     *    @graph: a JSON representation of the graph to initialize
     */
    var Graph = function(props) {
        props.debug = props.debug || false;
        this._nodes = !!props.graph ? props.graph.nodes : {}; // set of nodes in graph
        this._nodeCount = !!props.graph ? props.graph.nodeCount : 0; // number of nodes
        this._edgeCount = !!props.graph ? props.graph.edgeCount : 0; // number of edges

        // verify the graph if debug is true
        if (props.debug && !!props.graph) {
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
     * return the added (or existing) node with @id
     */
    Graph.prototype.addNode = function(id, props) {
        _assert(!!id, 'Cannot create a node without an id');

        // only add node if it does not already exist (TODO: might change)
        if (!this.exists(id)) {
            // create & add new node
            var node = new Node(id, props.neighbors, props.weight, props.nType);

            // add this node as a neighbor of all of its neighbors
            for (var i = 0; i < node.neighbors.length; i++) {
                var n = this.nodes[node.neighbors[i]]; // get node
                n.neighbors.push(id);
            }

            this.nodes[id] = node;
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
     * Graph.addEdge: connect two nodes (undirected edges)
     * @source: ID of one end of the edge
     * @target: ID of the other end of the edge
     */
    Graph.prototype.addEdge = function(source, target) {
        // create (or find) the source & target nodes
        var s = this.addNode(source);
        var t = this.addNode(target);

        // add each node to the other's edge list
        s.neighbors.push(t.id);
        t.neighbors.push(s.id);
        ++this.edgeCount;

        return true;
    };

    /**
     * Graph.deleteEdge: delete an edge from the graph. true if successful, false otherwise
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

        // delete from neighbor arrays
        s.neighbors.splice(s.neighbors.indexOf(target), 1);
        t.neighbors.splice(t.neighbors.indexOf(source), 1);
        --this.edgeCount;

        return true;
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
        var keys = Object.keys(graph.nodes);
        // for (var i in keys) {
        for (var i = 0; i < keys.length; i++) {
            var n = graph.nodes[keys[i]];
            // should have non-negative weight and type between 1 and 6
            _assert(n.weight >= 0, 'Negative Weight (' + n.weight + ')');
            _assert(n.nType > 0 && n.nType <= 9, 'Irregular Type (' +
                n.nType + ')');

            // should have consistent edges and no self edges
            for (var j = 0; j < n.neighbors.length; j++) {
                numEdges++; // count number of edges (should be double)
                var k = graph.nodes[n.neighbors[j]];

                _assert(k._id !== n.id, 'Cannot have self edge (' +
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