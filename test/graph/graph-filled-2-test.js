// graph-filled-2-test.js
'use strict';

/* global it, describe, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import GraphTests from './graph-tests.js';

// initialize edge only graph tests
describe('graph tests (initialized edges)', () => {

    const GRAPH = {
        nodes: [],
        edges: [
            [1, 2],
            [1, 3],
            [2, 3],
            [4, 5],
            [4, 10],
            [6, 2],
            [7, 10],
            [8, 9],
            [10, 1]
        ]
    };
    const INIT_NODES = 10;
    const INIT_EDGES = 9;

     function runBefore() {
        let graph = new Graph({graph: GRAPH}); // initialize graph

        // initialize default properties
        let props = {
            neighbors: [],
            weight: 0,
            nType: 1
        };

        return {
            graph: graph,
            props: props
        };
    }

    let graph;
    let props;

    beforeEach(() => {
        let results = runBefore();
        graph = results.graph;
        props = results.props;
    });

    after(() => graph = undefined);

    GraphTests.run(INIT_NODES, INIT_EDGES, runBefore);

    it('it should initialize with the correct nodes', () => {
        for (var i = 0; i < GRAPH.edges.length; i++) {
            expect(graph.find(GRAPH.edges[i][0])).to.not.be.null;
            expect(graph.find(GRAPH.edges[i][1])).to.not.be.null;
        }
    });

    it('it should initialize with the correct edges', () => {
        for (var i = 0; i < GRAPH.edges.length; i++) {
            GraphTests.testEdge(graph, GRAPH.edges[i][0], GRAPH.edges[i][1]);
        }
    });

    it('it should not duplicate or overwrite nodes', () => {
        var node = graph.addNode(1, props);
        expect(graph.nodeCount).to.equal(INIT_NODES);
        graph.addNode(1, props);
        expect(graph.nodeCount).to.equal(INIT_NODES);

        var propsNode = {
            weight: 0,
            nType: 0,
            neighbors: [2, 3, 10]
        };
        expect(node).to.eql(graph.find(1));
        GraphTests.nodeHelper(1, propsNode, node);
    });
});
