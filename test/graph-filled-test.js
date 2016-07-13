'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from './src/graph.js';

// initialize empty graph tests
describe('graph tests (initialized)', () => {

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

    let graph;
    let props;

    beforeEach(() => {
        graph = new Graph({graph: GRAPH}); // initialize graph

        // initialize default properties
        props = {
            neighbors: [],
            weight: 0,
            nType: 1
        };

        // initialize empty graph
        expect(graph.nodes).to.not.be.empty;
        expect(graph.nodeCount).to.equal(INIT_NODES);
        expect(graph.edgeCount).to.equal(INIT_EDGES);
    });

    after(() => graph = undefined);

    it('it should initialize with 20 nodes', () => {
        expect(graph.nodes).to.not.be.empty;
        expect(graph.nodeCount).to.equal(INIT_NODES);
    });

    it('it should initialize with 16 edges', () => {
        expect(graph.edgeCount).to.equal(INIT_EDGES);
    });

    it('it should initialize with the correct nodes', () => {
        for (var i = 0; i < GRAPH.nodes.length; i++) {
            var node = graph.find(GRAPH.nodes[i].id);
            GRAPH.nodes[i].props.neighbors = node.neighbors;
            _testNode(GRAPH.nodes[i].id, GRAPH.nodes[i].props, node);
        }
    });

    it('it should initialize with the correct edges', () => {
        for (var i = 0; i < GRAPH.edges.length; i++) {
            _testEdge(GRAPH.edges[i][0], GRAPH.edges[i][1]);
        }
    });

    it('it should add a node (without neighbors)', () => {
        var node = graph.addNode(INIT_NODES+1, props);

        expect(graph.nodeCount).to.equal(INIT_NODES+1);
        expect(graph.edgeCount).to.equal(INIT_EDGES);

        _testNode(INIT_NODES+1, props, node);
    });

    it('it should add many nodes', () => {
        for (var i = INIT_NODES+1; i <= INIT_NODES+10; i++) {
            var node = graph.addNode(i, props);

            expect(graph.nodeCount).to.equal(i);
            expect(graph.edgeCount).to.equal(INIT_EDGES);

            _testNode(i, props, node);
        }

        expect(graph.nodeCount).to.equal(INIT_NODES+10);
        expect(graph.edgeCount).to.equal(INIT_EDGES);
    });

    it('it should add a node (with neighbors)', () => {
        props.neighbors = [INIT_NODES+2, INIT_NODES+3, INIT_NODES+4];
        var propsNeighbor = {
            weight: 0,
            nType: 0,
            neighbors: [INIT_NODES+1]
        };
        var node = graph.addNode(INIT_NODES+1, props);

        expect(graph.nodeCount).to.equal(INIT_NODES+4);
        expect(graph.edgeCount).to.equal(INIT_EDGES+3);

        _testNode(INIT_NODES+1, props, node);
        _testNode(INIT_NODES+2, propsNeighbor, graph.find(INIT_NODES+2));
        _testNode(INIT_NODES+3, propsNeighbor, graph.find(INIT_NODES+3));
        _testNode(INIT_NODES+4, propsNeighbor, graph.find(INIT_NODES+4));
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
        _nodeHelper(1, propsNode, node);
    });

    // it('it should add edges', () => {
    //     for (var i = 1; i <= 10; i++) {
    //         graph.addNode(i, props);
    //     }
    //     expect(graph.nodeCount).to.equal(10);

    //     expect(graph.addEdge(1, 2)).to.be.true;
    //     expect(graph.edgeCount).to.equal(1);
    //     _testEdge(1, 2);

    //     expect(graph.addEdge(2, 3)).to.be.true;
    //     expect(graph.edgeCount).to.equal(2);
    //     _testEdge(2, 3);

    //     expect(graph.addEdge(2, 4)).to.be.true;
    //     expect(graph.edgeCount).to.equal(3);
    //     _testEdge(2, 4);

    //     expect(graph.addEdge(10, 1)).to.be.true;
    //     expect(graph.edgeCount).to.equal(4);
    //     _testEdge(10, 1);

    //     expect(graph.addEdge(9, 3)).to.be.true;
    //     expect(graph.edgeCount).to.equal(5);
    //     _testEdge(9, 3);

    //     expect(graph.addEdge(8, 9)).to.be.true;
    //     expect(graph.edgeCount).to.equal(6);
    //     _testEdge(8, 9);

    //     expect(graph.addEdge(6, 7)).to.be.true;
    //     expect(graph.edgeCount).to.equal(7);
    //     _testEdge(6, 7);

    //     expect(graph.addEdge(5, 7)).to.be.true;
    //     expect(graph.edgeCount).to.equal(8);
    //     _testEdge(5, 7);

    //     expect(graph.addEdge(2, 10)).to.be.true;
    //     expect(graph.edgeCount).to.equal(9);
    //     _testEdge(2, 10);

    //     expect(graph.addEdge(1, 6)).to.be.true;
    //     expect(graph.edgeCount).to.equal(10);
    //     _testEdge(1, 6);
    // });

    // it('it should handle adding edges if node does not exist', () => {
    //     for (var i = 1; i <= 10; i++) {
    //         graph.addNode(i, props);
    //     }
    //     graph.addEdge(1, 2);
    //     graph.addEdge(2, 3);

    //     expect(graph.addEdge(3,11)).to.be.false;
    //     expect(graph.find(3).neighbors).to.not.include.members([11]);
    //     expect(graph.addEdge(14,7)).to.be.false;
    //     expect(graph.find(7).neighbors).to.not.include.members([14]);
    //     expect(graph.addEdge(14,17)).to.be.false;

    //     expect(graph.edgeCount).to.equal(2);
    // });

    // it('it should not duplicate edges', () => {
    //     for (var i = 1; i <= 10; i++) {
    //         graph.addNode(i, props);
    //     }
    //     graph.addEdge(1, 2);
    //     graph.addEdge(2, 3);

    //     expect(graph.addEdge(2,3)).to.be.true;
    //     expect(graph.edgeCount).to.equal(2);

    //     expect(graph.addEdge(3,2)).to.be.true;
    //     expect(graph.edgeCount).to.equal(2);
    // });

    // it('it should fix inconsistencies when adding an edge', () => {
    //     props.neighbors = [1, 2];
    //     graph.addNode(3, props);

    //     graph.find(1).neighbors = []; // create inconsistency (1,3)
    //     graph.find(2).neighbors = []; // create inconsistency (2,3)

    //     expect(graph.addEdge(2, 3)).to.be.true;
    //     _testEdge(2, 3);

    //     expect(graph.addEdge(3, 1)).to.be.true;
    //     _testEdge(3,1);

    //     expect(graph.edgeCount).to.equal(2);
    // });

    // it('it should not allow self edges', () => {
    //     graph.addNode(1, props);

    //     expect(graph.addEdge(1, 1)).to.be.false;
    //     expect(graph.edgeCount).to.equal(0);
    // });

    // it('it should delete nodes (without edges)', () => {
    //     graph.addNode(1, props);
    //     var props2 = {
    //         weight: 10,
    //         nType: 7,
    //         neighbors: []
    //     };
    //     graph.addNode(2, props2);

    //     var node = graph.deleteNode(1);
    //     expect(node).to.not.be.null;
    //     expect(graph.nodeCount).to.equal(1);
    //     _nodeHelper(node.id, props, node);

    //     node = graph.deleteNode(2);
    //     expect(node).to.not.be.null;
    //     expect(graph.nodeCount).to.equal(0);
    //     _nodeHelper(node.id, props2, node);
    // });

    // it('it should handle deletion if node does not exist', () => {
    //     var node = graph.deleteNode(2);

    //     expect(graph.nodeCount).to.equal(0);
    //     expect(node).to.be.null;

    //     graph.addNode(2, props);

    //     node = graph.deleteNode(1);
    //     expect(node).to.be.null;

    //     expect(graph.nodeCount).to.equal(1);
    // });

    // it('it should delete nodes with edges, maintaining consistency', () => {
    //     props.neighbors = [2, 3, 4];
    //     graph.addNode(1, props);
    //     graph.addEdge(2, 3);

    //     expect(graph.nodeCount).to.equal(4);
    //     expect(graph.edgeCount).to.equal(4);
    //     _testEdge(1, 2);
    //     _testEdge(1, 3);
    //     _testEdge(1, 4);
    //     _testEdge(2, 3);

    //     expect(graph.deleteNode(1)).to.not.be.null;
    //     expect(graph.nodeCount).to.equal(3);
    //     expect(graph.edgeCount).to.equal(1);

    //     expect(graph.connected(1, 2)).to.be.false;
    //     expect(graph.connected(1, 3)).to.be.false;
    //     expect(graph.connected(1, 4)).to.be.false;
    //     expect(graph.connected(2, 3)).to.be.true;
    // });

    // it('it should delete edges', () => {
    //     props.neighbors = [2, 3, 4];
    //     graph.addNode(1, props);

    //     expect(graph.deleteEdge(1, 2)).to.be.true;

    //     expect(graph.edgeCount).to.equal(2);
    //     expect(graph.connected(1, 2)).to.be.false;
    // });

    // it('it should handle deletion if edge does not exist', () => {
    //     props.neighbors = [2, 3, 4];
    //     graph.addNode(1, props);

    //     expect(graph.deleteEdge(1, 2)).to.be.true;
    //     expect(graph.edgeCount).to.equal(2);

    //     expect(graph.deleteEdge(2, 3)).to.be.false;
    //     expect(graph.edgeCount).to.equal(2);
    // });

    //------------------------------------------

    function _testNode(id, props, node) {
        expect(graph.exists(id)).to.be.true;

        var found = graph.find(id);
        expect(found).to.eql(node);

        _nodeHelper(id, props, node);
        _nodeHelper(id, props, found);
    }

    function _nodeHelper(id, props, node) {
        expect(node).to.eql({
            _id: id,
            _neighbors: props.neighbors,
            _weight: props.weight,
            _nType: props.nType
        });

        expect(node.id).to.equal(id);
        expect(node.neighbors).to.eql(props.neighbors);
        expect(node.weight).to.equal(props.weight);
        expect(node.nType).to.equal(props.nType);
    }

    function _testEdge(s, t) {
        expect(graph.connected(s, t)).to.be.true;
        expect(graph.connected(t, s)).to.be.true;
        expect(graph.find(s).neighbors).to.include.members([t]);
        expect(graph.find(t).neighbors).to.include.members([s]);
    }
});
