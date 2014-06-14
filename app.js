
/**
 * Dependencies
 */

var express    = require('express'),
    ra         = require('./lib/ra'),
    config     = require('./config'),
    routes     = ra(__dirname + '/routes'),
    middleware = ra(__dirname + '/middleware'),
    app        = express();

/**
 * Configure app
 */

config.bootstrap(app);

/**
 * Routes
 */

app.use('/', routes.index);
app.use('/u', routes.user);
app.use('/api', routes.api);
app.use('/top', routes.top);
app.use('/app', routes.app);
app.use('/item', routes.item);
app.use('/stats', routes.stats);
app.use('/search', routes.search);
app.use('/currency', routes.currency);

/**
 * Middleware
 */

app.use(middleware.notFound);
app.use(middleware.errorHandler);

/**
 * Export `app`
 */

module.exports = app;
