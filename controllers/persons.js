const lib = require('./libv3');
const controllerIndex = "persons"

function allPersons(context) {
  return lib.genericController(controllerIndex,context);
}


module.exports = {allPersons}