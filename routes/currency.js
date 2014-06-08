
/**
 * Dependencies
 */

var controller = require('../controllers/currency'),
    express    = require('express'),
    router     = express.Router();

router
  .get('/:currencyID', controller.currencyID);

module.exports = router;
