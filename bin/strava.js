(function() {
  var OAuth, Strava, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  OAuth = require('./oauth.js');

  Strava = (function(_super) {
    __extends(Strava, _super);

    function Strava() {
      _ref = Strava.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Strava.prototype.getConductorRides = function(conductor_id) {
      return this.request({
        resource: "athletes/activities/" + conductor_id,
        callback: function(body) {
          return console.log(body);
        }
      });
    };

    Strava.prototype.getRideLocation = function(ride_id) {
      return this.request({
        resource: "activity/" + ride_id,
        callback: function(body) {
          return console.log(body);
        }
      });
    };

    return Strava;

  })(OAuth);

  module.exports = Strava;

}).call(this);
