# graph-dijkstra

A simple undirected graph that allows for finding the shortest path between nodes
via [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue).
This portable package can easily be wrapper into an angular service (as seen in our [demo](demo)).

Developed for use in our [Lincoln Employee Locator][lincoln-gps] application.


**Version:** 0.3.0

## Installation & Typical Usage

1. Install via npm
   * `$ npm install --save-dev https://github.com/LincolnTechOpenSource/graph-dijkstra`
2. Include the JavaScript file
   * `<link rel="stylesheet" href="node_modules/graph-dijkstra/dist/graph-dijkstra.js">`
   * or `<link rel="stylesheet" href="node_modules/graph-dijkstra/dist/graph-dijkstra.min.js">`
3. Use the available API - for example:
   ```javascript
   var graph = new Graph();
   graph.addNode(1, {weight: 1, nType: 1});
   graph.addNode(2, {weight: 1, nType: 1});
   graph.addNode(3, {weight: 4, nType: 1});

   graph.addEdge(1, 2);
   graph.addEdge(2, 3);
   graph.addEdge(1, 3);

   var results = Dijkstra.run(graph, 1, 3);
   var path = Dijkstra.getPath(results.prev, 3);

   console.log(results); // logs: { source: 1, target: 3, dist: { '1': 0, '2': Infinity, '3': 1 }, prev: { '1': 1, '2': null, '3': 1 } }
   console.log(path); // logs: [ 1, 3 ]
   console.log('node 1 is ' + results.dist[3] + ' unit from node 3'); // logs: node 1 is 1 unit from 3
   ```

## Demos

* See the package in an angular application with our simple [demo](demo).

[demo]: demo/index.html

   Here we create a simple service to wrap the **Graph**. Using this service we make a
   36 node graph to serve as a grid and demonstrate how to go about finding and
   acting on the shortest path.

* For an example of this package at work in a larger project, see our
[Lincoln Employee Locator](lincoln-gps) application.

   In this project we again create a service to wrap **Graph**, which serves as
   the underlying graph of location objects (nodes) on which we run **Dijkstra**
   to find the shortest paths between them and generate directions.

## Dependencies

This library assumes that `angular` is available globally and it relies angular's `$http` service.

## Public API

See [wiki pages]() for more detail

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
* **eachNode(fn)**
* **eachNeighbor(id, fn)**
* **addEdge(source, target)**  -  returns **boolean**
* **addOrCreateEdge(source, target)**  -  returns **boolean**
* **deleteEdge(source, target)**  -  returns **boolean**
* **connected(source, target)**  -  returns **boolean**
* **update(id, props)** -             returns **Node**

## Important!

This project is tailored for use in the [Lincoln Employee Locator](lincoln-gps) and may not yet
be optimally portable. We encourage and appreciate any contributions that aim to
enhance the generality/portability of this module.

[lincoln-gps]: https://github.com/LincolnTechOpenSource/lincoln-gps


## How to Contribute

Please see [CONTRIBUTING.md](CONTRIBUTING.md)


## Credits

**Authors:** Matthew Vasseur and David Tahvildaran

**Adapted Resources:**
   * [Min Heap with Decrease Key](https://github.com/rombdn/js-binaryheap-decreasekey)

**Library Resources:**
   * [Lodash v4.3.1](https://www.npmjs.com/package/lodash)

## License

See the [LICENSE file](LICENSE) for license rights and limitations (MIT).
