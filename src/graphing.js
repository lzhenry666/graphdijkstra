/**
 * graphing.js
 * 05/31/16
 *
 * an angular wrapper for the graph
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var Graph = require('./graph.js');
    var Graphing = function($http) {
        var service = {
            graph: null,

            createGraph: createGraph
        };

        return service;

        //------------------------------------------------//

        function createGraph(url, debug) {
            debug = debug || false; // default to false
            $http.get(url)
                .success(function(data) {
                    service.graph = new Graph(debug, data);

                    return service.graph;
                })
                .error(function(error) {
                    console.error(error || 'Request failed');
                });
        }
    };

    Graphing.$inject = ['$http'];
    module.exports = Graphing;
})();
/*----------------------------------------------------------------------------*/