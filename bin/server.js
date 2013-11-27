(function() {
  var config, express, strava;

  config = require('../config.json');

  express = require('express');

  strava = new (require('./strava.js'))(config.strava);

  strava.getConductorRides(1);

}).call(this);
