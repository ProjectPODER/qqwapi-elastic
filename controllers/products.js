const lib = require('./libv3');
const controllerIndex = "products"

function productOperation(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;

  return lib.search(controllerIndex,context.params,debug)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results,debug) 
    })
    .then(body => {
      return lib.prepareOutput(body, context, debug)
    })}

module.exports = {productOperation}