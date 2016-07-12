'use strict';

/* global it, describe, before, after */

import {expect} from 'chai';
import Graph from '../dist/graph.js';

describe('empty graphing tests', () => {

  let graph;

  before(() => graph = new Graph(true));

  after(() => graph = undefined);

  it('it should initially have 0 nodes', () => {
    expect(graph.nodeCount).to.equal(0);
  });

  it('it should initially have 0 edges', () => {
    expect(graph.edgeCount).to.equal(0);
  });

  it('getAge', () => {
    expect(developer.getAge()).to.equal('99');
  });

  it('getWhoAmI', () => {
    expect(developer.getWhoAmI()).to.equal('Alex JavaScript Developer');
  });

});
