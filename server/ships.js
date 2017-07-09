const ships = {};
const fs = require('fs');

const _ = require('lodash');

var Ship = function (name_, locations_) {
    this.name = name_;
    this.locations = locations_;
};

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var boardHeight = 10;
var boardWidth = 10;

var carrierSize = 5;
var battleshipSize = 4;
var submarineSize = 3;
var patrolSize = 2;

var shipsLocations = [];
var shipsData = [];

ships.getShipsData = function () {
    return shipsData;
};

ships.getShipsLocations = function () {
    var oldShipsLocations = shipsLocations;
    this.newGame();
    return oldShipsLocations;
};

ships.init = function () {
    console.log("initializing ships..");
    shipsData = [];
    this.newGame();
    fs.writeFile('./server/data/first.json', JSON.stringify(shipsData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("initialized..    " + shipsLocations);
    });
};

ships.isHit = function (coordinate) {
    console.log("hit check coordinate = " + JSON.stringify(coordinate));
    if (_.indexOf(shipsLocations, coordinate) > -1) {
        return true;
    } else {
        return false;
    }
};

ships.newGame = function () {
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

    return locations;
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
    console.log("location = " + location);
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
    console.log("row = " + row);
    console.log("col = " + col);
    var selectedStep = 1;
    var possibleDir = [];
    if ((size + row) > boardHeight) {
        possibleDir.push("UP");
    }
    if ((size + col) > boardWidth) {
        possibleDir.push("LEFT");
    }
    console.log("possibleDir = " + JSON.stringify(possibleDir));
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
    console.log("pushed locations = " + myLocations);
    return myLocations;
}

module.exports = ships;