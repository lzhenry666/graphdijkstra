// graph-filled-3-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

var _chai = require('chai');

var _graph = require('../src/graph.js');

var _graph2 = _interopRequireDefault(_graph);

var _graphTests = require('./graph-tests.js');

var _graphTests2 = _interopRequireDefault(_graphTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize node and edge graph tests
describe('graph tests (initialized nodes & edges)', function () {

    var GRAPH = {
        nodes: [{ id: 1, weight: 1, nType: 4 }, { id: 2, weight: 3, nType: 1 }, { id: 3, weight: 2, nType: 0 }, { id: 4, weight: 2, nType: 6 }, { id: 5, weight: 0, nType: 4 }, { id: 6, weight: 5, nType: 3 }, { id: 7, weight: 0, nType: 3 }, { id: 8, weight: 9, nType: 3 }, { id: 9, weight: 0, nType: 4 }, { id: 10, weight: 1, nType: 7 }, { id: 11, weight: 2, nType: 4 }, { id: 12, weight: 0, nType: 0 }, { id: 13, weight: 6, nType: 9 }, { id: 14, weight: 7, nType: 8 }, { id: 15, weight: 5, nType: 9 }, { id: 16, weight: 1, nType: 1 }, { id: 17, weight: 7, nType: 1 }, { id: 18, weight: 9, nType: 6 }, { id: 19, weight: 1, nType: 1 }, { id: 20, weight: 5, nType: 2 }],
        edges: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 6], [2, 7], [3, 8], [3, 9], [3, 10], [5, 9], [5, 10], [6, 7], [7, 10], [8, 9], [8, 10], [9, 10]]
    };
    var INIT_NODES = 20;
    var INIT_EDGES = 16;

    function runBefore() {
        var graph = new _graph2.default(GRAPH); // initialize graph

        // initialize default properties
        var props = {
            neighbors: [],
            weight: 0,
            nType: 1
        };

        return {
            graph: graph,
            props: props
        };
    }

    var graph = void 0;
    var props = void 0;

    beforeEach(function () {
        var results = runBefore();
        graph = results.graph;
        props = results.props;
    });

    after(function () {
        return graph = undefined;
    });

    _graphTests2.default.run(INIT_NODES, INIT_EDGES, runBefore);

    it('it should initialize with the correct nodes', function () {
        for (var i = 0; i < GRAPH.nodes.length; i++) {
            var node = graph.find(GRAPH.nodes[i].id);
            var props = {
                weight: GRAPH.nodes[i].weight,
                nType: GRAPH.nodes[i].nType,
                neighbors: node.neighbors
            };
            _graphTests2.default.testNode(graph, GRAPH.nodes[i].id, props, node);
        }
    });

    it('it should initialize with the correct edges', function () {
        for (var i = 0; i < GRAPH.edges.length; i++) {
            _graphTests2.default.testEdge(graph, GRAPH.edges[i][0], GRAPH.edges[i][1]);
        }
    });

    it('it should not duplicate or overwrite nodes', function () {
        var node = graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(INIT_NODES);
        graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(INIT_NODES);

        var propsNode = {
            weight: 1,
            nType: 4,
            neighbors: [2, 3, 4]
        };
        (0, _chai.expect)(node).to.eql(graph.find(1));
        _graphTests2.default.nodeHelper(1, propsNode, node);
    });
});