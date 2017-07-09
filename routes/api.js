var express = require('express');
var router = express.Router();
var ships = require('../server/ships');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var coordinate = req.query.coordinate;
  var hitOrMiss = ships.isHit(coordinate);
  res.json({hitOrMiss: hitOrMiss});
});

module.exports = router;
