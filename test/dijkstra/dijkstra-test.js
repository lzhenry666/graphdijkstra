// dijkstra-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import Dijkstra from '../src/dijkstra.js';

// initialize empty graph tests
describe.only('dijkstra tests', () => {

    const GRAPH = {
        nodes: [
            {'id': 1,'props': {'weight':1,'nType':1}},
            {'id': 2,'props': {'weight':1,'nType':1}},
            {'id': 3,'props': {'weight':1,'nType':1}},
            {'id': 4,'props': {'weight':1,'nType':1}},
            {'id': 5,'props': {'weight':1,'nType':1}},
            {'id': 6,'props': {'weight':1,'nType':1}},
            {'id': 7,'props': {'weight':1,'nType':1}},
            {'id': 8,'props': {'weight':1,'nType':1}},
            {'id': 9,'props': {'weight':1,'nType':1}},
            {'id':10,'props': {'weight':1,'nType':1}},
            {'id':11,'props': {'weight':1,'nType':1}},
            {'id':12,'props': {'weight':1,'nType':1}},
            {'id':13,'props': {'weight':1,'nType':1}},
            {'id':14,'props': {'weight':1,'nType':1}},
            {'id':15,'props': {'weight':1,'nType':1}},
            {'id':16,'props': {'weight':1,'nType':1}},
            {'id':17,'props': {'weight':1,'nType':1}},
            {'id':18,'props': {'weight':1,'nType':1}},
            {'id':19,'props': {'weight':1,'nType':1}},
            {'id':20,'props': {'weight':1,'nType':1}},
            {'id':21,'props': {'weight':1,'nType':1}},
            {'id':22,'props': {'weight':1,'nType':1}},
            {'id':23,'props': {'weight':1,'nType':1}},
            {'id':24,'props': {'weight':1,'nType':1}},
            {'id':25,'props': {'weight':1,'nType':1}},
            {'id':26,'props': {'weight':1,'nType':1}},
            {'id':27,'props': {'weight':1,'nType':1}},
            {'id':28,'props': {'weight':1,'nType':1}},
            {'id':29,'props': {'weight':1,'nType':1}},
            {'id':30,'props': {'weight':1,'nType':1}},
            {'id':31,'props': {'weight':1,'nType':1}},
            {'id':32,'props': {'weight':1,'nType':1}},
            {'id':33,'props': {'weight':1,'nType':1}},
            {'id':34,'props': {'weight':1,'nType':1}},
            {'id':35,'props': {'weight':1,'nType':1}},
            {'id':36,'props': {'weight':1,'nType':1}}
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
            [30, 36],
            [31, 32],
            [32, 33],
            [33, 34],
            [34, 35],
            [35, 36]
        ]
    };

    let graph;

    beforeEach(() => {
        graph = new Graph({graph: GRAPH}); // initialize basic graph for use with algo
    });

    after(() => graph = undefined);

    it('it should find the shortest path', () => {
        // console.log(graph.nodes);
        var results = Dijkstra.run(graph, 1, 6, 1);
        expect(results).to.not.be.empty;
        expect(results.dist).to.not.be.empty;
        expect(results.prev).to.not.be.empty;

        expect(results.dist[1]).to.equal(0);
        expect(results.dist[2]).to.equal(1);
        expect(results.dist[3]).to.equal(2);
        expect(results.dist[4]).to.equal(3);
        expect(results.dist[5]).to.equal(4);
        expect(results.dist[6]).to.equal(5);
    });

    //------------------------------------------

});
