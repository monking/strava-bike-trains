config = require '../config.json'
express = require 'express'
strava = new (require './strava.js') config.strava

# a shot in the dark
strava.getConductorRides 1
