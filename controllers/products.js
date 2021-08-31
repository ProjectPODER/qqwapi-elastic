const lib = require('./libv3');
const controllerIndex = "products"

function productsOperation(context) {
  context.params.query.hide_by_id = ["000.000.0000.00","999.999.9999.99"];

  return lib.genericController(controllerIndex,context);
}

module.exports = {productsOperation}