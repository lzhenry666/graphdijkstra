'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../dist/graph.js';

// initialize empty graph tests
describe('empty graph tests', () => {

    let graph;
    let props = {
        neighbors: [],
        weight: 0,
        nType: 1
    };

    beforeEach(() => {
        graph = new Graph();

        // initialize empty graph
        expect(graph.nodes).to.empty;
        expect(graph.nodeCount).to.equal(0);
        expect(graph.edgeCount).to.equal(0);
    });

    after(() => graph = undefined);

    it('it should initialize with 0 nodes', () => {
        expect(graph.nodes).to.empty;
        expect(graph.nodeCount).to.equal(0);
    });

    it('it should initialize with 0 edges', () => {
        expect(graph.edgeCount).to.equal(0);
    });

    it('it should add a node (without neighbors)', () => {
        var node = graph.addNode(1, props);

        expect(graph.nodeCount).to.equal(1);
        expect(graph.edgeCount).to.equal(0);

        _testNode(1, props, node);
    });

    it('it should add a node (with neighbors)', () => {
        props.neighbors = [2, 3, 4];
        var node = graph.addNode(1, props);

        expect(graph.nodeCount).to.equal(1);
        expect(graph.edgeCount).to.equal(0);

        _testNode(1, props, node);
    });

    // it('it should add two nodes', () => {
    //     var props = {
    //         neighbors: [],
    //         weight: 0,
    //         nType: 1
    //     };
    //     var node1 = graph.addNode(1, props);
    //     var node2 = graph.addNode(2, props);

    //     expect(graph.nodeCount).to.equal(2);
    //     expect(graph.edgeCount).to.equal(0);

    //     _testNode(1, props, node1);
    //     _testNode(2, props, node2);

    //     expect(node1).to.not.equal(node2);
    //     expect(node1).to.not.eql(node2);
    // });

    it('it should add nodes', () => {
        expect(graph.nodeCount).to.equal(0);
        expect(graph.edgeCount).to.equal(0);

        for (var i = 1; i <= 10; i++) {
            var node = graph.addNode(i, props);

            expect(graph.nodeCount).to.equal(i);
            expect(graph.edgeCount).to.equal(0);

            _testNode(i, props, node);
        }

        expect(graph.nodeCount).to.equal(10);
        expect(graph.edgeCount).to.equal(0);
    });

    it('it should not duplicate nodes', () => {
        // graph.addNode(1, props);
    });

    it('it should add edges', () => {
        for (var i = 1; i <= 10; i++) {
            graph.addNode(i, props);
        }

        graph.addEdge(1,2);
        expect(graph.edgeCount).to.equal(1);
        graph.addEdge(2,3);
        expect(graph.edgeCount).to.equal(2);
        graph.addEdge(2,4);
        expect(graph.edgeCount).to.equal(3);
        graph.addEdge(10,1);
        expect(graph.edgeCount).to.equal(4);
        graph.addEdge(9,3);
        expect(graph.edgeCount).to.equal(5);
        graph.addEdge(8,9);
        expect(graph.edgeCount).to.equal(6);
        graph.addEdge(6,7);
        expect(graph.edgeCount).to.equal(7);
        graph.addEdge(5,7);
        expect(graph.edgeCount).to.equal(8);
        graph.addEdge(2,10);
        expect(graph.edgeCount).to.equal(9);
        graph.addEdge(1,6);
        expect(graph.edgeCount).to.equal(10);

        _testEdge(1,2);
        _testEdge(2,3);
        _testEdge(2,4);
        _testEdge(10,1);
        _testEdge(9,3);
        _testEdge(8,9);
        _testEdge(6,7);
        _testEdge(5,7);
        _testEdge(2,10);
        _testEdge(1,6);
    });

    //------------------------------------------

    /** ensure all tests start with an empty graph */
    // function _testEmptyGraph(graph) {
    //     expect(graph.nodes).to.empty;
    //     expect(graph.nodeCount).to.equal(0);
    //     expect(graph.edgeCount).to.equal(0);
    // }

    function _testNode(id, props, node) {
        var found = graph.find(id);

        expect(graph.exists(id)).to.be.true;

        expect(found).to.eql(node);
        expect(found).to.eql({
            _id: id,
            _neighbors: props.neighbors,
            _weight: props.weight,
            _nType: props.nType
        });
        expect(found.id).to.equal(id);
        expect(found.neighbors).to.eql(props.neighbors);
        expect(found.weight).to.equal(props.weight);
        expect(found.nType).to.equal(props.nType);

        expect(node.id).to.equal(id);
        expect(node.neighbors).to.eql(props.neighbors);
        expect(node.weight).to.equal(props.weight);
        expect(node.nType).to.equal(props.nType);
    }

    function _testEdge(s, t) {
        expect(graph.find(s).neighbors).to.include.members([t]);
        expect(graph.find(t).neighbors).to.include.members([s]);
    }
    // it('getAge', () => {
    //   expect(developer.getAge()).to.equal('99');
    // });

    // it('getWhoAmI', () => {
    //   expect(developer.getWhoAmI()).to.equal('Alex JavaScript Developer');
    // });

});
