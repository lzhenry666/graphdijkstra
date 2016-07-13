'use strict';

// graph-dijkstra.js
(function () {
  'use strict';

  var Graphing = require('./graphing.js');
  var Dijkstra = require('./dijkstra.js');

  /* global angular */
  angular.module('graphDijkstra.lib', []).factory('Graphing', Graphing).factory('Dijkstra', Dijkstra);
})();