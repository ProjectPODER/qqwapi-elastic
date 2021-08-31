const lib = require('./libv3');
const controllerIndex = "contracts"

function allContracts(context) {
  return lib.genericController(controllerIndex,context);
}

module.exports = {allContracts}