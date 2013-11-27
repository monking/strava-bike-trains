http = require 'http'

module.exports = class OAuth
  constructor: (options) ->
    @options = {}
    if not defaults? then defaults =
      endpoint:"https://www.strava.com/api/v3"
      client_id:"123"
      client_secret:"1234567890qwerty"
      access_token:"1234567890qwerty"
    for key, value of defaults
      @options[key] = if options[key]? then options[key] else value

  request: (options) ->
    defaults =
      resource: ''
      callback: null
      params: null
      method: 'GET'
      port: 80
    for key, value of defaults
      options[key] = value if not options[key]?

    url = "#{@options.endpoint}/#{options.resource}"
    urlParts = (url.replace /^([a-z]+):\/\/([^\/]+)(.*)/, "$1\n$2\n$3").split("\n")
    requestOptions =
      host: urlParts[1]
      port: options.port
      path: urlParts[2]
      method: options.method

    request = http.request requestOptions, (response) ->
      response.setEncoding 'utf8'
      response.on 'data', (body) ->
        options.callback?(body)

    request.end()
