var express = require('express');
var router = express.Router();
var ships = require('../server/ships');

/* GET users listing. */
router.get('/hit', function(req, res, next) {
  var coordinate = req.query.coordinate;
  var hitOrMiss = ships.isHit(coordinate);
  res.json({hitOrMiss: hitOrMiss});
});

router.get('/new', function(req, res, next) {
  ships.newGame();
  res.json({});
  res.status(201);
});

router.get('/loose', function(req, res, next) {
  //res.json(ships.getShipsData());
  res.json(ships.getShipsLocations());
});

module.exports = router;
