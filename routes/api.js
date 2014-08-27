
/**
 * Dependencies
 */

var controller = require('../lib/ra')(__dirname + '/../controllers').api,
    express    = require('express'),
    router     = express.Router();

/**
 * Routes
 */

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
  .get('/hash/:imgHash', controller.imgHash)
  .get('/stats', controller.stats)
  .get('/search/item/:itemName', controller.searchItem)
  .get('/currency/recent/:currencyID', controller.currencyRecent)
  .get('/iteminfo/:itemName', controller.itemInfo)
  .get('/recent/users', controller.recentUsers)
  .get('/recent/items', controller.recentItems)
  .get('/stats/stream', controller.statsStream);

/**
 * Export `router`
 */

module.exports = router;
