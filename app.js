
/**
 * Dependencies
 */

var middleware = require('./middleware'),
    config     = require('./config'),
    routes     = require('./routes'),
    express    = require('express'),
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
app.use('/currency', routes.currency);

/**
 * Middleware
 */

app.use(middleware.notFound);
app.use(middleware.errorHandler);

/**
 * Expose app
 */

module.exports = app;
