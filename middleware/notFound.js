
/**
 * Catches all 404 requests
 */
module.exports = function (req, res) {

  return res.status(404).end('Page not found');

};