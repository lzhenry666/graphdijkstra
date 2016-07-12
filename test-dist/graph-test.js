'use strict';

/* global it, describe, before, after */

var _chai = require('chai');

var _graph = require('../dist/graph.js');

var _graph2 = _interopRequireDefault(_graph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('graphing tests', function () {

  var graph = void 0;
  var matt = void 0;

  before(function () {
    return graph = new _graph2.default(true);
  });

  after(function () {
    return graph = undefined;
  });

  it('getNodeCount', function () {
    (0, _chai.expect)(graph.nodeCount).to.equal(0);
  });

  it('getAge', function () {
    (0, _chai.expect)(developer.getAge()).to.equal('99');
  });

  it('getWhoAmI', function () {
    (0, _chai.expect)(developer.getWhoAmI()).to.equal('Alex JavaScript Developer');
  });
});