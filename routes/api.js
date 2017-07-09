var express = require('express');
var router = express.Router();
var ships = require('../server/ships');

router.get('/hit', function (req, res, next) {
  var coordinate = req.query.coordinate;
  var gameId = req.query.gameId;
  ships.isHit(gameId, coordinate, function (err, isHitOrMiss) {
    res.json({ hitOrMiss: isHitOrMiss });
  });
});

router.get('/new', function (req, res, next) {
  var gameId = ships.newGame();
  res.json({ gameId: gameId });
});

router.get('/loose', (req, res, next) => {
  var gameId = req.query.gameId;
  ships.getShipsLocations(gameId, function (err, locations) {
    res.json(locations);
  });
});

module.exports = router;
