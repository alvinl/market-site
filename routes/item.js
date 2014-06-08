
/**
 * Dependencies
 */

var controller = require('../controllers').items,
    express    = require('express'),
    router     = express.Router();

router
  .get('/:itemName', controller.index);

module.exports = router;
