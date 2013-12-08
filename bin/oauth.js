(function() {
  var OAuth, http;

  http = require('http');

  module.exports = OAuth = (function() {
    function OAuth(options) {
      var defaults, key, value;
      this.options = {};
      if (typeof defaults === "undefined" || defaults === null) {
        defaults = {
          endpoint: "",
          auth_uri: "",
          client_id: "",
          client_secret: "",
          redirect_uri: ""
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

    OAuth.prototype.authenticate = function() {
      var defaults, key, oldCallback, value, _results;
      defaults = {
        resource: this.options.auth_uri,
        query: {
          client_id: this.options.client_id,
          redirect_uri: this.options.redirect_uri,
          response_type: 'code',
          scope: this.options.scope
        }
      };
      oldCallback = options.callback;
      options.callback = function(body) {
        return oldCallback != null ? oldCallback.apply(this, [body]) : void 0;
      };
      _results = [];
      for (key in defaults) {
        value = defaults[key];
        if (options[key] == null) {
          _results.push(options[key] = value);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    OAuth.prototype.getToken = function(code) {
      return this.request({
        resource: this.options.auth_path,
        response_type: 'token',
        callback: function(auth_token) {
          this.auth_token = auth_token;
        }
      });
    };

    return OAuth;

  })();

}).call(this);
