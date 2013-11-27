# Strava API implementation
# =========================
#
# documentation: http://strava.github.io/api/
#
# Resources:
# ----------
#
# - oauth
# - athlete
# - athletes/:id
# - activities/:id
# - activities/:id/streams
# - clubs/:id
# - segments/:id
# - segments/:id/leaderboard
# - uploads

OAuth = require './oauth.js'

class Strava extends OAuth
  getConductorRides: (conductor_id) ->
    @request
      resource: "athletes/activities/#{conductor_id}"
      callback: (body) -> console.log body
  getRideLocation: (ride_id) ->
    @request
      resource: "activity/#{ride_id}"
      callback: (body) -> console.log body

module.exports = Strava
