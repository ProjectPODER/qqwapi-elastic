const lib = require('./libv3');
const controllerIndex = lib.allIndexes

function searchOperation(context) {
  return lib.genericController(controllerIndex,context);
}

module.exports = {searchOperation}