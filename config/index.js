
var packageInfo = require('../package'),
    env         = process.env;

module.exports = {
  
  MONGO_URI: env.MONGO_URI || 'mongodb://localhost/market',
  APP_NAME:  packageInfo.name,
  PORT:      env.PORT || 3001,
  STEAM_KEY: env.STEAM_KEY,

  REDIS: {

    port: env.REDIS_PORT || 6379,
    host: env.REDIS_HOST || 'localhost'

  },

  // Initialize mongoose models
  models: require('../models'),

  bootstrap: require('./bootstrapper')

};