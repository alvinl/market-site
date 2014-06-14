
/**
 * Dependencies
 */

var mongoose = require('mongoose'),
    Items    = mongoose.model('market_items');

/**
 * GET /item/:itemName
 */
exports.index = function (req, res, next) {

  var itemName = req.params.itemName;

  // Fetch the items (:itemName) info
  Items.findById(itemName, function (err, itemInfo) {
  
    if (err) return next(err);

    if (!itemInfo) return res.end('No stats for this item');
  
    return res.render('item-page', { title: 'Open Market | ' + itemInfo._id, itemInfo: itemInfo });

  });

};