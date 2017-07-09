const ships = {};
const fs = require('fs');

const _ = require('lodash');

var Ship = function (name_, locations_) {
    return {
        name : name_,
        locations : locations_
    };
};

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var boardHeight = 10;
var boardWidth = 10;

var carrierSize = 5;
var battleshipSize = 4;
var submarineSize = 3;
var patrolSize = 2;

ships.getShipsLocations = function (gameId, callback) {
    fs.readFile('./server/data/' + gameId + '.json', function (err, data) {
        if (data) {
            var parsedData = JSON.parse(data.toString());
            if (parsedData) {
                callback(err, parsedData);
            }
        }
    });
};

var hitCountMap = {};

ships.isHit = function (gameId, coordinate, callback) {
    this.getShipsLocations(gameId, function (err, data) {
        if (_.indexOf(data.locations, coordinate) > -1) {

            if(! hitCountMap[gameId]) {
                hitCountMap[gameId] = {count:0};
            }
            var count = hitCountMap[gameId].count;
            count = count + 1;
            hitCountMap[gameId].count = count;
            callback(err, {hitOrMiss: true, win: (count === 14)});
        } else {
            callback(err, {hitOrMiss: false, win: false});
        }
    });
};

ships.saveGame = function (gameId, locations, shipsData) {
    var data = {
        gameId: gameId,
        locations: locations,
        shipsWithLocations: shipsData,
        hitCount: 0
    };
    fs.writeFile('./server/data/' + gameId + '.json', JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("initialized..    " + shipsLocations);
    });
};

ships.newGame = function () {
    console.log("\nstarting a new game...........");
    var shipsData = [];
    var gameId = Math.floor((Math.random() * 100000) + 1);
    var locations = [];
    var carrierLoc = [1, 2, 3, 4, 5];
    carrierLoc = placeShip(locations, 5);
    var carrierShip = new Ship('Carrier', carrierLoc);
    shipsData.push(carrierShip);
    carrierLoc.forEach(p => {
        locations.push(p);
    });

    var battleshipLoc = [11, 12, 13, 14];
    battleshipLoc = placeShip(locations, 4);
    var battleship = new Ship('Battleship', battleshipLoc);
    shipsData.push(battleship);
    battleshipLoc.forEach(p => {
        locations.push(p);
    });

    var submarineLoc = [21, 22, 23];
    submarineLoc = placeShip(locations, 3);
    var submarine = new Ship('Submarine', submarineLoc);
    shipsData.push(submarine);
    submarineLoc.forEach(p => {
        locations.push(p);
    });

    var patrolLoc = [31, 32];
    patrolLocs = placeShip(patrolLoc, 2);
    var patrol = new Ship('Patrol', patrolLocs);
    shipsData.push(patrol);
    patrolLoc.forEach(p => {
        locations.push(p);
    });

    shipsLocations = [];
    locations.forEach(loc => {
        shipsLocations.push(convertToString(loc));
    });
    this.saveGame(gameId, shipsLocations, shipsData);
    return gameId;
};

convertToString = function (locNumber) {
    var m = locNumber / boardWidth;
    var n = locNumber % boardWidth;
    n = Math.floor(n);
    if (n === 0) {
        n = boardWidth;
        m = m - 1;
    }
    var locStr = "" + ALPHABETS.charAt(m) + n;
    return locStr;
};

var downDirFlag = true;
var rightDirFlag = true;

placeShip = function (reservedLocations, size) {
    console.log("placing ship of size = " + size);
    if (size > boardHeight || size > boardWidth) {
        throw error;
    }

    var location = Math.floor((Math.random() * 100) + 1);

    var heightOffset = location / boardHeight;
    var widthOffset = location / boardWidth;

    var row = location / boardWidth;
    var col = location % boardWidth;
    if (col === 0) {
        col = boardWidth;
    } else {
        row = row + 1;
    }

    row = Math.trunc(row);
    var selectedStep = 1;
    var possibleDir = [];
    if ((size + row) > boardHeight) {
        possibleDir.push("UP");
    }
    if ((size + col) > boardWidth) {
        possibleDir.push("LEFT");
    }

    if (possibleDir.length === 0) {
        if (downDirFlag) { //go down
            selectedStep = boardWidth;
            downDirFlag = false;
        } else { // go right
            selectedStep = 1;
            rightDirFlag = false;
        }
    } else {
        if (possibleDir.indexOf("LEFT") > -1) {
            if (!rightDirFlag) {
                selectedStep = -1;
                rightDirFlag = true;
            } else if (possibleDir.indexOf("UP") > -1 && !downDirFlag) {
                selectedStep = - boardWidth;
                downDirFlag = true;
            } else {
                selectedStep = -1;
                rightDirFlag = true;
            }
        } else if (possibleDir.indexOf("UP") > -1) { //it means LEFT is not allowed
            if (!downDirFlag) {
                selectedStep = - boardWidth;
                downDirFlag = true;
            } else {
                selectedStep = 1;
                rightDirFlag = false;
            }
        }
    }

    var myLocations = [];
    myLocations.push(location);
    for (var count = 1; count < size; count++) {
        myLocations.push(location + (selectedStep * count));
    }
    let locationOverlap = false;
    myLocations.forEach(loc => {
        if (_.indexOf(reservedLocations, loc) > -1 && !locationOverlap) {
            locationOverlap = true;
        }
    });
    if (locationOverlap) {
        console.log("retrying....");
        myLocations = placeShip(reservedLocations, size);
    }
    console.log("pushed locations = " + myLocations);
    return myLocations;
};

module.exports = ships;