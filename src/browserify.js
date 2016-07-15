// browserify.js
// needed for browserify to inject required resources
var graphDijkstra = require('./graph-dijkstra.js');
// var Dijkstra = require('./graph-dijkstra.js').Dijkstra;

// UMD module definition
(function(window, document){
  // AMD
  if (typeof define === 'function' && define.amd) {
    define('graph', function () {
      return graphDijkstra.Graph;
    });
    define('dijkstra', function () {
      return graphDijkstra.Dijkstra;
    });
  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Graph: graphDijkstra.Graph,
        Dijkstra: graphDijkstra.Dijkstra
    };

    // Browser
    // Keep exporting globally as module.exports is available because of browserify
    window.Graph = graphDijkstra.Graph;
    window.Dijkstra = graphDijkstra.Dijkstra;
  }
})(window, document);