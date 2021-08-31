const lib = require('./libv3');
const controllerIndex = "areas"

function allAreas(context) {
  return lib.genericController(controllerIndex,context);
}

module.exports = {allAreas}