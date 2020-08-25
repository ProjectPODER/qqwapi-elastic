const lib = require('./libv3');

function summaries(context) {
  let controllerIndex = context.params.type;
  delete context.params.type;

  return lib.search(controllerIndex,context.params)
    .then(results => { 
      return lib.addSummaries(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}


module.exports = {summaries}