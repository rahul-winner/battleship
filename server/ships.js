const ships = {};
const fs = require('fs');
const _ = require('lodash');
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
    fs.writeFile('./server/data/first.json', JSON.stringify(initData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("initialized..");
    });
};

ships.isHit = function (coordinate) {
    console.log("hit check coordinate = " + JSON.stringify(coordinate));
    if (coordinate === "G7" || coordinate === "G8") {
        return true;
    } else {
        return false;
    }
};

ships.new = function () {
    var locations = [];
    var carrierLoc = Math.floor((Math.random() * 100) + 1);
    locations.push(carrierLoc);

    var patrolLoc = 0;
    while (patrolLoc === 0 || _.findIndex(locations, patrolLoc) > -1) {
        patrolLoc = Math.floor((Math.random() * 100) + 1);
    }
    var patrolLocs = placeShip(patrolLoc, 2);
    locations.push(patrolLoc);

    var submarineLoc = 0;
    while (submarineLoc === 0 || _.findIndex(locations, submarineLoc) > -1) {
        submarineLoc = Math.floor((Math.random() * 100) + 1);
        console.log('submarineLoc = ' + submarineLoc);
    }
    locations.push(submarineLoc);

    var battleshipLoc = 0;
    while (battleshipLoc === 0 || _.findIndex(locations, battleshipLoc) > -1) {
        battleshipLoc = Math.floor((Math.random() * 100) + 1);
    }
    locations.push(battleshipLoc);
    console.log('new locations..');
    console.log(locations);
};

ships.placeShip = function(location, size){
    var randomDir = Math.floor((Math.random() * 10) + 1);
    var locations = [location];
    randomDir = randomDir / 4;
    switch(randomDir){
        case 0:
            for(var i = 1; i < size; i++){
                locations.push(location + i);
            }
            break;
        case 1:
            for(var j = 1; j < size; j++){
                locations.push(location - j);
            }
            break;        
        case 2:
        case 3:
    }
    return randomDir;
}

module.exports = ships;