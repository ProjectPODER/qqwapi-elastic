const lib = require('./libv3');
const controllerIndex = "contracts"

function allContracts(context) {
  return search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}

module.exports = {allContracts}