
/**
 * Dependencies
 */

var cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    express      = require('express'),
    logger       = require('morgan'),
    path         = require('path');

/**
 * Configure app
 */

module.exports = function (app) {

  var config = this;

  app.disable('x-powered-by');
  app.enable('trust proxy');

  app.set('port', config.PORT);

  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

};