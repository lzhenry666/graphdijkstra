var graphDijkstra = require('./graph-dijkstra.js');

// UMD module definition
(function(window, document){
  // AMD
  if (typeof define === 'function' && define.amd) {
    define('graphDijkstra', function () {
      console.log('here');
      return graphDijkstra;
    });
  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    console.log('there');
    module.exports = graphDijkstra;

    // Browser
    // Keep exporting globally as module.exports is available because of browserify
    window.graphDijkstra = graphDijkstra;
  }
})(window, document);