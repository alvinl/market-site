
/**
 * GET /
 */

exports.index = function (req, res) {

  return res.render('index', { title: 'Open Market' });

};