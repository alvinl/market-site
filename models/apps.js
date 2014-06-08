
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var appsSchema = new Schema({

  _id:    Number,
  name:   String,
  sold:   Number,
  profit: Number,
  total:  Number

});

module.exports = mongoose.model('market_apps', appsSchema);
