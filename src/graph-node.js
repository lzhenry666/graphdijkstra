// graph-node.js
(function() {
    'use strict';

    /**
     * Node
     * create a new node with @id @neighbors, @weight, and @nType
     * @props: object of properties for the node (optional), valid keys are:
     *    @weight: the weight of the node to create (i.e., distance in path algorithm)
     *    @neighbors: list of node ids that are the neighbors
     *    @nType:  an integer that represents the type of nodes (e.g., an enumeration)
     */
    var Node = function(id, props) {
        this._id = id;
        this._weight = props.weight || 0;
        this._neighbors = props.neighbors || [];
        this._nType = props.nType || 0;
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
                this._neighbors = value;
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