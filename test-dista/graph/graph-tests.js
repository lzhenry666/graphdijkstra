// graph-tests.js
'use strict';

/* global it, beforeEach */
/* jshint expr: true */

var _chai = require('chai');

// helper functions
var nodeHelper = function nodeHelper(id, props, node) {
    (0, _chai.expect)(node).to.eql({
        _id: id,
        _neighbors: props.neighbors,
        _weight: props.weight,
        _nType: props.nType
    });

    (0, _chai.expect)(node.id).to.equal(id);
    (0, _chai.expect)(node.neighbors).to.eql(props.neighbors);
    (0, _chai.expect)(node.weight).to.equal(props.weight);
    (0, _chai.expect)(node.nType).to.equal(props.nType);
};

var testNode = function testNode(graph, id, props, node) {
    (0, _chai.expect)(graph.exists(id)).to.be.true;

    var found = graph.find(id);
    (0, _chai.expect)(found).to.eql(node);

    nodeHelper(id, props, node);
    nodeHelper(id, props, found);
};

var testEdge = function testEdge(graph, s, t) {
    (0, _chai.expect)(graph.connected(s, t)).to.be.true;
    (0, _chai.expect)(graph.connected(t, s)).to.be.true;
    (0, _chai.expect)(graph.find(s).neighbors).to.include.members([t]);
    (0, _chai.expect)(graph.find(t).neighbors).to.include.members([s]);
};

//------------------------------------

// common base unit tests
var run = function run(initNodes, initEdges, runBefore) {
    var graph = void 0;
    var props = void 0;

    beforeEach(function () {
        var results = runBefore();
        graph = results.graph;
        props = results.props;

        // check initialized graph
        initNodes > 0 ? (0, _chai.expect)(graph.nodes).to.not.be.empty : (0, _chai.expect)(graph.nodes).to.be.empty;
        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes);
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges);
    });

    it('it should initialize with ' + initNodes + ' nodes', function () {
        if (initNodes > 0) {
            (0, _chai.expect)(graph.nodes).to.not.be.empty;
        } else {
            (0, _chai.expect)(graph.nodes).to.be.empty;
        }
        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes);
    });

    it('it should initialize with ' + initEdges + ' edges', function () {
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges);
    });

    it('it should add a node (without neighbors)', function () {
        var node = graph.addNode(initNodes + 1, props);

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 1);
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges);

        testNode(graph, initNodes + 1, props, node);
    });

    it('it should add many nodes', function () {
        for (var i = 1; i <= 10; i++) {
            var node = graph.addNode(initNodes + i, props);

            (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + i);
            (0, _chai.expect)(graph.edgeCount).to.equal(initEdges);

            testNode(graph, initNodes + i, props, node);
        }

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 10);
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges);
    });

    it('it should add a node (with neighbors)', function () {
        props.neighbors = [initNodes + 2, initNodes + 3, initNodes + 4];
        var propsNeighbor = {
            weight: 0,
            nType: 0,
            neighbors: [initNodes + 1]
        };
        var node = graph.addNode(initNodes + 1, props);

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 4);
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 3);

        testNode(graph, initNodes + 1, props, node);
        testNode(graph, initNodes + 2, propsNeighbor, graph.find(initNodes + 2));
        testNode(graph, initNodes + 3, propsNeighbor, graph.find(initNodes + 3));
        testNode(graph, initNodes + 4, propsNeighbor, graph.find(initNodes + 4));
    });

    it('it should iterate through all nodes', function () {
        graph.eachNode(function (node) {
            (0, _chai.expect)(graph.find(node.id)).to.not.be.null;
            (0, _chai.expect)(node.id).to.not.be.null;
        });
    });

    it('it should add edges', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(initNodes + i, props);
        }

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 10);

        (0, _chai.expect)(graph.addEdge(initNodes + 1, initNodes + 2)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 1);
        testEdge(graph, initNodes + 1, initNodes + 2);

        (0, _chai.expect)(graph.addEdge(initNodes + 2, initNodes + 3)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);
        testEdge(graph, initNodes + 2, initNodes + 3);

        (0, _chai.expect)(graph.addEdge(initNodes + 2, initNodes + 4)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 3);
        testEdge(graph, initNodes + 2, initNodes + 4);

        (0, _chai.expect)(graph.addEdge(initNodes + 10, initNodes + 1)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 4);
        testEdge(graph, initNodes + 10, initNodes + 1);

        (0, _chai.expect)(graph.addEdge(initNodes + 9, initNodes + 3)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 5);
        testEdge(graph, initNodes + 9, initNodes + 3);

        (0, _chai.expect)(graph.addEdge(initNodes + 8, initNodes + 9)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 6);
        testEdge(graph, initNodes + 8, initNodes + 9);

        (0, _chai.expect)(graph.addEdge(initNodes + 6, initNodes + 7)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 7);
        testEdge(graph, initNodes + 6, initNodes + 7);

        (0, _chai.expect)(graph.addEdge(initNodes + 5, initNodes + 7)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 8);
        testEdge(graph, initNodes + 5, initNodes + 7);

        (0, _chai.expect)(graph.addEdge(initNodes + 2, initNodes + 10)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 9);
        testEdge(graph, initNodes + 2, initNodes + 10);

        (0, _chai.expect)(graph.addEdge(initNodes + 1, initNodes + 6)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 10);
        testEdge(graph, initNodes + 1, initNodes + 6);
    });

    it('it should handle adding edges if node does not exist', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(initNodes + i, props);
        }
        graph.addEdge(initNodes + 1, initNodes + 2);
        graph.addEdge(initNodes + 2, initNodes + 3);

        (0, _chai.expect)(graph.addEdge(initNodes + 3, initNodes + 11)).to.be.false;
        (0, _chai.expect)(graph.find(initNodes + 3).neighbors).to.not.include.members([initNodes + 11]);
        (0, _chai.expect)(graph.addEdge(initNodes + 14, initNodes + 7)).to.be.false;
        (0, _chai.expect)(graph.find(initNodes + 7).neighbors).to.not.include.members([initNodes + 14]);
        (0, _chai.expect)(graph.addEdge(initNodes + 14, initNodes + 17)).to.be.false;

        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);
    });

    it('it should not duplicate edges', function () {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(initNodes + i, props);
        }
        (0, _chai.expect)(graph.addEdge(initNodes + 1, initNodes + 2)).to.be.true;
        (0, _chai.expect)(graph.addEdge(initNodes + 2, initNodes + 3)).to.be.true;

        (0, _chai.expect)(graph.addEdge(initNodes + 2, initNodes + 3)).to.be.false;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);

        (0, _chai.expect)(graph.addEdge(initNodes + 3, initNodes + 2)).to.be.false;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);
    });

    it('it should fix inconsistencies when adding an edge', function () {
        props.neighbors = [initNodes + 1, initNodes + 2];
        graph.addNode(initNodes + 3, props);

        graph.find(initNodes + 1).neighbors = []; // create inconsistency
        graph.find(initNodes + 2).neighbors = []; // create inconsistency

        (0, _chai.expect)(graph.addEdge(initNodes + 2, initNodes + 3)).to.be.true;
        testEdge(graph, initNodes + 2, initNodes + 3);

        (0, _chai.expect)(graph.addEdge(initNodes + 3, initNodes + 1)).to.be.true;
        testEdge(graph, initNodes + 3, initNodes + 1);

        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);
    });

    it('it should not allow self edges', function () {
        graph.addNode(initNodes + 1, props);

        (0, _chai.expect)(graph.addEdge(initNodes + 1, initNodes + 1)).to.be.false;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges);
    });

    it('it should delete nodes (without edges)', function () {
        graph.addNode(initNodes + 1, props);
        var props2 = {
            weight: 10,
            nType: 7,
            neighbors: []
        };
        graph.addNode(initNodes + 2, props2);

        var node = graph.deleteNode(initNodes + 1);
        (0, _chai.expect)(node).to.not.be.null;
        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 1);
        nodeHelper(node.id, props, node);

        node = graph.deleteNode(initNodes + 2);
        (0, _chai.expect)(node).to.not.be.null;
        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes);
        nodeHelper(node.id, props2, node);
    });

    it('it should handle deletion if node does not exist', function () {
        var node = graph.deleteNode(initNodes + 2);

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes);
        (0, _chai.expect)(node).to.be.null;

        graph.addNode(initNodes + 2, props);

        node = graph.deleteNode(initNodes + 1);
        (0, _chai.expect)(node).to.be.null;

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 1);
    });

    it('it should delete nodes with edges, maintaining consistency', function () {
        props.neighbors = [initNodes + 2, initNodes + 3, initNodes + 4];
        graph.addNode(initNodes + 1, props);
        graph.addEdge(initNodes + 2, initNodes + 3);

        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 4);
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 4);
        testEdge(graph, initNodes + 1, initNodes + 2);
        testEdge(graph, initNodes + 1, initNodes + 3);
        testEdge(graph, initNodes + 1, initNodes + 4);
        testEdge(graph, initNodes + 2, initNodes + 3);

        (0, _chai.expect)(graph.deleteNode(initNodes + 1)).to.not.be.null;
        (0, _chai.expect)(graph.nodeCount).to.equal(initNodes + 3);
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 1);

        (0, _chai.expect)(graph.connected(initNodes + 1, initNodes + 2)).to.be.false;
        (0, _chai.expect)(graph.connected(initNodes + 1, initNodes + 3)).to.be.false;
        (0, _chai.expect)(graph.connected(initNodes + 1, initNodes + 4)).to.be.false;
        (0, _chai.expect)(graph.connected(initNodes + 2, initNodes + 3)).to.be.true;
    });

    it('it should delete edges', function () {
        props.neighbors = [initNodes + 2, initNodes + 3, initNodes + 4];
        graph.addNode(initNodes + 1, props);

        (0, _chai.expect)(graph.deleteEdge(initNodes + 1, initNodes + 2)).to.be.true;

        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);
        (0, _chai.expect)(graph.connected(initNodes + 1, initNodes + 2)).to.be.false;
    });

    it('it should handle deletion if edge does not exist', function () {
        props.neighbors = [initNodes + 2, initNodes + 3, initNodes + 4];
        graph.addNode(initNodes + 1, props);

        (0, _chai.expect)(graph.deleteEdge(initNodes + 1, initNodes + 2)).to.be.true;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);

        (0, _chai.expect)(graph.deleteEdge(initNodes + 2, initNodes + 3)).to.be.false;
        (0, _chai.expect)(graph.edgeCount).to.equal(initEdges + 2);
    });
};

module.exports = {
    run: run,
    testNode: testNode,
    nodeHelper: nodeHelper,
    testEdge: testEdge
};