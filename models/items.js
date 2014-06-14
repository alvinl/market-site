
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var itemsSchema = new Schema({

  _id:     String,
  app:     Number,
  appName: String,
  sold:    Number,
  profit:  Number,
  total:   Number,
  imgHash: String

});

module.exports = mongoose.model('market_items', itemsSchema);
