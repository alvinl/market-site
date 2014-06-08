
var mongoose = require('mongoose'),
    Apps     = mongoose.model('market_apps');

/**
 * GET /app/:appID
 */

exports.app = function (req, res, next) {

  var appID = req.params.appID;
  
  Apps.findById(appID, function (err, appInfo) {
  
    if (err) return next(err);

    if (!appInfo) return res.json(404, { error: 'No stats found for this app' });

    return res.render('app-page', { title: 'Open Market | ' + appInfo.name, appInfo: appInfo });
  
  });

};