
/**
 * Dependencies
 */

var controller = require('../controllers/app'),
    express    = require('express'),
    router     = express.Router();

router
  .get('/:appID', controller.app);

module.exports = router;
