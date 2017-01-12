var Utils = require('./utils');

var DepthFirst = {};

DepthFirst.runSearch = function (position, isGoalPosition, getNeighbouringPositions, arePositionsEqual) {
    if (arePositionsEqual === undefined) {
        arePositionsEqual = Utils.defaultEquality;
    }

    var positionsToExplore = [];
    var exploredPositions = [];
    positionsToExplore.push(position);
    while (positionsToExplore.length > 0) {
        var currentPosition = positionsToExplore.pop();

        if (isGoalPosition(currentPosition)) {
            return Utils.prepareResult(exploredPositions, currentPosition);
        }

        if (!Utils.isPositionExplored(exploredPositions, currentPosition, arePositionsEqual)) {
            exploredPositions = Utils.markPositionExplored(exploredPositions, currentPosition);
            positionsToExplore = positionsToExplore.concat(getNeighbouringPositions(currentPosition));
        }
    }

    return Utils.prepareResult(exploredPositions);
};

module.exports = DepthFirst;