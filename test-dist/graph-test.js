'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

var _chai = require('chai');

var _graph = require('../dist/graph.js');

var _graph2 = _interopRequireDefault(_graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize empty graph tests
describe('empty graph tests', function () {

    var graph = void 0;
    var props = void 0;

    beforeEach(function () {
        graph = new _graph2.default(); // initialize empty graph

        // initialize default properties
        props = {
            neighbors: [],
            weight: 0,
            nType: 1
        };

        // initialize empty graph
        (0, _chai.expect)(graph.nodes).to.empty;
        (0, _chai.expect)(graph.nodeCount).to.equal(0);
        (0, _chai.expect)(graph.edgeCount).to.equal(0);
    });

    after(function () {
        return graph = undefined;
    });

    it('it should initialize with 0 nodes', function () {
        (0, _chai.expect)(graph.nodes).to.empty;
        (0, _chai.expect)(graph.nodeCount).to.equal(0);
    });

    it('it should initialize with 0 edges', function () {
        (0, _chai.expect)(graph.edgeCount).to.equal(0);
    });

    it('it should add a node (without neighbors)', function () {
        var node = graph.addNode(1, props);

        (0, _chai.expect)(graph.nodeCount).to.equal(1);
        (0, _chai.expect)(graph.edgeCount).to.equal(0);

        _testNode(1, props, node);
    });

    it('it should add many nodes', function () {
        for (var i = 1; i <= 10; i++) {
            var node = graph.addNode(i, props);

            (0, _chai.expect)(graph.nodeCount).to.equal(i);
            (0, _chai.expect)(graph.edgeCount).to.equal(0);

            _testNode(i, props, node);
        }

        (0, _chai.expect)(graph.nodeCount).to.equal(10);
        (0, _chai.expect)(graph.edgeCount).to.equal(0);
    });

    it('it should add a node (with neighbors)', function () {
        props.neighbors = [2, 3, 4];
        var propsNeighbor = {
            weight: 0,
            nType: 0,
            neighbors: [1]
        };
        var node = graph.addNode(1, props);

        (0, _chai.expect)(graph.nodeCount).to.equal(4);
        (0, _chai.expect)(graph.edgeCount).to.equal(3);

        _testNode(1, props, node);
        _testNode(2, propsNeighbor, graph.find(2));
        _testNode(3, propsNeighbor, graph.find(3));
        _testNode(4, propsNeighbor, graph.find(4));
    });

    it('it should not duplicate or overwrite nodes', function () {
        var node = graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);
        graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);

        props.weight = 10;
        graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);

        props.weight = 0;
        _testNode(1, props, node);
    });

    it('it should add edges', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(i, props);
        }
        (0, _chai.expect)(graph.nodeCount).to.equal(10);

        (0, _chai.expect)(graph.addEdge(1, 2)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(1);
        _testEdge(1, 2);

        (0, _chai.expect)(graph.addEdge(2, 3)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(2);
        _testEdge(2, 3);

        (0, _chai.expect)(graph.addEdge(2, 4)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(3);
        _testEdge(2, 4);

        (0, _chai.expect)(graph.addEdge(10, 1)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(4);
        _testEdge(10, 1);

        (0, _chai.expect)(graph.addEdge(9, 3)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(5);
        _testEdge(9, 3);

        (0, _chai.expect)(graph.addEdge(8, 9)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(6);
        _testEdge(8, 9);

        (0, _chai.expect)(graph.addEdge(6, 7)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(7);
        _testEdge(6, 7);

        (0, _chai.expect)(graph.addEdge(5, 7)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(8);
        _testEdge(5, 7);

        (0, _chai.expect)(graph.addEdge(2, 10)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(9);
        _testEdge(2, 10);

        (0, _chai.expect)(graph.addEdge(1, 6)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(10);
        _testEdge(1, 6);
    });

    it('it should handle adding edges if node does not exist', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(i, props);
        }
        graph.addEdge(1, 2);
        graph.addEdge(2, 3);

        (0, _chai.expect)(graph.addEdge(3, 11)).to.be.false;
        (0, _chai.expect)(graph.find(3).neighbors).to.not.include.members([11]);
        (0, _chai.expect)(graph.addEdge(14, 7)).to.be.false;
        (0, _chai.expect)(graph.find(7).neighbors).to.not.include.members([14]);
        (0, _chai.expect)(graph.addEdge(14, 17)).to.be.false;

        (0, _chai.expect)(graph.edgeCount).to.equal(2);
    });

    it('it should not duplicate edges', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(i, props);
        }
        graph.addEdge(1, 2);
        graph.addEdge(2, 3);

        (0, _chai.expect)(graph.addEdge(2, 3)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(2);

        (0, _chai.expect)(graph.addEdge(3, 2)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(2);
    });

    it('it should fix inconsistencies when adding an edge', function () {
        props.neighbors = [1, 2];
        graph.addNode(3, props);

        graph.find(1).neighbors = []; // create inconsistency (1,3)
        graph.find(2).neighbors = []; // create inconsistency (2,3)

        (0, _chai.expect)(graph.addEdge(2, 3)).to.be.true;
        _testEdge(2, 3);

        (0, _chai.expect)(graph.addEdge(3, 1)).to.be.true;
        _testEdge(3, 1);

        (0, _chai.expect)(graph.edgeCount).to.equal(2);
    });

    it('it should not allow self edges', function () {
        graph.addNode(1, props);

        (0, _chai.expect)(graph.addEdge(1, 1)).to.be.false;
        (0, _chai.expect)(graph.edgeCount).to.equal(0);
    });

    it('it should delete nodes (without edges)', function () {
        graph.addNode(1, props);
        var props2 = {
            weight: 10,
            nType: 7,
            neighbors: []
        };
        graph.addNode(2, props2);

        var node = graph.deleteNode(1);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);

        (0, _chai.expect)(node.id).to.equal(1);
        (0, _chai.expect)(node.neighbors).to.eql(props.neighbors);
        (0, _chai.expect)(node.weight).to.equal(props.weight);
        (0, _chai.expect)(node.nType).to.equal(props.nType);

        node = graph.deleteNode(2);
        (0, _chai.expect)(graph.nodeCount).to.equal(0);

        (0, _chai.expect)(node.id).to.equal(2);
        (0, _chai.expect)(node.neighbors).to.eql(props2.neighbors);
        (0, _chai.expect)(node.weight).to.equal(props2.weight);
        (0, _chai.expect)(node.nType).to.equal(props2.nType);
    });

    it('it should handle deletion if node does not exist', function () {
        var node = graph.deleteNode(2);

        (0, _chai.expect)(graph.nodeCount).to.equal(0);
        (0, _chai.expect)(node).to.be.null;

        graph.addNode(2, props);
        node = graph.deleteNode(1);

        (0, _chai.expect)(graph.nodeCount).to.equal(1);
        (0, _chai.expect)(node).to.be.null;
    });

    //------------------------------------------

    /** ensure all tests start with an empty graph */
    // function _testEmptyGraph(graph) {
    //     expect(graph.nodes).to.empty;
    //     expect(graph.nodeCount).to.equal(0);
    //     expect(graph.edgeCount).to.equal(0);
    // }

    function _testNode(id, props, node) {
        var found = graph.find(id);

        (0, _chai.expect)(graph.exists(id)).to.be.true;

        (0, _chai.expect)(found).to.eql(node);
        (0, _chai.expect)(found).to.eql({
            _id: id,
            _neighbors: props.neighbors,
            _weight: props.weight,
            _nType: props.nType
        });
        (0, _chai.expect)(found.id).to.equal(id);
        (0, _chai.expect)(found.neighbors).to.eql(props.neighbors);
        (0, _chai.expect)(found.weight).to.equal(props.weight);
        (0, _chai.expect)(found.nType).to.equal(props.nType);

        (0, _chai.expect)(node.id).to.equal(id);
        (0, _chai.expect)(node.neighbors).to.eql(props.neighbors);
        (0, _chai.expect)(node.weight).to.equal(props.weight);
        (0, _chai.expect)(node.nType).to.equal(props.nType);
    }

    function _testEdge(s, t) {
        (0, _chai.expect)(graph.connected(s, t)).to.be.true;
        (0, _chai.expect)(graph.find(s).neighbors).to.include.members([t]);
        (0, _chai.expect)(graph.find(t).neighbors).to.include.members([s]);
    }
});