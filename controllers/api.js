
/**
 * Dependencies
 */

var mongoose     = require('mongoose'),
    config       = require('../config'),
    Utils        = require('../lib/utils'),
    request      = require('request').defaults({ json: true }),
    redis        = require('redis').createClient(config.REDIS.port,
                                                  config.REDIS.host);

var API_ENDPOINT = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=%key&steamids='
                    .replace('%key', config.STEAM_KEY);
/**
 * Mongoose models
 */

var Transactions = mongoose.model('market_transactions'),
    Currencies   = mongoose.model('market_currency'),
    Users        = mongoose.model('market_users'),
    Items        = mongoose.model('market_items'),
    Apps         = mongoose.model('market_apps');

/**
 * GET /api/recent/users
 *
 * Returns recently seen users
 */
exports.recentUsers = function (req, res, next) {

  Users
    .find()
    .sort({ firstSeen: -1 })
    .limit(50)
    .exec(function (err, recentlySeenUsers) {

      if (err)
        return next(err);

      return res.json(recentlySeenUsers);

    });

};

/**
 * GET /api/iteminfo/:itemName
 *
 * Returns a items info
 */
exports.itemInfo = function (req, res, next) {

  if (!req.params.hasOwnProperty('itemName'))
    return res.json({ error: 'Invalid search term' });

  // Check cache for query
  redis.get('infoCache:' + encodeURIComponent(req.params.itemName), function (err, cachedResults) {

    if (err) return next(err);

    // Send cached results
    else if (cachedResults)
      return res.json(JSON.parse(cachedResults));

    // Get new results from MongoDB
    Items
      .find({ $text: { $search: req.params.itemName } },
            { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(1)
      .exec(function (err, searchResults) {

        if (err) return next(err);

        // Cache results to redis for 30 minutes
        redis.set('infoCache:' + encodeURIComponent(req.params.itemName), JSON.stringify(searchResults), 'EX', 1800, function (err) {

          if (err) return next(err);

          return res.json(searchResults);

      });

    });

  });

};

/**
 * GET /api/hash/:imgHash
 *
 * Returns the url for a given image hash
 */
exports.imgHash = function (req, res, next) {

  // Search for the imgHash
  redis.get('market:hashes:' + req.params.imgHash, function (err, hash) {

    if (err) return next(err);

    // No hash found, return a 404
    if (!hash)
      return res.status(404).end();

    // Hash was found, redirect to the image url
    return res.redirect('https://steamcommunity-a.akamaihd.net/economy/image/' + hash + '/125fx125f');

  });

};

/**
 * GET /api/stats
 *
 * Returns the following stats:
 * - Tracked users
 * - Tracked items
 * - Tracked transactions
 */
exports.stats = function (req, res, next) {

  // Fetch how many users we're currently tracking
  Users.count(null, function (err, usersCount) {

    if (err) return next(err);

    // Fetch how many unique items we're tracking
    Items.count(null, function (err, itemsCount) {

      if (err) return next(err);

      // Count up how many transactions have been recorded
      Currencies.aggregate({ $group: { _id: null, total: { $sum: '$sold' } } }, function (err, transactionsCount) {

        if (err) return next(err);

        return res.json({ users: usersCount,
                          items: itemsCount,
                          transactions: transactionsCount[0].total });

      });

    });

  });

};

/**
 * GET /api/transactions/:steamID
 *
 * Returns a users (:steamID) 20 most recent transactions
 */
exports.transactions = function (req, res, next) {

  var steamID        = req.params.steamID,
      isValidSteamID = Utils.validateSteamID(steamID);

  if (!isValidSteamID)
    return res.status(400).json({ error: Utils.msg.INVALID_STEAM_ID });

  Transactions
    .find({ user: steamID }, { __v: 0 })
    .sort('-date')
    .limit(20)
    .exec(function (err, usersTransactions) {

      if (err) return next(err);

      return res.json(usersTransactions);

  });

};

/**
 * GET /api/recent
 *
 * Returns the 50 most recent transactions
 */
exports.recent = function (req, res, next) {

  Transactions
    .find(null, { _id: 0, gameName: 1, name: 1, price: 1, profit: 1, date: 1, user: 1, appID: 1 })
    .sort('-date')
    .limit(50)
    .exec(function (err, recentTransactions) {

      if (err) return next(err);

      return res.json(recentTransactions);

    });

};


/**
 * GET /api/item/recent/:itemName
 *
 * Returns an items (:itemName) 50 most recent transactions.
 */
exports.itemRecent = function (req, res, next) {

  var itemName = req.params.itemName;

  Transactions
    .find({ name: itemName }, { _id: 0, gameName: 1, name: 1, price: 1, profit: 1, date: 1, user: 1, appID: 1 })
    .sort('-date')
    .limit(50)
    .exec(function (err, recentTransactions) {

      if (err) return next(err);

      return res.json(recentTransactions);

    });

};

/**
 * GET /api/app/recent/:appID
 *
 * Returns a games (:appID) 50 most recent transactions
 */
exports.appRecent = function (req, res, next) {

  var appID = req.params.appID;

  Transactions
    .find({ appID: appID }, { _id: 0, gameName: 1, name: 1, price: 1, profit: 1, date: 1, user: 1, appID: 1 })
    .sort('-date')
    .limit(50)
    .exec(function (err, recentTransactions) {

      if (err) return next(err);

      return res.json(recentTransactions);

    });

};

/**
 * GET /api/top/currencies
 *
 * Returns an array of the top currencies.
 */
exports.topCurrencies = function (req, res, next) {

  Currencies
    .find(null, { total: 0 })
    .sort('-profit')
    .limit(50)
    .exec(function (err, topCurrencies) {

      if (err) return next(err);

      return res.json(topCurrencies);

    });

};

/**
 * GET /api/top/users
 *
 * Returns an array of the most profited users.
 */
exports.topUsers = function (req, res, next) {

  Users
    .find(null, { currency: 0 })
    .sort('-profit')
    .limit(50)
    .exec(function (err, topUsers) {

      if (err) return next(err);

      return res.json(topUsers);

    });

};

/**
 * GET /api/top/items
 *
 * Returns an array of the most profited items
 */
exports.topItems = function (req, res, next) {

  Items
    .find(null, { total: 0 })
    .sort('-profit')
    .limit(50)
    .exec(function (err, topItems) {

      if (err) return next(err);

      return res.json(topItems);

    });

};

/**
 * GET /api/top/apps
 *
 * Returns an array of the most profited games
 */
exports.topApps = function (req, res, next) {

  Apps
    .find(null, { total: 0 })
    .sort('-profit')
    .limit(50)
    .exec(function (err, topApps) {

      if (err) return next(err);

      return res.json(topApps);

    });

};

/**
 * GET /api/user/profile/:steamID
 *
 * Returns a users Steam profile data.
 */
exports.profile = function (req, res, next) {

  var timeNow        = Date.now(),
      steamID        = req.params.steamID,
      isValidSteamID = Utils.validateSteamID(steamID);

  if (!isValidSteamID)
    return res.status(400).json({ error: Utils.msg.INVALID_STEAM_ID });

  Users.findById(steamID, function (err, userProfile) {

    if (err) return next(err);

    /**
     * TODO
     * - Create a proper 404 page for untracked users
     */
    if (!userProfile)
      return res.status(404).end('User not found');

    // Send back valid cached data
    if ((timeNow - userProfile.cache) < 43200000)
      return res.json(userProfile);

    // Fetch new data from Steam
    request(API_ENDPOINT + steamID, function (err, response) {

      if (err || response.statusCode !== 200)
        return next(err);

      var apiResponse = response.body;

      var updatedProfile = {

        username: apiResponse.response.players[0].personaname,
        avatar:   apiResponse.response.players[0].avatar,
        cache:    Date.now()

      };

      // Cache the data returned from Steam
      Users.update({ _id: steamID }, updatedProfile, function (err, profileUpdated) {

        if (err) return next(err);

        if (!profileUpdated)
          return next(new Error('Error caching Steam profile data'));

        userProfile.username = updatedProfile.username;
        userProfile.avatar   = updatedProfile.avatar;

        return res.json(userProfile);

      });

    });

  });

};

/**
 * GET /api/search/item/:itemName
 *
 * Returns search results for a item (:itemName)
 */
exports.searchItem = function (req, res, next) {

  if (!req.params.hasOwnProperty('itemName'))
    return res.json({ error: 'Invalid search term' });

  // Check cache for query
  redis.get('searchCache:' + encodeURIComponent(req.params.itemName), function (err, cachedResults) {

    if (err) return next(err);

    // Send cached results
    else if (cachedResults)
      return res.json(JSON.parse(cachedResults));

    // Get new results from MongoDB
    Items
    .find({ $text: { $search: req.params.itemName } },
          { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .limit(10)
    .exec(function (err, searchResults) {

      if (err) return next(err);

      // Cache results to redis for 30 minutes
      redis.set('searchCache:' + encodeURIComponent(req.params.itemName), JSON.stringify(searchResults), 'EX', 1800, function (err) {

        if (err) return next(err);

        return res.json(searchResults);

      });

    });

  });

};

/**
 * GET /api/currency/recent/:currencyID
 *
 * Returns a currencies (:currencyID) 50 most recent transactions
 */
exports.currencyRecent = function (req, res, next) {

   var currencyID = req.params.currencyID;

    Transactions
      .find({ currencyID: currencyID }, { _id: 0, gameName: 1, name: 1, price: 1, profit: 1, date: 1, user: 1, appID: 1 })
      .sort('-date')
      .limit(50)
      .exec(function (err, recentTransactions) {

        if (err) return next(err);

        return res.json(recentTransactions);

      });

};
