'use strict';

/**
 * @file Provides a data structure for a binary min heap
 * @name min-heap.js
 * @ignore
 */
/*
 adapted from https://github.com/rombdn/js-binaryheap-decreasekey
 =================================
 js-binaryheap-decreasekey - v0.1
 https://github.com/rombdn/js-binaryheap-decreasekey

 Based on a Binary Heap implementation found in the book
 Eloquent Javascript by Marijn Haverbeke
 http://eloquentjavascript.net/appendix2.html

 (c) 2013 Romain BEAUDON
 BinaryHeap code may be freely distributed under the MIT License
 =================================
 */
(function () {
    'use strict';

    /**
     * A binary min heap implemented with an array
     *
     * @constructor
     *
     * @property {Array} content The elements in the array-implemented heap
     * @property {function} scoreFunction A function that returns the property
     * used for ordering the elements
     * @property {function} idFunction A function that returns the property
     * used as the key of the elements
     * @property {Object} map A map between the element IDs and their index in `content`
     *
     * @param {function} scoreFunction Must return the property used for ordering
     * @param {function} idFunction Must return the property used as the key
     * @param {string} valueProp The name of the property to be modified in `decreaseKey()`
     */

    var MinHeap = function MinHeap(scoreFunction, idFunction, valueProp) {
        this.content = [];
        this.scoreFunction = scoreFunction;
        this.idFunction = idFunction;
        this.valueProp = valueProp;
        this.map = {};
    };

    MinHeap.prototype = {
        /**
         * Get the size of the heap
         *
         * @returns {number} The size of the heap
         */
        size: function size() {
            return this.content.length;
        },

        /**
         * Check if an element exists in the heap
         *
         * @param {Object} elt The element to check
         *
         * @returns {boolean} True if the element exists, false otherwise
         */
        exists: function exists(elt) {
            return this.map[this.idFunction(elt)] !== undefined;
        },

        /**
         * Add a new element to the heap
         *
         * @param {Object} elt The element to add to the heap
         * @throws {Error} Will throw an error if the element is already present in the heap
         */
        push: function push(elt) {
            if (this.map[this.idFunction(elt)] !== undefined) {
                throw new Error('id "' + this.idFunction(elt) + '" already present in heap');
            }

            this.content.push(elt);
            this.bubbleUp(this.content.length - 1);
            //var index = this.bubbleUp(this.content.length - 1);
            //this.map[this.idFunction(elt)] = index;
        },

        /**
         * Removes the minimum element from the heap
         *
         * @returns {Object} The minimum element that was removed
         *
         */
        pop: function pop() {
            var result = this.content[0];
            var end = this.content.pop();

            delete this.map[this.idFunction(result)];

            if (this.content.length > 0) {
                this.content[0] = end;
                this.map[this.idFunction(end)] = 0;
                this.sinkDown(0);
                //var index = this.sinkDown(0);
                //this.map[this.idFunction(end)] = index;
            }

            return result;
        },

        /**
         * Bubbles an element up the heap to restore order
         *
         * @param {number} n The index of the element to shift upward
         *
         * @returns {number} The new index of the element
         */
        bubbleUp: function bubbleUp(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (n > 0) {
                var parentN = Math.floor((n - 1) / 2);
                var parent = this.content[parentN];

                if (this.scoreFunction(parent) < score) {
                    break;
                }

                this.map[this.idFunction(element)] = parentN;
                this.map[this.idFunction(parent)] = n;

                this.content[parentN] = element;
                this.content[n] = parent;
                n = parentN;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        },

        /**
         * Sinks an element down the heap to restore order
         *
         * @param {number} n The index of the element to shift downward
         *
         * @returns {number} The new index of the element
         */
        sinkDown: function sinkDown(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (true) {
                var child2N = (n + 1) * 2;
                var child1N = child2N - 1;
                var swap = null;
                var child1score;

                if (child1N < this.content.length) {
                    var child1 = this.content[child1N];
                    child1score = this.scoreFunction(child1);
                    if (score > child1score) {
                        swap = child1N;
                    }
                }

                if (child2N < this.content.length) {
                    var child2 = this.content[child2N];
                    var child2score = this.scoreFunction(child2);
                    if ((swap === null ? score : child1score) > child2score) {
                        swap = child2N;
                    }
                }

                if (swap === null) {
                    break;
                }

                this.map[this.idFunction(this.content[swap])] = n;
                this.map[this.idFunction(element)] = swap;

                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        },

        /**
         * Decreases the value of a key and the maintains heap order
         *
         * @param {number} id The ID of the element whose value is decreased
         * @param {number} value What the value should decrease to
         */
        decreaseKey: function decreaseKey(id, value) {
            var n = this.map[id];
            this.content[n][this.valueProp] = value;
            this.bubbleUp(n);
        }
    };

    module.exports = MinHeap;
})();