
var mongoose = require('mongoose'),
    Users    = mongoose.model('market_users');

/**
 * GET /u/:steamID
 */

exports.index = function (req, res, next) {

  var steamID = req.params.steamID;

  if (!steamID || steamID.length !== 17 || isNaN(steamID)) return res.json({ message: 'Invalid SteamID' });

  Users.findById(steamID, function (err, userProfile) {
  
    if (err) return next(err);

    if (!userProfile) return res.end('No stats for this user');

    return res.render('user-page', { title: 'Open Market | ' + steamID });
  
  });

};
