
var fs = require('fs');

/**
 * Require all .js files in a folder and return them as an object
 * 
 * @param {String} folderName Folder to require files in
 */
function RequireAll (folderName) {
 
  var files   = fs.readdirSync(folderName),
      modules = {};

  files.forEach(function (file) {
    
    if (file.match('.js'))
      modules[file.replace('.js', '')] = require(folderName + '/' + file);

  });

  return modules;

}

/**
 * Export `RequireAll`
 */
module.exports = function (folderName) {
  
  return new RequireAll(folderName);

};