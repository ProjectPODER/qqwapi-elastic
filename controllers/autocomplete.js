const lib = require('./libv3');
const controllerIndex = "areas,organizations,persons,contracts"

function autocomplete(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;

  return lib.search(controllerIndex,context.params,debug)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results,debug) 
    })
    .then(body => {
      return lib.prepareOutput(body, context, debug)
    })
}

function autocompleteEmptyResponse(context) {
  context.res.json({});
  return true;
}

module.exports = {autocomplete,autocompleteEmptyResponse}