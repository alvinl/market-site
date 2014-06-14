
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').items,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/:itemName', controller.index);

/**
 * Export `router`
 */

module.exports = router;
