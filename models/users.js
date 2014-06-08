
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usersSchema = new Schema({

  _id:      String,
  profit:   Number,
  sold:     Number,
  total:    Number,
  cache:    Number,
  username: String,
  avatar:   String

});

module.exports = mongoose.model('market_users', usersSchema);
