// graph-node.js
(function() {
    'use strict';

    /**
     * Node
     * create a new node with @id, @neighbors, @weight, and @nType
     * @neighbors: list of node ids that are the neighbors
     * @nType: is an integer that represents the type of nodes (e.g., an enumeration)
     */
    var Node = function(id, neighbors, weight, nType) {
        // var node = {}; // create a new node

        this._id = id; // node's ID
        this._neighbors = neighbors || []; // neighbors of this node (i.e., list of node IDs)
        this._weight = weight || 0; // weight of this node (e.g., distance)
        this._nType = nType || 0; // node's type (an enumeration)

        // return node;
    };

    /**
     * Node define properties
     */
    Object.defineProperties(Node.prototype, {
        // id
        id: {
            get: function() { // getter
                return this._id;
            },
        },
        // neighbors
        neighbors: {
            writable: true,
            get: function() { // getter
                return this._neighbors;
            },
        },
        // weight
        weight: {
            writable: true,
            get: function() { // getter
                return this._weight;
            },
        },
        // nType
        nType: {
            writable: true,
            get: function() { // getter
                return this._nType;
            }
        }
    });

    module.exports = Node;
})();