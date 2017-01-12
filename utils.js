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


module.exports = {
    defaultEquality: defaultEquality,
    isPositionExplored: isPositionExplored,
    markPositionExplored: markPositionExplored,
    prepareResult: prepareResult
};