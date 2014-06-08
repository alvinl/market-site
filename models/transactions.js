
var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema;

var transactionsSchema = new Schema({

  _id:        String,
  purchaseID: String,
  price:      Number,
  user:       String,
  profit:     Number,
  currencyID: Number,
  date:       Date,
  img:        String,
  name:       String,
  appID:      String,
  contextID:  String,
  originID:   String,
  instanceID: String,
  classID:    String,
  gameName:   String

});

module.exports = mongoose.model('market_transactions', transactionsSchema);
