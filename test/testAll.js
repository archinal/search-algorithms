var assert = require('assert');

var Searches = require('../main');

var main = function () {
    console.log("Running tests...");
    testDFSBasic();
    testDFSOnGoal();
    testDFSWithNoSoln();
    console.log("All tests passed!");
};

var maze1 = [
    [' ', '*',  '*',  '*',  ' ',  ' ',  ' '],
    [' ', ' ',  ' ',  '*',  ' ',  '*',  ' '],
    [' ', '*',  '*',  '*',  ' ',  '*',  ' '],
    [' ', ' ',  ' ',  '*',  ' ',  ' ',  ' '],
    ['*', '*',  ' ',  ' ',  ' ',  '*',  ' '],
    [' ', '*',  ' ',  ' ',  '*',  ' ',  ' '],
    [' ', ' ',  '*',  ' ',  '*',  'G',  ' ']
];

var isGoalPosition = function (position) {
    return maze1[position.x][position.y] === 'G';
};

var getNeighbouringPositions = function (position) {
    var minX = 0;
    var maxX = maze1.length - 1;
    var minY = 0;
    var maxY = maze1[0].length - 1;


    // Work out the legal moves in the maze
    var possiblePositions = [];
    if (position.x + 1 <= maxX) {
        possiblePositions.push({x: position.x + 1, y: position.y});
    }

    if (position.x - 1 >= minX) {
        possiblePositions.push({x: position.x - 1, y: position.y});
    }

    if (position.y + 1 <= maxY) {
        possiblePositions.push({x: position.x, y: position.y + 1});
    }

    if (position.y - 1 >= minY) {
        possiblePositions.push({x: position.x, y: position.y - 1});
    }

    return possiblePositions.filter(function (p) {
        return maze1[p.x][p.y] !== '*';
    });
};


var arePositionsEqual = function (a, b) {
    return a.x === b.x && a.y === b.y;
};

var testDFSBasic = function () {
    var origin = {x: 0, y: 0};
    var correctGoal = {x: 6, y: 5};
    var result = Searches.DepthFirst.runSearch(origin, isGoalPosition, getNeighbouringPositions, arePositionsEqual);
    assert(result.success === true);
    assert(arePositionsEqual(result.goalPosition, correctGoal));
};

var testDFSOnGoal = function () {
    var origin = {x: 6, y: 5};
    var correctGoal = {x: 6, y: 5};
    var result = Searches.DepthFirst.runSearch(origin, isGoalPosition, getNeighbouringPositions, arePositionsEqual);
    assert(result.success === true);
    assert(arePositionsEqual(result.goalPosition, correctGoal));
    assert(result.exploredPositions.length === 0);
};

var testDFSWithNoSoln = function () {
    var origin = {x: 6, y: 0};
    var result = Searches.DepthFirst.runSearch(origin, isGoalPosition, getNeighbouringPositions, arePositionsEqual);
    assert(result.success === false);
    assert(('goalPosition' in result) === false);
};

main();