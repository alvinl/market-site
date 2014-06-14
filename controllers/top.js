
/**
 * GET /top/users
 */
exports.users = function (req, res) {

  return res.render('top/users', { title: 'Open Market | Most profited users' }); 

};

/**
 * GET /top/apps
 */
exports.apps = function (req, res) {

  return res.render('top/apps', { title: 'Open Market | Most profited games' }); 

};

/**
 * GET /top/items
 */
exports.items = function (req, res) {

  return res.render('top/items', { title: 'Open Market | Most profited items' }); 

};

/**
 * GET /top/currencies
 */
exports.currency = function (req, res) {

  return res.render('top/currencies', { title: 'Open Market | Most profited currencies' });   

};