# angular-graph-dijkstra

An angular wrapper for an undirected graph that allows for finding the shortest
path via Dijkstra's algorithm.

**Version:** 0.2.1

## Installation & Usage

1. Install via npm
   * `$ npm install --save-dev https://github.com/LincolnTechOpenSource/angular-graph-dijkstra`
2. Include the JavaScript file
   * `<link rel="stylesheet" href="node_modules/angular-graph-dijkstra/dist/graph-dijkstra.js">`
   * or `<link rel="stylesheet" href="node_modules/angular-graph-dijkstra/dist/graph-dijkstra.min.js">`
3. Add the dependency module
   * `var myApp = angular.module('myApp', ['graphDijkstra']);`
4. Use the available directives
   * `angular.controller('myCtrl', function(Graphing, Dijkstra) { ... });`

## Public API

See [wiki pages](#) for more detail

#### graphDijkstra
###### (angular module)
* **Graphing** (*angular factory*)
* **Dijkstra** (*angular factory*)

---

#### Graphing
###### (angular factory)
* **graph** (*variable*)
* **createGraph(url, debug)** (*method*):       returns **Graph**

---

#### Dijkstra
###### (angular factory)
* **RUN(graph)** (*method*):                    returns **{ dist, prev }**

---

#### Graph
###### (object)
* **nodes** (*variable*)
* **nodeCount** (*variable*)
* **edgeCount** (*variable*)
* **Graph(params)** (*constructor*)
* **find(id)** (*method*):                      returns **Node**
* **exists(id)** (*method*):                    returns **boolean**
* **addNode(id, props)** (*method*):            returns **Node**
* **deleteNode(id)** (*method*):                returns **Node**
* **addEdge(source, target)** (*method*):       returns **boolean**
* **deleteEdge(source, target)** (*method*):    returns **boolean**
* **connected(source, target)** (*method*):     returns **boolean**
* **update(id, props)** (*method*):             returns **Node**


## Dependencies

   * [Lodash v4.3.1](https://www.npmjs.com/package/lodash)

## Important!

This project is tailored for use in the [Lincoln Employee Locator ] and may not yet
be optimally portable. We encourage and appreciate any contributions that aim to
enhance the generality/portability of this module.

[Lincoln Employee Locator]: https://github.com/LincolnTechOpenSource/lincoln-gps


## How to Contribute

Please see [CONTRIBUTING.md](CONTRIBUTING.md)


## Credits

**Authors:** Matthew Vasseur and David Tahvildaran

**Adapted Resources:**
   * [Min Heap with Decrease Key](https://github.com/rombdn/js-binaryheap-decreasekey)


## License

See the [LICENSE file](LICENSE) for license rights and limitations (MIT).
