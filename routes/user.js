
/**
 * Dependencies
 */

var controller = require('../controllers').user,
    express    = require('express'),
    router     = express.Router();

router
  .get('/:steamID', controller.index);

module.exports = router;
