
/**
 * Dependencies
 */

var mongoose   = require('mongoose'),
    Utils      = require('../lib/utils'),
    Currencies = mongoose.model('market_currency');

/**
 * GET /currency/:currencyID
 */
exports.currencyID = function (req, res, next) {

  var currencyID = req.params.currencyID;

  // Make sure `:currencyID` is a number
  if (isNaN(currencyID))
    return res.json({ error: 'Invalid currencyID' });
  
  // Fetch the currencies (:currencyID) info
  Currencies.findById(currencyID, function (err, currencyInfo) {
  
    if (err) return next(err);

    /**
     * TODO
     * - Proper 404 page for untracked currency
     */
    if (!currencyInfo) 
      return res.status(404).end('No stats found for this currency ID');

    // Attach currency symbol
    currencyInfo.symbol = Utils.getCurrencySymbol(currencyInfo._id);

    return res.render('currency-page', { title: 'Open Market | Currency Stats', 
                                        currencyInfo: currencyInfo  });
  
  });

};