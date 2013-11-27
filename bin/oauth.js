(function() {
  var OAuth, http;

  http = require('http');

  module.exports = OAuth = (function() {
    function OAuth(options) {
      var defaults, key, value;
      this.options = {};
      if (typeof defaults === "undefined" || defaults === null) {
        defaults = {
          endpoint: "https://www.strava.com/api/v3",
          client_id: "123",
          client_secret: "1234567890qwerty",
          access_token: "1234567890qwerty"
        };
      }
      for (key in defaults) {
        value = defaults[key];
        this.options[key] = options[key] != null ? options[key] : value;
      }
    }

    OAuth.prototype.request = function(options) {
      var defaults, key, request, requestOptions, url, urlParts, value;
      defaults = {
        resource: '',
        callback: null,
        params: null,
        method: 'GET',
        port: 80
      };
      for (key in defaults) {
        value = defaults[key];
        if (options[key] == null) {
          options[key] = value;
        }
      }
      url = "" + this.options.endpoint + "/" + options.resource;
      urlParts = (url.replace(/^([a-z]+):\/\/([^\/]+)(.*)/, "$1\n$2\n$3")).split("\n");
      requestOptions = {
        host: urlParts[1],
        port: options.port,
        path: urlParts[2],
        method: options.method
      };
      request = http.request(requestOptions, function(response) {
        response.setEncoding('utf8');
        return response.on('data', function(body) {
          return typeof options.callback === "function" ? options.callback(body) : void 0;
        });
      });
      return request.end();
    };

    return OAuth;

  })();

}).call(this);
