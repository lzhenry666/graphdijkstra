/**
 * dijkstra-wraper.js
 * 07/18/16
 *
 * an angular wrapper for the Dijkstra's
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    // var MinHeap = require('./min_heap.js');
    var D = require('./dijkstra.js');
    var Dijkstra = function() {
        var service = {
            // // the previously run search (caching)
            // prev: {
            //     s: null, // previous source
            //     t: null, // previous target
            //     r: {} // previous results
            // },

            run: D.run,
            getPath: D.getPath
        };

        return service;
    };

    Dijkstra.$inject = [];
    module.exports = Dijkstra;

})();
