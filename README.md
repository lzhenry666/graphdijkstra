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
* **Graphing** (*angular service*)
* **Dijkstra** (*angular service*)

---

#### Graphing
###### (angular service)
* **graph** - variable **Graph**
* **createGraph(url, debug)** - returns **Graph**

---

#### Dijkstra
###### (angular service)
* **RUN(graph)** - returns **{dist, prev}**

---

#### Graph
###### (object)
* **Graph(params)** (*constructor*)
* **nodes** - variable **{Node}**
* **nodeCount** - variable **integer**
* **edgeCount** - variable **integer**
* **find(id)**  -  returns **Node**
* **exists(id)**  -  returns **boolean**
* **addNode(id, props)**  -  returns **Node**
* **deleteNode(id)**  -  returns **Node**
* **addEdge(source, target)**  -  returns **boolean**
* **deleteEdge(source, target)**  -  returns **boolean**
* **connected(source, target)**  -  returns **boolean**
* **update(id, props)** -             returns **Node**


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
