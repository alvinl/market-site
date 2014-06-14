
/**
 * Dependencies
 */

var mongoose = require('mongoose'),
    Apps     = mongoose.model('market_apps');

/**
 * GET /app/:appID
 */
exports.app = function (req, res, next) {

  var appID = req.params.appID;

  // Make sure `:appID` is a number
  if (isNaN(appID))
    return res.json({ error: 'Invalid appID' });
  
  // Fetch the games (:appID) info
  Apps.findById(appID, function (err, appInfo) {
  
    if (err) return next(err);

    /**
     * TODO
     * - Proper 404 page for untracked app
     */
    if (!appInfo) 
      return res.json(404, { error: 'No stats found for this app' });

    return res.render('app-page', { title: 'Open Market | ' + appInfo.name, appInfo: appInfo });
  
  });

};