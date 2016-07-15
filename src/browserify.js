// browserify.js
// needed for browserify to inject required resources
// var graphDijkstra = require('./graph-dijkstra.js');
var Graph = require('./graph.js');
var Dijkstra = require('./dijkstra.js');

// UMD module definition
(function(window, document){
  // AMD
  if (typeof define === 'function' && define.amd) {
    define('graph', function () {
      return Graph;
    });
    define('dijkstra', function () {
      return Dijkstra;
    });
  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Graph: Graph,
        Dijkstra: Dijkstra
    };

    // Browser
    // Keep exporting globally as module.exports is available because of browserify
    window.Graph = Graph;
    window.Dijkstra = Dijkstra;
  }
})(window, document);