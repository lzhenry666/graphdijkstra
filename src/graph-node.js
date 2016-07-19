/**
 * graph-node.js
 * 07/08/16
 */
(function() {
    'use strict';

    // default node properties
    var DEFAULTS = {
        weight: 0,
        nType: 0,
        neighbors: []
    };

    /**
     * GraphNode
     * create a new node with @id @neighbors, @weight, and @nType
     * @props: object of properties for the node (optional), valid keys are:
     *    @weight: the weight of the node to create (i.e., distance in path algorithm)
     *    @nType:  an integer that represents the type of nodes (e.g., an enumeration)
     *    @neighbors: list of node ids that are the neighbors
     */
    var GraphNode = function(id, props) {
        props = props || {};
        this._id = id;
        this._weight = props.weight || DEFAULTS.weight;
        this._nType = props.nType || DEFAULTS.nType;
        this._neighbors = (props.neighbors || DEFAULTS.neighbors).slice();
    };

    /**
     * GraphNode define properties
     */
    Object.defineProperties(GraphNode.prototype, {
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
                this._neighbors = value.slice(); // use slice to create new reference
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

    module.exports = GraphNode;
})();
