/**
 * graph.js
 * 05/31/16
 *
 * a simple undirected graph to represent the office
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var GraphNode = require('./graph-node.js');
    var union = require('lodash/union');

    /**
     * Graph
     * @params: (optional) object of parameters for initializing graph, valid keys are:
     *    @graph: a JSON representation of the graph to initialize
     *    * the graph should an object with two arrays, nodes and edges.
     *    * nodes: an array of objects with integer id and object props (keys: weight, nType, and neighbors)
     *    * edges: an array of length 2 arrays representing the source and target ids for the edge
     */
    var Graph = function(params) {
        var i = 0;

        params = params || {};
        this._nodes = {}; // initialize nodes to empty
        this._nodeCount = 0; // initialize node count to 0
        this._edgeCount = 0; // initialize edge count to 0

        // no graph supplied, return
        if (!params.graph) {
            return;
        }

        // handle invalid graph parameter format
        if (!('nodes' in params.graph)) {
            throw new Error('Invalid graph format: must specify array \'nodes\' with keys' +
                ' \'id\' and \'props\'\n *\'props\' has keys \'weight\', \'nType\', \'neighbors\'');
        }
        if (!('edges' in params.graph)) {
            throw new Error('Invalid graph format: must specify array \'edges\' with elements' +
                ' of the form [ sourceID, targetID ]');
        }

        // graph is supplied, initialize to that
        // add each of the nodes in the supplied graph
        for (i = 0; i < params.graph.nodes.length; i++) {
            var nodeVals = params.graph.nodes[i];
            if (this.exists(nodeVals.id)) {
                // update node (was created earlier by a neighbor specification)
                var node = this.find(nodeVals.id);
                nodeVals.props.neighbors = union(node.neighbors, nodeVals.props.neighbors);
                this.update(nodeVals.id, nodeVals.props);
                _fixConsistency(this, node);
            }
            else {
                this.addNode(nodeVals.id, nodeVals.props); // create new
            }
        }
        // add each of the edges in the supplied graph
        for (i = 0; i < params.graph.edges.length; i++) {
            var source = params.graph.edges[i][0];
            var target = params.graph.edges[i][1];
            this.addOrCreateEdge(source, target);
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
     * Graph.find: finds the node specified by id. ID should exist (and not be an invalid property)
     * @id: the ID of the node to find
     * @return the node if found, null otherwise
     */
    Graph.prototype.find = function(id) {
        return this.exists(id) ? this.nodes[id] : null;
    };

    /**
     * Graph.exists: checks if the specified ID already exists in the graph
     * @id: the ID of the node to check
     * returns true if it is a node, false otherwise
     */
    Graph.prototype.exists = function(id) {
        return (id in this.nodes) && (this.nodes[id] instanceof GraphNode);
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
        props = props || {};

        // only add node if it does not already exist
        // do not overwrite existing properties (TODO: might change)
        if (!this.exists(id)) {
            // create & add new node
            var node = new GraphNode(id, props);
            this.nodes[id] = node;

            ++this.nodeCount;
            _fixConsistency(this, node); // fix possible inconsistencies
        }
        return this.nodes[id];
    };

    /**
     * Graph.deleteNode: delete a node from the graph. true if successful
     * @id: the ID of the node to delete (required)
     * return the node that was deleted or null if it does not exist
     */
    Graph.prototype.deleteNode = function(id) {
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
     * Graph.eachNode: perform a function on each node in the graph
     * @fn: the function to perform on each node in the graph
     */
    Graph.prototype.eachNode = function(fn) {
        // jshint forin: false
        for (var id in this.nodes) {
            var node = this.find(id);
            if (!!node) {
                fn(node);
            } else {
                continue;
            }
        }
    };

    /**
     * Graph.eachNeighbor: perform a function on each neighbor of the node
     * @id: the id of the node whose neighbors will be acted on
     * @fn: the function to perform on each neighbor of the node
     */
    Graph.prototype.eachNeighbor = function(id, fn) {
        if (!this.exists(id)) {
            return; // return if node does not exist
        }

        var node = this.find(id);
        // jshint forin: false
        for (var nID in node.neighbors) {
            var neigh = this.find(nID);
            if (!!neigh) {
                fn(neigh);
            } else {
                continue;
            }
        }
    };

    /**
     * Graph.addEdge: connect two nodes (undirected edge) that both exist
     * do not allow self edges (by nature of being a simple graph)
     * @source: ID of one end of the edge
     * @target: ID of the other end of the edge
     * return true if able to add edge, false otherwise (i.e., self edge, invalid, or redundant)
     */
    Graph.prototype.addEdge = function(source, target) {
        // is this a self edge?
        if (source === target) {
            // console.warn('Cannot add self edge in simple graph');
            return false;
        }

        // find the source & target nodes
        var s = this.find(source);
        var t = this.find(target);

        // return if invalid edge (i.e., either source or target does not exist)
        if (!s || !t) {
            // console.warn('Unable to add edge (' + source + ',' + target + '): node DNE');
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
        } else {
            return false; // return false for redundant edges
        }
        return true; // return true
    };

    /**
     * Graph.addOrCreateEdge: the same as addEdge(), but will create nodes that do not exist
     * do not allow self edges (by nature of being a simple graph)
     * @source: ID of one end of the edge
     * @target: ID of the other end of the edge
     * return true if able to add or create the edge, false otherwise (i.e., self edge, invalid, or redundant)
     */
    Graph.prototype.addOrCreateEdge = function(source, target) {
        // create nodes if necessary
        if (!this.exists(source)) {
            this.addNode(source);
        }
        if (!this.exists(target)) {
            this.addNode(target);
        }

        // add the edge
        return this.addEdge(source, target);
    };

    /**
     * Graph.deleteEdge: delete an edge from the graph
     * @source: ID of one end of the edge to delete
     * @target: ID of the other end of the edge to delete
     * return true if successful, false otherwise
     */
    Graph.prototype.deleteEdge = function(source, target) {
        var s = this.find(source); // the node corresponding to source ID
        var t = this.find(target); // the node corresponding to target ID

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
        var s = this.find(source); // get source node
        var t = this.find(target); // get target node
        if (!s || !t) {
            return false; // clearly not connected if does not exist
        }
        return s.neighbors.indexOf(target) >= 0 && t.neighbors.indexOf(source) >= 0;
    };

    /**
     * Graph.update: set the properties of the node specified by @id
     * @id: id of the node to update
     * @props: object of properties for the node, valid keys are:
     *    @weight: the weight of the node to create
     *    @nType: the type of the node to create
     *    @neighbors: the neighbors of the node to add (create node if it does not exist)
     * @return the updated node on success, or null if unable to update/find
     */
    Graph.prototype.update = function(id, props) {
        var node = this.find(id);

        if (!node) {
            return null;
        }

        node.weight = props.weight || node.weight;
        node.nType = props.nType || node.nType;
        node.neighbors = props.neighbors || node.neighbors;

        return node;
    };

    module.exports = Graph;

    //------------------------------------------------//

    /** _fixConsistency: fixes the inconsistencies in @graph caused by the neighbors
     * of @node by adding the necessary edges
     */
    function _fixConsistency(graph, node) {
        // ensure consistency of graph by adding necessary edges to specified neighbors
        for (var i = 0; i < node.neighbors.length; i++) {
            var neigh = graph.addNode(node.neighbors[i]); // create neighbor (if necessary)

            // fix inconsistent edge between new node and its neighbor
            if (graph.addEdge(node.id, neigh.id)) {
                ++graph.edgeCount; // one more edge! (add edge will not account for it)
            }
        }
    }
})();

/*----------------------------------------------------------------------------*/