const lib = require('./libv3');
const controllerIndex = "organizations"

function allInstitutions(context) {
  return search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}

function allCompanies(context) {
  return search(controllerIndex,context.params)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results) 
    })
    .then(lib.prepareOutput)
}


module.exports = {
  allCompanies,
  allInstitutions,
};
