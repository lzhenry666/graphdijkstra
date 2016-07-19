// graph-filled-3-test.js
'use strict';

/* global it, describe, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import GraphTests from './graph-tests.js';

// initialize node and edge graph tests
describe('graph tests (initialized nodes & edges)', () => {

    const GRAPH = {
        nodes: [
            {id:  1, props: {weight: 1, nType: 4} },
            {id:  2, props: {weight: 3, nType: 1} },
            {id:  3, props: {weight: 2, nType: 0} },
            {id:  4, props: {weight: 2, nType: 6} },
            {id:  5, props: {weight: 0, nType: 4} },
            {id:  6, props: {weight: 5, nType: 3} },
            {id:  7, props: {weight: 0, nType: 3} },
            {id:  8, props: {weight: 9, nType: 3} },
            {id:  9, props: {weight: 0, nType: 4} },
            {id: 10, props: {weight: 1, nType: 7} },
            {id: 11, props: {weight: 2, nType: 4} },
            {id: 12, props: {weight: 0, nType: 0} },
            {id: 13, props: {weight: 6, nType: 9} },
            {id: 14, props: {weight: 7, nType: 8} },
            {id: 15, props: {weight: 5, nType: 9} },
            {id: 16, props: {weight: 1, nType: 1} },
            {id: 17, props: {weight: 7, nType: 1} },
            {id: 18, props: {weight: 9, nType: 6} },
            {id: 19, props: {weight: 1, nType: 1} },
            {id: 20, props: {weight: 5, nType: 2} }
        ],
        edges: [
            [1,  2],
            [1,  3],
            [1,  4],
            [2,  3],
            [2,  6],
            [2,  7],
            [3,  8],
            [3,  9],
            [3,  10],
            [5,  9],
            [5,  10],
            [6,  7],
            [7,  10],
            [8,  9],
            [8,  10],
            [9,  10]
        ]
    };
    const INIT_NODES = 20;
    const INIT_EDGES = 16;

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
        for (var i = 0; i < GRAPH.nodes.length; i++) {
            var node = graph.find(GRAPH.nodes[i].id);
            GRAPH.nodes[i].props.neighbors = node.neighbors;
            GraphTests.testNode(graph, GRAPH.nodes[i].id, GRAPH.nodes[i].props, node);
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
            weight: 1,
            nType: 4,
            neighbors: [2, 3, 4]
        };
        expect(node).to.eql(graph.find(1));
        GraphTests.nodeHelper(1, propsNode, node);
    });
});
