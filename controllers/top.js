
/**
 * GET /top/users
 */

exports.users = function (req, res, next) {

  return res.render('top-users', { title: 'Most profited users' }); 

};

/**
 * GET /top/apps
 */

exports.apps = function (req, res, next) {

  return res.render('top-apps', { title: 'Most profited apps' }); 

};

/**
 * GET /top/items
 */

exports.items = function (req, res, next) {

  return res.render('top-items', { title: 'Most profited items' }); 

};

/**
 * GET /top/currencies
 */

exports.currency = function (req, res, next) {

  return res.render('top-currencies', { title: 'Most profited currencies' });   

};