
function Utils () { }

/**
 * Validates a given SteamID
 * @param  {String} steamID 64bit SteamID
 * @return {Boolean}
 */

Utils.prototype.validateSteamID = function (steamID) {

  if (!steamID || steamID.length !== 17 || isNaN(steamID)) return false;

  return true;

};

Utils.prototype.getCurrencySymbol = function (currencyID) {

  var currencyNames = {

    2001: 'USD',
    2002: 'GBP',
    2003: 'EUR',
    2005: 'RUB',
    2007: 'BRL'

  };

  // DEBUG
  console.dir((currencyNames[currencyID]) ? currencyNames[currencyID] : 'Unknown');

  return (currencyNames[currencyID]) ? currencyNames[currencyID] : 'Unknown';

};

Utils.prototype.msg = {

  INVALID_STEAM_ID: 'Invalid Steam ID'

};

/**
 * Export `Utils`
 */

module.exports = new Utils();
