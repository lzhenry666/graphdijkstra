/**
 * graph-dijkstra.js
 * example angular implementation of the services
 */
(function() {
    'use strict';

    // var Graphing = require('./graphing.js');
    // var Graph = require('./graph.js');
    // var Dijkstra = require('./dijkstra.js');

    module.exports = {
        Graph: require('./graph.js'),
        Dijkstra: require('./dijkstra.js')
    };
})();