const ships = {};
const fs = require('fs');
const _ = require('lodash');
const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var boardHeight = 10;
var boardWidth = 10;

var shipsLocations = [];

var carrierSize = 5;
var battleshipSize = 4;
var submarineSize = 3;
var patrolSize = 2;

const initData = {
    carrier: {

    },
    battleShip: {

    },
    submarine: {

    },
    patrol: {

    }
}
ships.init = function () {
    console.log("initializing ships..");
    this.newGame();
    fs.writeFile('./server/data/first.json', JSON.stringify(initData), function (err) {
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
    //carrierLoc = Math.floor((Math.random() * 100) + 1);
    carrierLoc.forEach(p => {
        locations.push(p);
    });     

    var battleshipLoc = [11, 12, 13, 14];
    // while (battleshipLoc === 0 || _.findIndex(locations, battleshipLoc) > -1) {
    //     battleshipLoc = Math.floor((Math.random() * 100) + 1);
    // }
    battleshipLoc.forEach(p => {
        locations.push(p);
    });    

    var submarineLoc = [21, 22, 23];
    // while (submarineLoc === 0 || _.findIndex(locations, submarineLoc) > -1) {
    //     submarineLoc = Math.floor((Math.random() * 100) + 1);
    //     console.log('submarineLoc = ' + submarineLoc);
    // }
    submarineLoc.forEach(p => {
        locations.push(p);
    });

    var patrolLoc = [31, 32];
    // while (patrolLoc === 0 || _.findIndex(locations, patrolLoc) > -1) {
    //     patrolLoc = Math.floor((Math.random() * 100) + 1);
    // }
    // var patrolLocs = placeShip(patrolLoc, 2);
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
    var m = locNumber / 10;
    var n = locNumber % 10;
    var locStr = "" + ALPHABETS.charAt(m) + n;
    return locStr;
}

ships.placeShip = function (location, size) {

    var heightOffset = location / boardHeight;
    var widthOffset = location / boardWidth;

    var randomDir = Math.floor((Math.random() * 10) + 1);
    var locations = [location];
    randomDir = randomDir / 4;
    switch (randomDir) {
        case 0:
            for (var i = 1; i < size; i++) {
                locations.push(location + i);
            }
            break;
        case 1:
            for (var j = 1; j < size; j++) {
                locations.push(location - j);
            }
            break;
        case 2:
        case 3:
    }
    return randomDir;
}

module.exports = ships;