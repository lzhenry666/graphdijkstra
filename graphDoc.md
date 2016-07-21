# Graph

Provides a data structure for a simple undirected graph

## find

Graph.find: finds the node specified by id. ID should exist (and not be an invalid property)

**Parameters**

-   `id`  

Returns **Any** the node if found, null otherwise

## exists

Graph.exists: checks if the specified ID already exists in the graph

**Parameters**

-   `id`  

Returns **Any** true if it is a node, false otherwise

## addNode

Graph.addNode: add a new node to the graph

**Parameters**

-   `id`  
-   `props`  

Returns **Any** the added (or existing) node with @id

## deleteNode

Graph.deleteNode: delete a node from the graph. true if successful

**Parameters**

-   `id`  

Returns **Any** the node that was deleted or null if it does not exist

## eachNode

Graph.eachNode: perform a function on each node in the graph

**Parameters**

-   `fn`  

## eachNeighbor

Graph.eachNeighbor: perform a function on each neighbor of the node

**Parameters**

-   `id`  
-   `fn`  

## addEdge

Graph.addEdge: connect two nodes (undirected edge) that both exist
do not allow self edges (by nature of being a simple graph)

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if able to add edge, false otherwise (i.e., self edge, invalid, or redundant)

## addOrCreateEdge

Graph.addOrCreateEdge: the same as addEdge(), but will create nodes that do not exist
do not allow self edges (by nature of being a simple graph)

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if able to add or create the edge, false otherwise (i.e., self edge, invalid, or redundant)

## deleteEdge

Graph.deleteEdge: delete an edge from the graph

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if successful, false otherwise

## connected

Graph.connected: is there an edge connecting
the @source and @target (note only returns true if it is consistent)

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if yes, false if no

## update

Graph.update: set the properties of the node specified by @id

**Parameters**

-   `id`  
-   `props`  

Returns **Any** the updated node on success, or null if unable to update/find

# Graph

Graph object with basic properties

**Parameters**

-   `graph` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** A JSON representation of a graph to initialize

**Properties**

-   `nodes` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The nodes in the graph
-   `nodeCount` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of nodes
-   `edgeCount` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of edges

**Examples**

_Example graph parameter_

```javascript
{ nodes: [
    { id: 1, props: { weight: 0, nType: 5 } }, // Office 1
    { id: 2, props: { weight: 0, nType: 5 } }, // Office 2
    { id: 3, props: { weight: 1, nType: 3 } }, // short path
    { id: 4, props: { weight: 2, nType: 3 } }  // long  path
],
edges: [
    [1, 3],
    [3, 4],
    [4, 2]
] }
```

## find

Graph.find: finds the node specified by id. ID should exist (and not be an invalid property)

**Parameters**

-   `id`  

Returns **Any** the node if found, null otherwise

## exists

Graph.exists: checks if the specified ID already exists in the graph

**Parameters**

-   `id`  

Returns **Any** true if it is a node, false otherwise

## addNode

Graph.addNode: add a new node to the graph

**Parameters**

-   `id`  
-   `props`  

Returns **Any** the added (or existing) node with @id

## deleteNode

Graph.deleteNode: delete a node from the graph. true if successful

**Parameters**

-   `id`  

Returns **Any** the node that was deleted or null if it does not exist

## eachNode

Graph.eachNode: perform a function on each node in the graph

**Parameters**

-   `fn`  

## eachNeighbor

Graph.eachNeighbor: perform a function on each neighbor of the node

**Parameters**

-   `id`  
-   `fn`  

## addEdge

Graph.addEdge: connect two nodes (undirected edge) that both exist
do not allow self edges (by nature of being a simple graph)

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if able to add edge, false otherwise (i.e., self edge, invalid, or redundant)

## addOrCreateEdge

Graph.addOrCreateEdge: the same as addEdge(), but will create nodes that do not exist
do not allow self edges (by nature of being a simple graph)

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if able to add or create the edge, false otherwise (i.e., self edge, invalid, or redundant)

## deleteEdge

Graph.deleteEdge: delete an edge from the graph

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if successful, false otherwise

## connected

Graph.connected: is there an edge connecting
the @source and @target (note only returns true if it is consistent)

**Parameters**

-   `source`  
-   `target`  

Returns **Any** true if yes, false if no

## update

Graph.update: set the properties of the node specified by @id

**Parameters**

-   `id`  
-   `props`  

Returns **Any** the updated node on success, or null if unable to update/find

# defineProperties

Graph define properties

# defineProperties

GraphNode define properties

# \_fixConsistency

\_fixConsistency: fixes the inconsistencies in @graph caused by the neighbors
of @node by adding the necessary edges

**Parameters**

-   `graph`  
-   `node`  

# exports

graph-node.js
07/08/16

# GraphNode

GraphNode
create a new node with @id @neighbors, @weight, and @nType

**Parameters**

-   `id`  
-   `props`  
