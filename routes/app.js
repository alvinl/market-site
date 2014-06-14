
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').app,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/:appID', controller.app);

/**
 * Export `router`
 */

module.exports = router;
