/**
 * @file Provides a data structure for a simple undirected graph
 * @name graph.js
 * @ignore
 */
(function() {
    'use strict';

    var GraphNode = require('./graph-node.js');
    var union = require('lodash/union');

    /**
     * A simple undirected graph object with nodes and implicit edges
     *
     * @constructor
     *
     * @property {Object} nodes The nodes in the graph
     * @property {number} nodeCount The number of nodes
     * @property {number} edgeCount The number of edges
     *
     * @param {Object} [graph] The graph to initialize
     * @param {Array<GraphNode>} graph.nodes The nodes of the graph - must have **id**, and
     * can optionally have **weight**, **nType**, and **neighbors**
     * @param {Array<Array>} graph.edges The edges of the graph - two element array
     * of IDs of the nodes on each end of the edge
     *
     * @example <caption>Example valid graph parameter</caption>
     * { nodes: [
     *     { id: 1, props: { weight: 0, nType: 1 } },
     *     { id: 2, props: { weight: 0, nType: 1 } },
     *     { id: 3, props: { weight: 1, nType: 2 } },
     *     { id: 4, props: { weight: 2, nType: 2 } }
     * ],
     * edges: [
     *     [1, 3],
     *     [3, 4],
     *     [4, 2]
     * ] }
     */
    var Graph = function(graph) {
        var i = 0;

        graph = graph || { nodes: [], edges: [] }; // empty graph if no parameter
        this._nodes = {}; // initialize nodes to empty
        this._nodeCount = 0; // initialize node count to 0
        this._edgeCount = 0; // initialize edge count to 0

        // no graph supplied, return
        if (!graph) {
            return;
        }

        // handle invalid graph parameter format
        if (!('nodes' in graph)) {
            throw new Error('Invalid graph format: must specify array \'nodes\' with keys' +
                ' \'id\' and \'props\' (\'props\' has keys \'weight\', \'nType\', \'neighbors\')');
        }
        if (!('edges' in graph)) {
            throw new Error('Invalid graph format: must specify array \'edges\' with elements' +
                ' of the form [ sourceID, targetID ]');
        }

        // graph is supplied, initialize to that
        // add each of the nodes in the supplied graph
        for (i = 0; i < graph.nodes.length; i++) {
            var nodeVals = graph.nodes[i];
            var nodeProps = {
                weight: nodeVals.weight,
                nType: nodeVals.nType,
                neighbors: nodeVals.neighbors
            };
            if (this.exists(nodeVals.id)) {
                // update node (was created earlier by a neighbor specification)
                var node = this.find(nodeVals.id);
                nodeProps.neighbors = union(node.neighbors, nodeProps.neighbors);
                this.update(nodeVals.id, nodeProps);
                _fixConsistency(this, node);
            } else {
                this.addNode(nodeVals.id, nodeProps); // create new
            }
        }
        // add each of the edges in the supplied graph
        for (i = 0; i < graph.edges.length; i++) {
            var source = graph.edges[i][0];
            var target = graph.edges[i][1];
            this.addOrCreateEdge(source, target);
        }
    };


    // define getters and setters for Graph's properties
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
        }
    });

    /**
     * Find a node in the graph
     *
     * @param {number} id The ID of the node to find
     * @returns {GraphNode} The node if found, null otherwise
     */
    Graph.prototype.find = function(id) {
        return this.exists(id) ? this.nodes[id] : null;
    };

    /**
     * Check if a node exists in the graph
     *
     * @param {number} id The ID of the node to check
     * @returns {boolean} True if a node with the ID exists, false otherwise
     */
    Graph.prototype.exists = function(id) {
        return (id in this.nodes) && (this.nodes[id] instanceof GraphNode);
    };

    /**
     * Add a new {@link GraphNode} but do not overwrite an existing one
     *
     * @param {number} id The ID of the node to add
     * @param {Object} props The properties of the new node
     * @param {number} props.weight The weight of the node
     * @param {number} props.nType The type of the node
     * @param {Array<number>} props.neighbors The neighbors of the node
     *
     * @returns {GraphNode} The added (or pre-existing) node
     */
    Graph.prototype.addNode = function(id, props) {
        props = props || {};

        // only add node if it does not already exist
        // do not overwrite existing properties
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
     * Delete a node from the graph
     *
     * @param {number} id The ID of the node to delete
     *
     * @returns {GraphNode} The deleted node or null it one with that ID does not exist
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
     * Perform a function on each node in the graph
     *
     * @param {function} fn The function to perform on each node
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
     * Perform a function on each neighbor of a node
     *
     * @param {number} id The ID of the node whose neighbors should be acted on
     * @param {function} fn The function to perform on each neighbor of the node
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
     * Add a new undirected edge by connecting two nodes that both exist.
     *
     * Does **not** allow self edges by way of being a simple graph
     *
     * @param {number} source ID of one end of the edge
     * @param {number} target ID of the other edge of the edge
     *
     * @returns {boolean} True if able to add edge, false otherwise (i.e., self
     * edge, redundant, or invalid source/target)
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
     * The same as **addEdge**, but will create new nodes if source or target does not exist
     *
     * @param {number} source ID of one end of the edge
     * @param {number} target ID of the other edge of the edge
     *
     * @returns {boolean} True if able to add edge, false otherwise (i.e., self
     * edge, redundant, or invalid source/target)
     */
    Graph.prototype.addOrCreateEdge = function(source, target) {
        // add source/target nodes if necessary
        this.addNode(source);
        this.addNode(target);

        // add the edge
        return this.addEdge(source, target);
    };

    /**
     * Delete an edge from the graph
     *
     * @param {number} source ID of one end of the edge to delete
     * @param {number} target ID of the other edge of the edge to delete
     *
     * @returns {boolean} True if able to delete edge, false otherwise (i.e., edge does not exist)
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
     * Check if two nodes are connected by an edge
     *
     * @param {number} source ID of one node
     * @param {number} target ID of the other node
     *
     * @returns {boolean} True if they are connected, false otherwise
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
     * Update the properties of a node
     *
     * @param {number} id The ID of the node to update
     * @param {Object} props The new properties of the node
     * @param {number} props.weight The new weight of the node
     * @param {number} props.nType The new type of the node
     * @param {Array<number>} props.neighbors The new neighbors of the node
     *
     * @returns {GraphNode} The updated node, or null if unable to update or find
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

    /**
     * Fixes the inconsistencies in the specified graph caused by the neighbors
     * of node by adding the necessary edges
     * @private
     *
     * @param {Graph} graph The graph to work on
     * @param {GraphNode} node The node whose inconsistencies should be fixed
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