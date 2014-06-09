
/**
 * Dependencies
 */

var controller = require('../controllers').api,
    express    = require('express'),
    router     = express.Router();

router
  .get('/transactions/:steamID', controller.transactions)
  .get('/recent', controller.recent)
  .get('/top/users', controller.topUsers)
  .get('/top/apps', controller.topApps)
  .get('/top/items', controller.topItems)
  .get('/top/currencies', controller.topCurrencies)
  .get('/item/recent/:itemName', controller.itemRecent)
  .get('/app/recent/:appID', controller.appRecent)
  .get('/user/profile/:steamID', controller.profile)
  .get('/stats', controller.stats);

module.exports = router;
