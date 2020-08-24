const lib = require('./libv3');
const controllerIndex = "persons"

function allPersons(context) {
  return lib.search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}


module.exports = {allPersons}