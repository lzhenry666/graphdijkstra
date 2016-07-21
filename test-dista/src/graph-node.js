'use strict';

/**
 * @file Provides a data structure for the nodes of the graph
 * @name graph-node.js
 * @ignore
 */
(function () {
    'use strict';

    // default node properties

    var DEFAULTS = {
        weight: 0,
        nType: 0,
        neighbors: []
    };

    /**
    * A node in a graph
    *
    * @constructor
    *
    * @property {number} id The ID of the node
    * @property {number} weight The weight of the node (*default 0*) (e.g., distance in path algorithm)
    * @property {number} nType An integer that represents the type of node (*default 0*) (e.g., an enumeration)
    * @property {Array<number>} neighbors A list of node IDs that are neighbors of the node (*default []*)
    *
    * @param {number} id The ID of the node to create
    * @param {Object} [props] The properties to initialize the node with
    * @param {number} props.weight The initial weight of the node
    * @param {number} props.nType The initial nType of the node
    * @param {Array<number>} props.neighbors The initial neighbors of the node
    */
    var GraphNode = function GraphNode(id, props) {
        props = props || {};
        this._id = id;
        this._weight = props.weight || DEFAULTS.weight;
        this._nType = props.nType || DEFAULTS.nType;
        this._neighbors = (props.neighbors || DEFAULTS.neighbors).slice();
    };

    // define getters and setters for GraphNodes's properties
    Object.defineProperties(GraphNode.prototype, {
        id: {
            get: function get() {
                return this._id;
            }
        },
        neighbors: {
            get: function get() {
                return this._neighbors;
            },
            set: function set(value) {
                this._neighbors = value.slice(); // use slice to create new reference
            }
        },
        weight: {
            get: function get() {
                return this._weight;
            },
            set: function set(value) {
                this._weight = value;
            }
        },
        nType: {
            get: function get() {
                return this._nType;
            },
            set: function set(value) {
                this._nType = value;
            }
        }
    });

    module.exports = GraphNode;
})();