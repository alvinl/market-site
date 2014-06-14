
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').stats,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/', controller.index);

/**
 * Export `router`
 */

module.exports = router;
