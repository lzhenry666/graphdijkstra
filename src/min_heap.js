/*
 * min_heap.js
 * adapted from https://github.com/rombdn/js-binaryheap-decreasekey
 * 06/01/16
 *
=================================
js-binaryheap-decreasekey - v0.1
https://github.com/rombdn/js-binaryheap-decreasekey

Based on a Binary Heap implementation found in the book
Eloquent Javascript by Marijn Haverbeke
http://eloquentjavascript.net/appendix2.html

(c) 2013 Romain BEAUDON
BinaryHeap code may be freely distributed under the MIT License
=================================
/*----------------------------------------------------------------------------*/

(function() {
    'use strict';

    var MinHeap = function(scoreFunction, idFunction, valueProp) {
        this.content = [];
        this.scoreFunction = scoreFunction;
        this.idFunction = idFunction;
        this.valueProp = valueProp;
        this.map = {};
    };

    MinHeap.prototype = {
        size: size,
        exists: exists,
        push: push,
        pop: pop,
        bubbleUp: bubbleUp,
        sinkDown: sinkDown,
        decreaseKey: decreaseKey
    };

    module.exports = MinHeap;

    //------------------------------------------------//

    function size() {
        return MinHeap.content.length;
    }

    function exists(elt) {
        return MinHeap.map[MinHeap.idFunction(elt)] !== undefined;
    }

    function push(elt) {
        if (MinHeap.map[MinHeap.idFunction(elt)] !== undefined) {
            throw 'Error: id "' + MinHeap.idFunction(elt) + '" already present in heap';
        }

        MinHeap.content.push(elt);
        MinHeap.bubbleUp(MinHeap.content.length - 1);
        //var index = MinHeap.bubbleUp(MinHeap.content.length - 1);
        //MinHeap.map[MinHeap.idFunction(elt)] = index;
    }

    function pop() {
        var result = MinHeap.content[0];
        var end = MinHeap.content.pop();

        delete MinHeap.map[MinHeap.idFunction(result)];

        if (MinHeap.content.length > 0) {
            MinHeap.content[0] = end;
            MinHeap.map[MinHeap.idFunction(end)] = 0;
            MinHeap.sinkDown(0);
            //var index = MinHeap.sinkDown(0);
            //MinHeap.map[MinHeap.idFunction(end)] = index;
        }

        return result;
    }

    function bubbleUp(n) {
        var element = MinHeap.content[n];
        var score = MinHeap.scoreFunction(element);

        while (n > 0) {
            var parentN = Math.floor((n - 1) / 2);
            var parent = MinHeap.content[parentN];

            if (MinHeap.scoreFunction(parent) < score) {
                break;
            }

            MinHeap.map[MinHeap.idFunction(element)] = parentN;
            MinHeap.map[MinHeap.idFunction(parent)] = n;

            MinHeap.content[parentN] = element;
            MinHeap.content[n] = parent;
            n = parentN;
        }

        MinHeap.map[MinHeap.idFunction(element)] = n;

        return n;
    }

    function sinkDown(n) {
        var element = MinHeap.content[n];
        var score = MinHeap.scoreFunction(element);

        while (true) {
            var child2N = (n + 1) * 2;
            var child1N = child2N - 1;
            var swap = null;
            var child1score;

            if (child1N < MinHeap.content.length) {
                var child1 = MinHeap.content[child1N];
                child1score = MinHeap.scoreFunction(child1);
                if (score > child1score) {
                    swap = child1N;
                }
            }

            if (child2N < MinHeap.content.length) {
                var child2 = MinHeap.content[child2N];
                var child2score = MinHeap.scoreFunction(child2);
                if ((swap === null ? score : child1score) > child2score) {
                    swap = child2N;
                }
            }

            if (swap === null) {
                break;
            }

            MinHeap.map[MinHeap.idFunction(MinHeap.content[swap])] = n;
            MinHeap.map[MinHeap.idFunction(element)] = swap;

            MinHeap.content[n] = MinHeap.content[swap];
            MinHeap.content[swap] = element;
            n = swap;
        }

        MinHeap.map[MinHeap.idFunction(element)] = n;

        return n;
    }

    function decreaseKey(id, value) {
        var n = MinHeap.map[id];
        MinHeap.content[n][MinHeap.valueProp] = value;
        MinHeap.bubbleUp(n);
    }
})();