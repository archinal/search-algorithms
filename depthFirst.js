var DepthFirst = {};

DepthFirst.runSearch = function (position, isGoalPosition, getNeighbouringPositions, arePositionsEqual) {
    if (arePositionsEqual === undefined) {
        arePositionsEqual = defaultEquality;
    }

    var positionsToExplore = [];
    var exploredPositions = [];
    positionsToExplore.push(position);
    while (positionsToExplore.length > 0) {
        var currentPosition = positionsToExplore.pop();
        if (isGoalPosition(currentPosition)) {
            return prepareResult(exploredPositions, currentPosition);
        }

        if (!isPositionExplored(exploredPositions, position, arePositionsEqual)) {
            exploredPositions = markPositionExplored(exploredPositions, position);
            positionsToExplore = positionsToExplore.concat(getNeighbouringPositions(position));
        }
    }

    return prepareResult(exploredPositions);
};

var defaultEquality = function (a, b) {
    return a == b;
};

var isPositionExplored = function (exploredPositions, position, arePositionsEqual) {
    var explored = false;

    var i;
    for (i = 0; !explored && i < exploredPositions.length; i++) {
        explored = arePositionsEqual(position, exploredPositions[i]);
    }

    return explored;
};

var markPositionExplored = function (exploredPositions, position) {
    return exploredPositions.concat(position);
};

var prepareResult = function (exploredPositions, goalPosition) {
    var result = {
        exploredPositions: exploredPositions,
        success: (goalPosition !== undefined)
    };

    if (result.success) {
        result.goalPosition = goalPosition;
    }

    return result;
};

module.exports = DepthFirst;