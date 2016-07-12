(function() {
  'use strict';

  var Graphing = require('./graph.js');
  var Dijkstra = require('./dijkstra.js');

  /* global angular */
  angular.module('graphDijkstra.lib', [])
    .factory('Graphing', Graphing)
    .factory('Dijkstra', Dijkstra);

})();