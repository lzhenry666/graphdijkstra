// graph-empty-test.js
'use strict';

/* global it, describe, beforeEach, after */
/* jshint expr: true */

import {expect} from 'chai';
import Graph from '../src/graph.js';
import GraphTests from './graph-tests.js';

// initialize empty graph tests
describe('graph tests (empty)', () => {
    const INIT_NODES = 0;
    const INIT_EDGES = 0;

    function runBefore() {
        let graph = new Graph(); // initialize empty graph

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

    after(() => graph = undefined );

    GraphTests.run(INIT_NODES, INIT_EDGES, runBefore);

    it('it should not duplicate or overwrite nodes', () => {
        var node = graph.addNode(1, props);
        expect(graph.nodeCount).to.equal(1);
        graph.addNode(1, props);
        expect(graph.nodeCount).to.equal(1);

        props.weight = 10;
        graph.addNode(1, props);
        expect(graph.nodeCount).to.equal(1);

        props.weight = 0;
        GraphTests.testNode(graph, 1, props, node);
    });
});
