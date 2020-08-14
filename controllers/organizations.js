const prepareOutput = require('./libv3').prepareOutput;
const search = require('./libv3').search;

function allInstitutions(context) {;
  return search("organizations",context.params.query).then(results => { return prepareOutput(results) } )
}
function allCompanies(context) {;
  return search("organizations",context.params.query).then(results => { return prepareOutput(results) } )
}

module.exports = {
  allCompanies,
  allInstitutions,
};
