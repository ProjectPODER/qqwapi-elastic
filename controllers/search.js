const prepareOutput = require('./libv3').prepareOutput;
const search = require('./libv3').search;

function searchOperation(context) {;
  return search("areas,contracts,organizations,persons",context.params.query).then(results => { return prepareOutput(results) } )
}

module.exports = {searchOperation}