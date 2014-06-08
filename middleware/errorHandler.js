
/**
 * Logs error and displays an error page to 
 * the user.
 */

module.exports = function (err, req, res, next) {

  console.error(err.stack || err);

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  }); 

};