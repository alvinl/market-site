
/**
 * Dependencies
 */

var controller = require('../controllers').index,
    express    = require('express'),
    router     = express.Router();

router
  .get('/', controller.index);

module.exports = router;
