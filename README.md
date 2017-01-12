# Search Algorithms
This is a repository of JavaScript implementations of the following search algorithms:
* [Breadth-First Search](https://en.wikipedia.org/wiki/Breadth-first_search)
* [Depth-First Search](https://en.wikipedia.org/wiki/Depth-first_search)
* [A* Search](https://en.wikipedia.org/wiki/A*_search_algorithm)

The search algorithms are designed to be as generic as possible, and require the following parameters to work (in this order):
* An object `position` representing a position in a search state, or a node in a graph
* A function `isGoalPosition` which, given a `position` object, tells us if this position represents the goal state (if no "goal state" exists, this function can just return false and the algorithm will search the whole state space).
* A funciton `getNeighbouringPositions` which, given a `position` object, returns an array of the valid positions (or state spaces) next to the given position.
* [Optional] a function `arePositionsEqual` which, given two `position` objects, tells us if they're equal. If not such function is supplied, the comparator `==` is used to test equality.

The A-Star Search algorithm takes an extra parameter `heuristic` which, given a `position` object, returns a number estimating how far it is from the goal space. **Note:** It's important that this function never over-estimates the distance to the goal.

### Return Values ###
The search functions return a result object with the following information:
* `success`: True or False depending on whether or not the search found the goal state
* `exploredPositions`: A list of the positions explored in the search in the order in which they were explored.
* `goalPosition`: A position obejct that represents the goal position (Only included if `success` is true)

### Example Usage ###
An example usage of the search algorithms is included in the `test/` directory, where each of the algorithms are used to search a maze for a goal. Consult any of these test functions to see how to use the algorithms.

The general pattern is as follows:
```
// CommonJS style import
var Searches = require('searches');

var result;
// Depth-First Search
result = Searches.DepthFirst.runSearch(origin, isGoalPosition, getNeighbouringPositions, arePositionsEqual);

// Breadth-First Search
result = Searches.BreadthFirst.runSearch(origin, isGoalPosition, getNeighbouringPositions, arePositionsEqual);

// A* Search
var result = Searches.AStar.runSearch(origin, isGoalPosition, getNeighbouringPositions, heuristic, arePositionsEqual);
```
