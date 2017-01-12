var Utils = require('./utils');

var AStar = {};

AStar.runSearch = function(position, isGoalPosition, getNeighbouringPositions, arePositionsEqual, heuristic) {
    if (arePositionsEqual === undefined) {
        arePositionsEqual = Utils.defaultEquality;
    }

    var positionsToExplore = [];
    var exploredPositions = [];
    positionsToExplore.push(position);
    while (positionsToExplore.length > 0) {
        var currentPosition = positionsToExplore.splice(0, 1)[0];

        if (isGoalPosition(currentPosition)) {
            return Utils.prepareResult(exploredPositions, currentPosition);
        }

        if (!Utils.isPositionExplored(exploredPositions, currentPosition, arePositionsEqual)) {
            exploredPositions = Utils.markPositionExplored(exploredPositions, currentPosition);
            positionsToExplore = positionsToExplore.concat(getNeighbouringPositions(currentPosition));
            positionsToExplore.sort(function (a, b) {
                return heuristic(a) < heuristic(b);
            });
        }
    }

    return Utils.prepareResult(exploredPositions);
};

module.exports = AStar;