const lib = require('./libv3');
const controllerIndex = "areas,contracts,organizations,persons"

function autocomplete(context) {
  return lib.search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}

function autocompleteEmptyResponse(context) {
  context.res.json({});
  return true;
}

module.exports = {autocomplete,autocompleteEmptyResponse}