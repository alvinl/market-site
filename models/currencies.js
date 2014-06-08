
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var currencyStatsSchema = new Schema({

  _id:    Number,
  sold:   Number,
  profit: Number,
  total:  Number

});

module.exports = mongoose.model('market_currency', currencyStatsSchema);
