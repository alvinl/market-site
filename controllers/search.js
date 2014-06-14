
/**
 * GET /search
 */
exports.index = function (req, res) {
  
  return res.render('search', { title: 'Open Market | Search' });

};