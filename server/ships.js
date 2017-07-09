const ships = {};
const fs = require('fs');
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
    console.log("hit check coordinate = "+JSON.stringify(coordinate));
    if (coordinate === "G7" || coordinate === "G8") {
        return true;
    } else {
        return false;
    }
};

module.exports = ships;