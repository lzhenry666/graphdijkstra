// graph-filled-1-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';

// initialize empty graph tests
describe('graph tests (initialized nodes with neighbors)', () => {

    const GRAPH = {
        nodes: [
            {id:  1, props: {weight: 1, neighbors: [2, 3, 6], nType: 4} },
            {id:  2, props: {weight: 3, neighbors: [8, 9, 10], nType: 1} },
            {id:  3, props: {weight: 2, neighbors: [1, 7], nType: 0} },
            {id:  4, props: {weight: 2, neighbors: [], nType: 6} },
            {id:  5, props: {weight: 0, neighbors: [10], nType: 4} },
            {id:  6, props: {weight: 5, neighbors: [1, 8, 10], nType: 3} },
            {id:  7, props: {weight: 0, neighbors: [3, 6, 10], nType: 3} },
            {id:  8, props: {weight: 9, neighbors: [2, 7, 9], nType: 3} },
            {id:  9, props: {weight: 0, neighbors: [], nType: 4} },
            {id: 10, props: {weight: 1, neighbors: [6], nType: 7} },
            {id: 11, props: {weight: 2, neighbors: [], nType: 4} },
            {id: 12, props: {weight: 0, neighbors: [], nType: 0} },
            {id: 13, props: {weight: 6, neighbors: [], nType: 9} },
            {id: 14, props: {weight: 7, neighbors: [], nType: 8} },
            {id: 15, props: {weight: 5, neighbors: [], nType: 9} },
            {id: 16, props: {weight: 1, neighbors: [], nType: 1} },
            {id: 17, props: {weight: 7, neighbors: [], nType: 1} },
            {id: 18, props: {weight: 9, neighbors: [], nType: 6} },
            {id: 19, props: {weight: 1, neighbors: [], nType: 1} },
            {id: 20, props: {weight: 5, neighbors: [], nType: 2} }
        ],
        edges: []
    };
    const INIT_NODES = 20;
    const INIT_EDGES = 14;

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

        // check initialized graph
        expect(graph.nodes).to.not.be.empty;
        expect(graph.edgeCount).to.equal(INIT_EDGES);
        expect(graph.nodeCount).to.equal(INIT_NODES);
    });

    after(() => graph = undefined);

    it('it should initialize with ' + INIT_NODES + ' nodes', () => {
        expect(graph.nodes).to.not.be.empty;
        expect(graph.nodeCount).to.equal(INIT_NODES);
    });

    it('it should initialize with ' + INIT_EDGES + ' edges', () => {
        expect(graph.edgeCount).to.equal(INIT_EDGES);
    });

    it('it should initialize with the correct nodes', () => {
        for (var i = 0; i < GRAPH.nodes.length; i++) {
            var node = graph.find(GRAPH.nodes[i].id);
            expect(node.neighbors).to.include.members(GRAPH.nodes[i].props.neighbors);
            GRAPH.nodes[i].props.neighbors = node.neighbors;
            _testNode(GRAPH.nodes[i].id, GRAPH.nodes[i].props, node);
        }
    });

    it('it should initialize with the correct edges', () => {
        for (var i = 1; i <= GRAPH.nodes.length; i++) {
            for (var j = 1; j <= GRAPH.nodes.length; j++) {
                if (GRAPH.nodes[i-1].props.neighbors.indexOf(j) >= 0) {
                    expect(graph.connected(i, j)).to.be.true;
                }
            }
        }
    });

    it('it should add a node (without neighbors)', () => {
        var node = graph.addNode(INIT_NODES+1, props);

        expect(graph.nodeCount).to.equal(INIT_NODES+1);
        expect(graph.edgeCount).to.equal(INIT_EDGES);

        _testNode(INIT_NODES+1, props, node);
    });

    it('it should add many nodes', () => {
        for (var i = 1; i <= 10; i++) {
            var node = graph.addNode(INIT_NODES+i, props);

            expect(graph.nodeCount).to.equal(INIT_NODES+i);
            expect(graph.edgeCount).to.equal(INIT_EDGES);

            _testNode(INIT_NODES+i, props, node);
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
            neighbors: [2, 3, 6]
        };
        expect(node).to.eql(graph.find(1));
        _nodeHelper(1, propsNode, node);
    });

    it('it should iterate through all nodes', () => {
        graph.eachNode((node) => {
            expect(graph.find(node.id)).to.not.be.null;
            expect(node.id).to.not.be.null;
        });
    });

    it('it should add edges', () => {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(INIT_NODES+i, props);
        }

        expect(graph.nodeCount).to.equal(INIT_NODES+10);

        expect(graph.addEdge(INIT_NODES+1, INIT_NODES+2)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+1);
        _testEdge(INIT_NODES+1, INIT_NODES+2);

        expect(graph.addEdge(INIT_NODES+2, INIT_NODES+3)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+2);
        _testEdge(INIT_NODES+2, INIT_NODES+3);

        expect(graph.addEdge(INIT_NODES+2, INIT_NODES+4)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+3);
        _testEdge(INIT_NODES+2, INIT_NODES+4);

        expect(graph.addEdge(INIT_NODES+10, INIT_NODES+1)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+4);
        _testEdge(INIT_NODES+10, INIT_NODES+1);

        expect(graph.addEdge(INIT_NODES+9, INIT_NODES+3)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+5);
        _testEdge(INIT_NODES+9, INIT_NODES+3);

        expect(graph.addEdge(INIT_NODES+8, INIT_NODES+9)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+6);
        _testEdge(INIT_NODES+8, INIT_NODES+9);

        expect(graph.addEdge(INIT_NODES+6, INIT_NODES+7)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+7);
        _testEdge(INIT_NODES+6, INIT_NODES+7);

        expect(graph.addEdge(INIT_NODES+5, INIT_NODES+7)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+8);
        _testEdge(INIT_NODES+5, INIT_NODES+7);

        expect(graph.addEdge(INIT_NODES+2, INIT_NODES+10)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+9);
        _testEdge(INIT_NODES+2, INIT_NODES+10);

        expect(graph.addEdge(INIT_NODES+1, INIT_NODES+6)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+10);
        _testEdge(INIT_NODES+1, INIT_NODES+6);
    });

    it('it should handle adding edges if node does not exist', () => {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(INIT_NODES+i, props);
        }
        graph.addEdge(INIT_NODES+1, INIT_NODES+2);
        graph.addEdge(INIT_NODES+2, INIT_NODES+3);

        expect(graph.addEdge(INIT_NODES+3,INIT_NODES+11)).to.be.false;
        expect(graph.find(INIT_NODES+3).neighbors).to.not.include.members([INIT_NODES+11]);
        expect(graph.addEdge(INIT_NODES+14,INIT_NODES+7)).to.be.false;
        expect(graph.find(INIT_NODES+7).neighbors).to.not.include.members([INIT_NODES+14]);
        expect(graph.addEdge(INIT_NODES+14,INIT_NODES+17)).to.be.false;

        expect(graph.edgeCount).to.equal(INIT_EDGES+2);
    });

    it('it should not duplicate edges', () => {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(INIT_NODES+i, props);
        }
        expect(graph.addEdge(INIT_NODES+1, INIT_NODES+2)).to.be.true;
        expect(graph.addEdge(INIT_NODES+2, INIT_NODES+3)).to.be.true;

        expect(graph.addEdge(INIT_NODES+2,INIT_NODES+3)).to.be.false;
        expect(graph.edgeCount).to.equal(INIT_EDGES+2);

        expect(graph.addEdge(INIT_NODES+3,INIT_NODES+2)).to.be.false;
        expect(graph.edgeCount).to.equal(INIT_EDGES+2);
    });

    it('it should fix inconsistencies when adding an edge', () => {
        props.neighbors = [INIT_NODES+1, INIT_NODES+2];
        graph.addNode(INIT_NODES+3, props);

        graph.find(INIT_NODES+1).neighbors = []; // create inconsistency
        graph.find(INIT_NODES+2).neighbors = []; // create inconsistency

        expect(graph.addEdge(INIT_NODES+2, INIT_NODES+3)).to.be.true;
        _testEdge(INIT_NODES+2, INIT_NODES+3);

        expect(graph.addEdge(INIT_NODES+3, INIT_NODES+1)).to.be.true;
        _testEdge(INIT_NODES+3,INIT_NODES+1);

        expect(graph.edgeCount).to.equal(INIT_EDGES+2);
    });

    it('it should not allow self edges', () => {
        graph.addNode(INIT_NODES+1, props);

        expect(graph.addEdge(INIT_NODES+1, INIT_NODES+1)).to.be.false;
        expect(graph.edgeCount).to.equal(INIT_EDGES);
    });

    it('it should delete nodes (without edges)', () => {
        graph.addNode(INIT_NODES+1, props);
        var props2 = {
            weight: 10,
            nType: 7,
            neighbors: []
        };
        graph.addNode(INIT_NODES+2, props2);

        var node = graph.deleteNode(INIT_NODES+1);
        expect(node).to.not.be.null;
        expect(graph.nodeCount).to.equal(INIT_NODES+1);
        _nodeHelper(node.id, props, node);

        node = graph.deleteNode(INIT_NODES+2);
        expect(node).to.not.be.null;
        expect(graph.nodeCount).to.equal(INIT_NODES);
        _nodeHelper(node.id, props2, node);
    });

    it('it should handle deletion if node does not exist', () => {
        var node = graph.deleteNode(INIT_NODES+2);

        expect(graph.nodeCount).to.equal(INIT_NODES);
        expect(node).to.be.null;

        graph.addNode(INIT_NODES+2, props);

        node = graph.deleteNode(INIT_NODES+1);
        expect(node).to.be.null;

        expect(graph.nodeCount).to.equal(INIT_NODES+1);
    });

    it('it should delete nodes with edges, maintaining consistency', () => {
        props.neighbors = [INIT_NODES+2, INIT_NODES+3, INIT_NODES+4];
        graph.addNode(INIT_NODES+1, props);
        graph.addEdge(INIT_NODES+2, INIT_NODES+3);

        expect(graph.nodeCount).to.equal(INIT_NODES+4);
        expect(graph.edgeCount).to.equal(INIT_EDGES+4);
        _testEdge(INIT_NODES+1, INIT_NODES+2);
        _testEdge(INIT_NODES+1, INIT_NODES+3);
        _testEdge(INIT_NODES+1, INIT_NODES+4);
        _testEdge(INIT_NODES+2, INIT_NODES+3);

        expect(graph.deleteNode(INIT_NODES+1)).to.not.be.null;
        expect(graph.nodeCount).to.equal(INIT_NODES+3);
        expect(graph.edgeCount).to.equal(INIT_EDGES+1);

        expect(graph.connected(INIT_NODES+1, INIT_NODES+2)).to.be.false;
        expect(graph.connected(INIT_NODES+1, INIT_NODES+3)).to.be.false;
        expect(graph.connected(INIT_NODES+1, INIT_NODES+4)).to.be.false;
        expect(graph.connected(INIT_NODES+2, INIT_NODES+3)).to.be.true;
    });

    it('it should delete edges', () => {
        props.neighbors = [INIT_NODES+2, INIT_NODES+3, INIT_NODES+4];
        graph.addNode(INIT_NODES+1, props);

        expect(graph.deleteEdge(INIT_NODES+1, INIT_NODES+2)).to.be.true;

        expect(graph.edgeCount).to.equal(INIT_EDGES+2);
        expect(graph.connected(INIT_NODES+1, INIT_NODES+2)).to.be.false;
    });

    it('it should handle deletion if edge does not exist', () => {
        props.neighbors = [INIT_NODES+2, INIT_NODES+3, INIT_NODES+4];
        graph.addNode(INIT_NODES+1, props);

        expect(graph.deleteEdge(INIT_NODES+1, INIT_NODES+2)).to.be.true;
        expect(graph.edgeCount).to.equal(INIT_EDGES+2);

        expect(graph.deleteEdge(INIT_NODES+2, INIT_NODES+3)).to.be.false;
        expect(graph.edgeCount).to.equal(INIT_EDGES+2);
    });

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
