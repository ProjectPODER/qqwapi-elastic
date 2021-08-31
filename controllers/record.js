const lib = require('./libv3');
const controllerIndex = "records"
const clone = require("lodash").clone

function allRecords(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;
  return lib.genericController(controllerIndex,context,addRecordPackage);

  return lib.search(controllerIndex,context.params,debug)
    .then(results => { 
      return lib.embed(controllerIndex,context.params,results,debug) 
    })
    .then(body => {
      const rp = addRecordPackage(body,debug)
      return lib.prepareOutput(rp, context, debug)
    })
}


module.exports = {allRecords}


const recordPackageBase = {
  uri: '',
  version: '1.1',
  extensions: [
    'https://raw.githubusercontent.com/transpresupuestaria/ocds_contract_data_extension/master/extension.json',
    'https://raw.githubusercontent.com/open-contracting-extensions/ocds_partyDetails_scale_extension/master/extension.json',
    'https://raw.githubusercontent.com/open-contracting/ocds_budget_breakdown_extension/master/extension.json',
    'https://raw.githubusercontent.com/open-contracting-extensions/ocds_memberOf_extension/master/extension.json',
    'https://raw.githubusercontent.com/ProjectPODER/ocds_compranet_extension/master/extension.json',

  ],
  publisher: {
    name: 'QuienEsQuien.wiki',
    uri: 'https://quienesquien.wiki/',
  },
  license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.es',
  publicationPolicy: 'https://quienesquien.wiki/about',
  publishedDate: '',
  records: [],
};


function addRecordPackage(object, debug) {
  if (debug) {
    console.log("addRecordPackage", object);
  }
  if (object && object.hits && object.hits.hits  && object.hits.hits[0] && typeof object.hits.hits[0]._source && typeof object.hits.hits[0]._source == "object") {
    const recordPackage = clone(recordPackageBase);

    recordPackage.records = object.hits.hits[0]._source;
    recordPackage.uri = `https://api.quienesquien.wiki/v3/record?ocid=${object.hits.hits[0]._source.ocid}`;
    recordPackage.publishedDate = object.hits.hits[0]._source.compiledRelease.date;
    object.hits.hits[0]._source = recordPackage;
  }
  return object;
}
