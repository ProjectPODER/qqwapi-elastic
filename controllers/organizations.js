const lib = require('./libv3');
const controllerIndex = "organizations"

function allInstitutions(context) {
  context.params.query.classification = "institution";
  return lib.genericController(controllerIndex,context);

}

function allCompanies(context) {
  context.params.query.classification = "company";
  return lib.genericController(controllerIndex,context);

}


module.exports = {
  allCompanies,
  allInstitutions,
};
