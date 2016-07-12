'use strict';

/* global it, describe, before, after */

import {expect} from 'chai';
import Graph from '../dist/graph.js';

describe('graphing tests', () => {

  let graph;

  before(() => developer = new Developer('Alex', '99'));

  after(() => developer = undefined);

  it('getName', () => {
    expect(developer.getName()).to.equal('Alex');
  });

  it('getAge', () => {
    expect(developer.getAge()).to.equal('99');
  });

  it('getWhoAmI', () => {
    expect(developer.getWhoAmI()).to.equal('Alex JavaScript Developer');
  });

});
