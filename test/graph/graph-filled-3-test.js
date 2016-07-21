// graph-filled-3-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import GraphTests from './graph-tests.js';

// initialize node and edge graph tests
describe('graph tests (initialized nodes & edges)', () => {

    const GRAPH = {
        nodes: [
            {id:  1, weight: 1, nType: 4},
            {id:  2, weight: 3, nType: 1},
            {id:  3, weight: 2, nType: 0},
            {id:  4, weight: 2, nType: 6},
            {id:  5, weight: 0, nType: 4},
            {id:  6, weight: 5, nType: 3},
            {id:  7, weight: 0, nType: 3},
            {id:  8, weight: 9, nType: 3},
            {id:  9, weight: 0, nType: 4},
            {id: 10, weight: 1, nType: 7},
            {id: 11, weight: 2, nType: 4},
            {id: 12, weight: 0, nType: 0},
            {id: 13, weight: 6, nType: 9},
            {id: 14, weight: 7, nType: 8},
            {id: 15, weight: 5, nType: 9},
            {id: 16, weight: 1, nType: 1},
            {id: 17, weight: 7, nType: 1},
            {id: 18, weight: 9, nType: 6},
            {id: 19, weight: 1, nType: 1},
            {id: 20, weight: 5, nType: 2}
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
        let graph = new Graph(GRAPH); // initialize graph

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
            var props = {
                weight: GRAPH.nodes[i].weight,
                nType: GRAPH.nodes[i].nType,
                neighbors: node.neighbors
            };
            GraphTests.testNode(graph, GRAPH.nodes[i].id, props, node);
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
