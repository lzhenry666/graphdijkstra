// graph-empty-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

var _chai = require('chai');

var _graph = require('../src/graph.js');

var _graph2 = _interopRequireDefault(_graph);

var _graphTests = require('./graph-tests.js');

var _graphTests2 = _interopRequireDefault(_graphTests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialize empty graph tests
describe('graph tests (empty)', function () {
    var INIT_NODES = 0;
    var INIT_EDGES = 0;

    function runBefore() {
        var graph = new _graph2.default(); // initialize empty graph

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

    it('it should not duplicate or overwrite nodes', function () {
        var node = graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);
        graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);

        props.weight = 10;
        graph.addNode(1, props);
        (0, _chai.expect)(graph.nodeCount).to.equal(1);

        props.weight = 0;
        _graphTests2.default.testNode(graph, 1, props, node);
    });
});