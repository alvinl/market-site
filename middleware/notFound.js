
/**
 * Catches all 404 requests
 */

module.exports = function (req, res, next) {

  res.status(404);
  return res.end('Page not found');

};