const prepareOutput = require('./libv3').prepareOutput;
const search = require('./libv3').search;

function allAreas(context) {;
  return search("areas",context.params.query).then(results => { return prepareOutput(results) } )
}

module.exports = {allAreas}