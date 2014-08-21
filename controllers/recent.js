
/**
 * GET /recent/users
 *
 * Renders a page to display recently tracked users
 */

exports.users = function (req, res) {

  return res.render('recent-users', { title: 'Open Market | Recently tracked users' });

};

/**
 * GET /recent/items
 *
 * Renders a page to display recently tracked items
 */

exports.items = function (req, res) {

  return res.render('recent-items', { title: 'Open Market | Recently tracked items' });

};
