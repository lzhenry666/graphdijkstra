/**
 * graph-dijkstra.js
 * example angular implementation of the services
 */
(function() {
    'use strict';

    // var Graphing = require('./graphing.js');
    var Graph = require('./graph.js');
    var Dijkstra = require('./dijkstra.js');

    /* global angular */
    angular.module('graphDijkstra', [])
        .factory('Graphing', Graphing)
        .factory('Dijkstra', Dijkstra);

    Graphing.$inject = ['$http'];
    function Graphing($http) {
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
    }

})();