const lib = require('./libv3');
const controllerIndex = "areas,contracts,organizations,persons"

function summaries(context) {
  return search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}

module.exports = {summaries}