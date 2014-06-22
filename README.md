Open Market
===========

Analytics site for the [Steam market](http://steamcommunity.com/market/) based on data gathered by the [market agent](https://github.com/alvinl/market-agent).

## Requirements
- [Mongodb](http://www.mongodb.org/)
- [Redis](http://redis.io/)
- [Node](http://nodejs.org/)
- [Steam API key](http://steamcommunity.com/dev)

## Config
Default config variables can be found in `config/index.js` and can be overriden by using the following environment variables:
- `MONGO_URI` A MongoURI string to connect to Mongodb (defaults to `localhost/market`)
- `STEAM_KEY` A Steam api key (this is required since it has no default)
- `REDIS_PORT` Redis servers port (defaults to the default port for Redis)
- `REDIS_HOST` Redis server to connect to (defaults to localhost)
- `PORT` The port the app will run on (defaults to `3001`)

## Installation
1. Clone the repo
2. `npm install`
3. `STEAM_KEY='steam api key' npm start`

## Developing
1. Install the app (see above)
2. Run `npm run watch` to have the js and css compiled automatically as you develop
3. Run `npm run build` before pushing out changes