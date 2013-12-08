http = require 'http'

module.exports = class OAuth
  constructor: (options) ->
    @options = {}
    if not defaults? then defaults =
      endpoint: ""
      auth_uri: ""
      client_id: ""
      client_secret: ""
      redirect_uri: ""
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

  authenticate: () ->
    # TODO: abandon this code
    query = 
    uri = "#{@options.auth_uri}?#{("#{key}=#{value}" for key, value of params).join '&'}"
    defaults =
      resource: 
      query:
        client_id: @options.client_id
        redirect_uri: @options.redirect_uri
        response_type: 'code'
        scope: @options.scope

    oldCallback = options.callback
    options.callback = (body) ->
      oldCallback?.apply @, [body]

    for key, value of defaults
      options[key] = value if not options[key]?

  getToken: (code) ->
    @request
      resource: @options.auth_path
      response_type: 'token'
      callback: (@auth_token) ->
