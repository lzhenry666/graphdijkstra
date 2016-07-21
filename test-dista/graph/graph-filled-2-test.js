// graph-filled-2-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

var _chai = require('chai');

var _graph = require('../src/graph.js');

var _graph2 = _interopRequireDefault(_graph);

var _graphTests = require('./graph-tests.js');

var _graphTests2 = _interopRequireDefault(_graphTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize edge only graph tests
describe('graph tests (initialized edges)', function () {

    var GRAPH = {
        nodes: [],
        edges: [[1, 2], [1, 3], [2, 3], [4, 5], [4, 10], [6, 2], [7, 10], [8, 9], [10, 1]]
    };
    var INIT_NODES = 10;
    var INIT_EDGES = 9;

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
        for (var i = 0; i < GRAPH.edges.length; i++) {
            (0, _chai.expect)(graph.find(GRAPH.edges[i][0])).to.not.be.null;
            (0, _chai.expect)(graph.find(GRAPH.edges[i][1])).to.not.be.null;
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
            weight: 0,
            nType: 0,
            neighbors: [2, 3, 10]
        };
        (0, _chai.expect)(node).to.eql(graph.find(1));
        _graphTests2.default.nodeHelper(1, propsNode, node);
    });
});