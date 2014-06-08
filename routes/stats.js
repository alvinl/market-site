
/**
 * Dependencies
 */

var controller = require('../controllers').stats,
    express    = require('express'),
    router     = express.Router();

router
  .get('/', controller.index);

module.exports = router;
