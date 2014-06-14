
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').user,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/:steamID', controller.index);

/**
 * Export `router`
 */

module.exports = router;
