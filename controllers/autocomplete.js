const lib = require('./libv3');


function autocomplete(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;
  let controllerIndex = lib.allIndexes;

  if (context.params.query.collection) {
    switch (context.params.query.collection) {
      case "persons":
        controllerIndex = "persons";
      break;
      case "companies":
        controllerIndex = "organizations";
      break;
      case "institutions":
        controllerIndex = "organizations";
      break;
      case "areas":
        controllerIndex = "areas";
      break;
      case "products":
        controllerIndex = "products";
      break;
      case "contracts":
        controllerIndex = "contracts";
      break;
      case "all":
      default:
        break;
    }
  }

  controllerIndex += ","; //Adding a comma so we avoid generating a summary, by avoiding matching with allIndexes aggs in libv3 aggs_definitions
  context.params.query.limit = 6; //Limit to 6 results, because that's what the interface needs

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