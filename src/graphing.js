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
            $http.get(url)
                .success(function(data) {
                    service.graph = new Graph({
                        graph: data,
                        debug: debug || false // default to false
                    });

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