'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

var _chai = require('chai');

var _graph = require('../dist/graph.js');

var _graph2 = _interopRequireDefault(_graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize empty graph tests
describe('empty graph tests', function () {

    // let graph;
    var props = {
        neighbors: [],
        weight: 0,
        nType: 1
    };

    beforeEach(function () {
        var graph = new _graph2.default();

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

    it('it should add a node (with neighbors)', function () {
        props.neighbors = [2, 3, 4];
        var node = graph.addNode(1, props);

        (0, _chai.expect)(graph.nodeCount).to.equal(1);
        (0, _chai.expect)(graph.edgeCount).to.equal(0);

        _testNode(1, props, node);
    });

    // it('it should add two nodes', () => {
    //     var props = {
    //         neighbors: [],
    //         weight: 0,
    //         nType: 1
    //     };
    //     var node1 = graph.addNode(1, props);
    //     var node2 = graph.addNode(2, props);

    //     expect(graph.nodeCount).to.equal(2);
    //     expect(graph.edgeCount).to.equal(0);

    //     _testNode(1, props, node1);
    //     _testNode(2, props, node2);

    //     expect(node1).to.not.equal(node2);
    //     expect(node1).to.not.eql(node2);
    // });

    it('it should add nodes', function () {
        (0, _chai.expect)(graph.nodeCount).to.equal(0);
        (0, _chai.expect)(graph.edgeCount).to.equal(0);

        for (var i = 1; i <= 10; i++) {
            var node = graph.addNode(i, props);

            (0, _chai.expect)(graph.nodeCount).to.equal(i);
            (0, _chai.expect)(graph.edgeCount).to.equal(0);

            _testNode(i, props, node);
        }

        (0, _chai.expect)(graph.nodeCount).to.equal(10);
        (0, _chai.expect)(graph.edgeCount).to.equal(0);
    });

    it('it should not duplicate nodes', function () {
        // graph.addNode(1, props);
    });

    it('it should add edges', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(i, props);
        }

        graph.addEdge(1, 2);
        (0, _chai.expect)(graph.edgeCount).to.equal(1);
        graph.addEdge(2, 3);
        (0, _chai.expect)(graph.edgeCount).to.equal(2);
        graph.addEdge(2, 4);
        (0, _chai.expect)(graph.edgeCount).to.equal(3);
        graph.addEdge(10, 1);
        (0, _chai.expect)(graph.edgeCount).to.equal(4);
        graph.addEdge(9, 3);
        (0, _chai.expect)(graph.edgeCount).to.equal(5);
        graph.addEdge(8, 9);
        (0, _chai.expect)(graph.edgeCount).to.equal(6);
        graph.addEdge(6, 7);
        (0, _chai.expect)(graph.edgeCount).to.equal(7);
        graph.addEdge(5, 7);
        (0, _chai.expect)(graph.edgeCount).to.equal(8);
        graph.addEdge(2, 10);
        (0, _chai.expect)(graph.edgeCount).to.equal(9);
        graph.addEdge(1, 6);
        (0, _chai.expect)(graph.edgeCount).to.equal(10);

        _testEdge(1, 2);
        _testEdge(2, 3);
        _testEdge(2, 4);
        _testEdge(10, 1);
        _testEdge(9, 3);
        _testEdge(8, 9);
        _testEdge(6, 7);
        _testEdge(5, 7);
        _testEdge(2, 10);
        _testEdge(1, 6);
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
        (0, _chai.expect)(graph.find(s).neighbors).to.include.members([t]);
        (0, _chai.expect)(graph.find(t).neighbors).to.include.members([s]);
    }
    // it('getAge', () => {
    //   expect(developer.getAge()).to.equal('99');
    // });

    // it('getWhoAmI', () => {
    //   expect(developer.getWhoAmI()).to.equal('Alex JavaScript Developer');
    // });
});