
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').search,
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
