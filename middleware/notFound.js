
/**
 * Catches all 404 requests
 */
module.exports = function (req, res) {

  return res.status(404).render('404', { title: 'Open Market | 404' });

};