
/**
 * GET /stats
 */
exports.index = function (req, res) {

  return res.render('stats', { title: 'Open Market Stats' });

};