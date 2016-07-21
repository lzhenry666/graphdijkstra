// graph-filled-1-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import GraphTests from './graph-tests.js';

// initialize node only graph tests
describe('graph tests (initialized nodes with neighbors)', () => {

    const GRAPH = {
        nodes: [
            {id:  1, weight: 1, neighbors: [2, 3, 6], nType: 4},
            {id:  2, weight: 3, neighbors: [8, 9, 10], nType: 1},
            {id:  3, weight: 2, neighbors: [1, 7], nType: 0},
            {id:  4, weight: 2, neighbors: [], nType: 6},
            {id:  5, weight: 0, neighbors: [10], nType: 4},
            {id:  6, weight: 5, neighbors: [1, 8, 10], nType: 3},
            {id:  7, weight: 0, neighbors: [3, 6, 10], nType: 3},
            {id:  8, weight: 9, neighbors: [2, 7, 9], nType: 3},
            {id:  9, weight: 0, neighbors: [], nType: 4},
            {id: 10, weight: 1, neighbors: [6], nType: 7},
            {id: 11, weight: 2, neighbors: [], nType: 4},
            {id: 12, weight: 0, neighbors: [], nType: 0},
            {id: 13, weight: 6, neighbors: [], nType: 9},
            {id: 14, weight: 7, neighbors: [], nType: 8},
            {id: 15, weight: 5, neighbors: [], nType: 9},
            {id: 16, weight: 1, neighbors: [], nType: 1},
            {id: 17, weight: 7, neighbors: [], nType: 1},
            {id: 18, weight: 9, neighbors: [], nType: 6},
            {id: 19, weight: 1, neighbors: [], nType: 1},
            {id: 20, weight: 5, neighbors: [], nType: 2}
        ],
        edges: []
    };
    const INIT_NODES = 20;
    const INIT_EDGES = 14;

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
            expect(node.neighbors).to.include.members(GRAPH.nodes[i].neighbors);
            GraphTests.testNode(graph, GRAPH.nodes[i].id, props, node);
        }
    });

    it('it should initialize with the correct edges', () => {
        for (var i = 1; i <= GRAPH.nodes.length; i++) {
            for (var j = 1; j <= GRAPH.nodes.length; j++) {
                if (GRAPH.nodes[i-1].neighbors.indexOf(j) >= 0) {
                    expect(graph.connected(i, j)).to.be.true;
                }
            }
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
            neighbors: [2, 3, 6]
        };
        expect(node).to.eql(graph.find(1));
        GraphTests.nodeHelper(1, propsNode, node);
    });


});
