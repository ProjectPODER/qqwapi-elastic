const prepareOutput = require('./libv3').prepareOutput;
const search = require('./libv3').search;

function allContracts(context) {;
  return search("contracts",context.params.query).then(results => { return prepareOutput(results) } )
}

module.exports = {allContracts}