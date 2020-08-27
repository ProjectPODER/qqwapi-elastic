const lib = require('./libv3');
const controllerIndex = "organizations"

function allInstitutions(context) {
  context.params.query.classification = "institution";
  return lib.search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}

function allCompanies(context) {
  context.params.query.classification = "company";
  return lib.search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}


module.exports = {
  allCompanies,
  allInstitutions,
};
