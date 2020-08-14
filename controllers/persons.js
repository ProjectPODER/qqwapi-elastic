const prepareOutput = require('./libv3').prepareOutput;
const search = require('./libv3').search;

function allPersons(context) {;
  return search("persons",context.params.query).then(results => { return prepareOutput(results) } )
}

module.exports = {allPersons}