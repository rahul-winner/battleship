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
module.exports = ships;