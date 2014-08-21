
/**
 * Dependencies
 */

var controller = require('../controllers/recent'),
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

router
  .get('/users', controller.users)
  .get('/items', controller.items);

/**
 * Export `router`
 */

module.exports = router;
