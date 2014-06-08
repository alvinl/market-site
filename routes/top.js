
/**
 * Dependencies
 */

var controller = require('../controllers').top,
    express    = require('express'),
    router     = express.Router();

router
  .get('/users', controller.users)
  .get('/apps', controller.apps)
  .get('/currencies', controller.currency)
  .get('/items', controller.items);

module.exports = router;
