
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').currency,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/:currencyID', controller.currencyID);

/**
 * Export `router`
 */

module.exports = router;
