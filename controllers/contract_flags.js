const lib = require('./libv3');
const controllerIndex = "contract_flags"

function allContractFlags(context) {
  return lib.genericController(controllerIndex,context);
}

module.exports = {allContractFlags}