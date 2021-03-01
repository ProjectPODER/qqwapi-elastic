const monk = require('monk');
const clone = require('lodash/clone');
const lib = require('./libv3');

const dbConnect = process.env.MONGODB_URI || 'localhost:27017/da39a3ee5';
const db = monk(dbConnect);

db.then(() => {
  process.stdout.write(`Connected to mongod server: ${dbConnect}\n`);
});
db.catch(err => {
  console.error("Error connecting to mongod server: ",dbConnect,err);
})

const collection = db.get('records', { castIds: false });

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
  if (typeof object[0] == "object") {
    const recordPackage = clone(recordPackageBase);

    recordPackage.records = object[0];
    recordPackage.uri = `https://api.beta.quienesquien.wiki/v3/record/${object[0].ocid}`;
    recordPackage.publishedDate = object[0].compiledRelease.date;
    object = [recordPackage];
  }
  return object;
}

async function allRecords(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;
  const query = {ocid: context.params.query.ocid };
  const offset = 0;
  // console.log("allContracts debug",debug,context.params.query);

  if (debug) {
    console.log("DEBUG allContracts query",JSON.stringify(query,null,4));
  }

  return collection.find(query, {}).catch(err => {
    console.error("allDocuments error",err);
    if (err) {
      return `error: ${err}`;
    }
    return err;
  })
    .then(array => (addRecordPackage(array, debug)))
    .catch(err => {
      console.error('allContracts query error', err);
      if (err) {
        return err;
      }
      return false;
    })
    .then((array) => {
      if (debug) {
        console.log("return",array);
      }
      return {
        status: "success",
        size:1,
        limit:1,
        offset:0,
        pages: 1,
        count: 1,
        count_precission: "eq",
        data: array,
    };      
    })
}


module.exports = {
  allRecords,
};
