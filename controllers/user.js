
/**
 * Dependencies
 */

var mongoose = require('mongoose'),
    Utils    = require('../lib/utils'),
    Users    = mongoose.model('market_users');

/**
 * GET /u/:steamID
 */
exports.index = function (req, res, next) {

  var steamID        = req.params.steamID,
      isValidSteamID = Utils.validateSteamID(steamID);

  if (!isValidSteamID) 
    return res.json({ message: 'Invalid SteamID' });

  // Fetch the users (:steamID) info
  Users.findById(steamID, function (err, userProfile) {
  
    if (err) return next(err);

    /**
     * TODO
     * - Proper 404 page for untracked user
     */
    if (!userProfile) return res.end('No stats for this user');

    return res.render('user-page', { title: 'Open Market | ' + steamID });
  
  });

};
