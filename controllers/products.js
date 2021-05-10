const lib = require('./libv3');
const controllerIndex = "products"

function productsOperation(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;

  context.params.query.hide_by_id = ["000.000.0000.00","999.999.9999.99"];

  return lib.search(controllerIndex,context.params,debug)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results,debug) 
    })
    .then(body => {
      return lib.prepareOutput(body, context, debug)
    })}

module.exports = {productsOperation}