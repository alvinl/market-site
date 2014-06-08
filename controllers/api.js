
var request      = require('request'),
    mongoose     = require('mongoose'),
    Transactions = mongoose.model('market_transactions'),
    Users        = mongoose.model('market_users'),
    Items        = mongoose.model('market_items'),
    Apps         = mongoose.model('market_apps'),
    Currencies   = mongoose.model('market_currency'),
    Utils        = require('../lib/utils'),
    config       = require('../config'),
    redis        = require('redis').createClient(config.REDIS.port, config.REDIS.host);

var API_ENDPOINT = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=%key&steamids='
                    .replace('%key', config.STEAM_KEY);

redis.select(2);

/**
 * GET /api/stats
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

        return res.json({ users: usersCount, items: itemsCount, transactions: transactionsCount[0].total });
      
      });
    
    });
  
  });

};

/**
 * GET /api/transactions/:steamID
 */
exports.transactions = function (req, res, next) {

  var steamID        = req.params.steamID,
      isValidSteamID = Utils.validateSteamID(steamID);

  if (!isValidSteamID) return res.status(400).json({ error: Utils.msg.INVALID_STEAM_ID });

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
 */
exports.topCurrencies = function (req, res, next) {

  Currencies
    .find(null, { total: 0 })
    .sort('-profit')
    .limit(50)
    .exec(function (err, topCurrencies) {
    
      if (err) return next(err);

      topCurrencies = topCurrencies.map(function (currency) {

        return { _id:    currency._id, 
                 sold:   currency.sold,
                 profit: currency.profit,
                 total:  currency.total,
                 name:   Utils.getCurrencySymbol(currency._id) };
      
      });

      return res.json(topCurrencies);
    
    });

};

/**
 * GET /api/top/users
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
 */
exports.profile = function (req, res, next) {

  var steamID = req.params.steamID,
      timeNow = Date.now();

  if (steamID.length !== 17) return res.json({ error: 'Invalid Steam ID' });

  Users.findById(steamID, function (err, userProfile) {
  
    if (err) return next(err);

    if (!userProfile) return res.status(404).end('User not found');

    if ((timeNow - userProfile.cache) < 43200000) return res.json(userProfile);

    request(API_ENDPOINT + steamID, function (err, resp, body) {
    
      if (err || resp.statusCode !== 200) return next(err);

      var apiResponse;

      try {

        apiResponse = JSON.parse(body);

      } catch (e) {

        return next(e);

      }
    
      var updatedProfile = {

        username: apiResponse.response.players[0].personaname,
        avatar:   apiResponse.response.players[0].avatar,
        cache:    Date.now()

      };

      Users.update({ _id: steamID }, updatedProfile, function (err, profileUpdated) {
      
        if (err) return next(err);

        if (!profileUpdated) return next(new Error('Error updating profile'));

        userProfile.username = updatedProfile.username;
        userProfile.avatar   = updatedProfile.avatar;

        return res.json(userProfile);
      
      });

    });
  
  });

};

/**
 * GET /api/users
 */
exports.users = function (req, res, next) {

  redis.zrevrange('market:stats:items:profit', 0, -1, function (err, allUsers) {
  
    if (err) return next(err);

    return res.json({ users: allUsers }); 
  
  });

};
