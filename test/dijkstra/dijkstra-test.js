// dijkstra-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import Dijkstra from '../src/dijkstra.js';

// initialize empty graph tests
describe('dijkstra tests', () => {

    const GRAPH = {
        nodes: [
            {id:  1, weight: 1, nType: 1},
            {id:  2, weight: 1, nType: 1},
            {id:  3, weight: 1, nType: 1},
            {id:  4, weight: 1, nType: 1},
            {id:  5, weight: 1, nType: 1},
            {id:  6, weight: 1, nType: 1},
            {id:  7, weight: 100, nType: 1},
            {id:  8, weight: 1, nType: 1},
            {id:  9, weight: 1, nType: 1},
            {id: 10, weight: 1, nType: 1},
            {id: 11, weight: 1, nType: 1},
            {id: 12, weight: 1, nType: 1},
            {id: 13, weight: 1, nType: 1},
            {id: 14, weight: 1, nType: 1},
            {id: 15, weight: 1, nType: 1},
            {id: 16, weight: 1, nType: 1},
            {id: 17, weight: 1, nType: 1},
            {id: 18, weight: 1, nType: 1},
            {id: 19, weight: 1, nType: 1},
            {id: 20, weight: 1, nType: 1},
            {id: 21, weight: 1, nType: 1},
            {id: 22, weight: 1, nType: 2},
            {id: 23, weight: 1, nType: 1},
            {id: 24, weight: 1, nType: 1},
            {id: 25, weight: 1, nType: 1},
            {id: 26, weight: 1, nType: 1},
            {id: 27, weight: 1, nType: 1},
            {id: 28, weight: 1, nType: 1},
            {id: 29, weight: 1, nType: 1},
            {id: 30, weight: 1, nType: 1},
            {id: 31, weight: 1, nType: 2},
            {id: 32, weight: 1, nType: 2},
            {id: 33, weight: 1, nType: 1},
            {id: 34, weight: 1, nType: 1},
            {id: 35, weight: 1, nType: 1},
            {id: 36, weight: 1, nType: 1}
        ],
        edges: [
            [1,   2],
            [1,   7],
            [2,   3],
            [2,   8],
            [3,   4],
            [3,   9],
            [4,   5],
            [4,  10],
            [5,   6],
            [5,  11],
            [6,  12],
            [7,   8],
            [7,  13],
            [8,   9],
            [8,  14],
            [9,  10],
            [9,  15],
            [10, 11],
            [10, 16],
            [11, 12],
            [11, 17],
            [12, 18],
            [13, 14],
            [13, 19],
            [14, 15],
            [14, 20],
            [15, 16],
            [15, 21],
            [16, 17],
            [16, 22],
            [17, 18],
            [17, 23],
            [18, 24],
            [19, 20],
            [19, 25],
            [20, 21],
            [20, 26],
            [21, 22],
            [21, 27],
            [22, 23],
            [22, 28],
            [23, 24],
            [23, 29],
            [24, 30],
            [25, 26],
            [25, 31],
            [26, 27],
            [26, 32],
            [27, 28],
            [27, 33],
            [28, 29],
            [28, 34],
            [29, 30],
            [29, 35],
            [31, 32],
            [32, 33],
            [33, 34],
            [34, 35]
        ]
    };

    let graph;

    beforeEach(() => {
        graph = new Graph(GRAPH); // initialize basic graph for use with algo
    });

    after(() => graph = undefined);

    // No it should not
    // it('it should calculate for all nodes it can reach', () => {
    //     var results = Dijkstra.run(graph, 1, 1, 6);

    //     for (var i = 1; i <= 35; i++) {
    //         expect(results.dist[i]).to.not.equal(Infinity);
    //         expect(results.prev[i]).to.not.be.null;
    //     }
    // });

    it('it should find the shortest path (1)', () => {
        var results = Dijkstra.run(graph, 1, 1, 6);

        _testResults(results, 1, 6, [1, 2, 3, 4, 5, 6], [1, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5]);
    });

    it('it should find the shortest path (2)', () => {
        var results = Dijkstra.run(graph, 1, 1, 12);

        _testResults(results, 1, 12, [1, 2, 3, 4, 5, 6, 12], [1, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6]);
    });

    it('it should find the shortest path (3)', () => {
        var results = Dijkstra.run(graph, 1, 1, 17);

        _testResults(results, 1, 17, [1, 2, 3, 4, 10, 16, 17], [1, 1, 2, 3, 4, 10, 16], [0, 1, 2, 3, 4, 5, 6]);
    });

    it('it should avoid node 7 (which has weight 100)', () => {
        // node 7 has weight 100
        var results = Dijkstra.run(graph, 1, 1, 13);

        _testResults(results, 1, 13, [1, 2, 8, 14, 13], [1,1, 2, 8, 14], [0, 1, 2, 3, 4, 5]);
    });

    it('it should avoid node 32 (which has nType 2)', () => {
        // node 32 has nType 2
        var results = Dijkstra.run(graph, 1, 1, 33);

        _testResults(results, 1, 33, [1, 2, 8, 14, 20, 21, 27, 33], [1, 1, 2, 8, 14, 20, 21, 27],
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('it should return the shortest path as an array (1)', () => {
       var results = Dijkstra.run(graph, 1, 1, 6);
       var path = Dijkstra.getPath(results.prev, results.target);

       expect(path).to.eql([1, 2, 3, 4, 5, 6]);
    });

    it('it should return the shortest path as an array (2)', () => {
       var results = Dijkstra.run(graph, 1, 1, 12);
       var path = Dijkstra.getPath(results.prev, results.target);

       expect(path).to.eql([1, 2, 3, 4, 5, 6, 12]);
    });

    it('it should return the shortest path as an array (3)', () => {
       var results = Dijkstra.run(graph, 1, 1, 17);
       var path = Dijkstra.getPath(results.prev, results.target);

       expect(path).to.eql([1, 2, 3, 4, 10, 16, 17]);
    });

    it('there should not be a path to node 36 (it has no edges)', () => {
        var results = Dijkstra.run(graph, 1, 1, 36);
        var path = Dijkstra.getPath(results.prev, results.target);

        expect(results.dist[36]).to.be.equal(Infinity);
        expect(results.prev[36]).to.be.equal(null);

        expect(path).to.be.empty;
    });

    it('there should not be any paths to node 36 (it has no edges)', () => {
        for (var i = 1; i < 36; i++) {
            var results = Dijkstra.run(graph, 1, i, 36);
            var path = Dijkstra.getPath(results.prev, results.target);

            expect(results.dist[36]).to.be.equal(Infinity);
            expect(results.prev[36]).to.be.equal(null);

            expect(path).to.be.empty;
        }
    });

    it('it should handle self paths', () => {
        var results = Dijkstra.run(graph, 1, 15, 15);
        var path = Dijkstra.getPath(results.prev, results.target);

        _testResults(results, 15, 15, [15], [15], [0]);
        expect(path).to.eql([15]);
    });

    it('it should handle non-existant source or target', () => {
        expect(Dijkstra.run(graph, 1, 1, 37)).to.be.null;
        expect(Dijkstra.run(graph, 1, 37, 1)).to.be.null;
        expect(Dijkstra.run(graph, 1, 38, 37)).to.be.null;
    });


    //------------------------------------------


    function _testResults(results, source, target, path, prev, dist) {
        expect(results).to.not.be.empty;
        expect(results.dist).to.not.be.empty;
        expect(results.prev).to.not.be.empty;

        expect(results.source).to.equal(source);
        expect(results.target).to.equal(target);

        for (var i = 0; i < path.length; i++) {
            expect(results.prev[path[i]]).to.equal(prev[i]);
            expect(results.dist[path[i]]).to.equal(dist[i]);
        }
    }

});
