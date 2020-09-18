const lib = require('./libv3');
const controllerIndex = "persons"

function allPersons(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;

  return lib.search(controllerIndex,context.params,debug)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results,debug) 
    })
    .then(lib.prepareOutput)
}


module.exports = {allPersons}