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
   // graph.nodes     => { '1': GraphNode { id: 1, weight: 1, nType: 1, neighbors: [] } }
   // graph.nodeCount => 1

   graph.addNode(2, {weight: 1, nType: 1});
   // graph.nodes     => { '1': GraphNode { id: 1, ... }, '2': GraphNode { id: 2, ... } }
   // graph.nodeCount =>  2

   graph.addNode(3, {weight: 4, nType: 1});
   // graph.nodes     => { '1': GraphNode { id: 1, ... }, '2': GraphNode { id: 2, ... }, '3': GraphNode { id: 3, weight: 4, ... } }
   // graph.nodeCount => 3

   graph.addEdge(1, 2);
   // graph.nodes     => { '1': GraphNode { id: 1, ..., neighbors: [ 2 ] }, '2': GraphNode { id: 2, ..., neighbors: [ 1 ] }, '3': GraphNode { id: 3, ...} }
   // graph.edgeCount => 1

   graph.addEdge(2, 3);
   // graph.nodes     => { '1': GraphNode { id: 1, ... }, '2': GraphNode { id: 2, ..., neighbors: [ 1, 3 ] }, '3': GraphNode { id: 3, ..., neighbors: [ 2 ] } }
   // graph.edgeCount => 2

   graph.addEdge(1, 3);
   // graph.nodes     => { '1': GraphNode { id: 1, ..., neighbors: [ 2, 3 ] }, '2': GraphNode { id: 2, ... }, '3': GraphNode { id: 3, ..., neighbors: [ 2, 1 ] } }
   // graph.edgeCount => 3

   var results   = Dijkstra.run(graph, 1, 3);
   var path      = Dijkstra.getPath(results.prev, 3);
   var printDist = 'node 1 is ' + results.dist[3] + ' unit from node 3'

   // results   => { source: 1, target: 3, dist: { '1': 0, '2': 1, '3': 1 }, prev: { '1': 1, '2': 1, '3': 1 } }
   // path      => [ 1, 3 ]
   // printDist => node 1 is 1 unit from node 3
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

## Public API

See [wiki pages]() for more detail

#### Graph
###### (prototype)
* **Graph(params)** (*constructor*)
* **nodes** - property **{GraphNode}**
* **nodeCount** - property **integer**
* **edgeCount** - property **integer**
* **find(id)**  -  returns **GraphNode**
* **exists(id)**  -  returns **boolean**
* **addNode(id, props)**  -  returns **GraphNode**
* **deleteNode(id)**  -  returns **GraphNode**
* **eachNode(fn)**
* **eachNeighbor(id, fn)**
* **addEdge(source, target)**  -  returns **boolean**
* **addOrCreateEdge(source, target)**  -  returns **boolean**
* **deleteEdge(source, target)**  -  returns **boolean**
* **connected(source, target)**  -  returns **boolean**
* **update(id, props)** -             returns **GraphNode**

#### GraphNode
###### (prototype)
* **id** - property **integer**
* **weight** - property **integer**
* **nType** - property **integer**
* **neighbors** - property **[integer]**

#### Dijkstra
###### (prototype)
* **run(graph, pathType, source, target)** - returns **{source, target, dist, prev}**
* **getPath(prevList, target)** - returns **[integer]**

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
