
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').top,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/users', controller.users)
  .get('/apps', controller.apps)
  .get('/currencies', controller.currency)
  .get('/items', controller.items);

/**
 * Export `router`
 */

module.exports = router;
