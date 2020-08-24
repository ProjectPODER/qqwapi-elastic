const monk = require('monk');
const clone = require('lodash/clone');
const dbConnect = process.env.MONGODB_URI || 'localhost:27017/da39a3ee5';
const db = monk(dbConnect);

db.then(() => {
  process.stdout.write(`Connected to mongod server: ${dbConnect}\n`);
});
db.catch(err => {
  console.error("Mongo Error: ",err);

  //We should exit if no connection is made. I'm excluding production to test this.
  if (process.env.NODE_ENV !== "production") {
    // process.exit();
  }
})

const collection = db.get('records', { castIds: false });

// function allRecords(req, res) {
//   const query = getQuery(req);
//   const offset = query.options.skip || 0;
//   const resultsP = collection.find(query.criteria, query.options);
//   const countP = collection.count(query);

//   return Promise.all([countP, resultsP])
//     .then(array => (dataReturn(res, array, offset, null, null)));
// }


// module.exports = {
//   allRecords,
// };
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
  if (typeof object[1][0] == "object") {
    const recordPackage = clone(recordPackageBase);

    recordPackage.records = object[1];
    recordPackage.uri = `https://api.beta.quienesquien.wiki/v2/contracts/${object[1][0].ocid}`;
    recordPackage.publishedDate = object[1][0].compiledRelease.date;
    object[1] = [recordPackage];
    object[2] = object[1][0].records.length;
  }
  return object;
}


function allDocuments(query, collection, JOINS, debug=false) {
  // console.log("q",query.criteria);
  if (debug) {
    debug = true;
    // delete query.criteria.debug;
    console.log("DEBUG allDocuments",collection.name);
    console.log("DEBUG allDocuments query 1",JSON.stringify(query,null,4));
  }
  const maxTime = 1000*30;

  // query.options.maxTimeMS = maxTime;
  const countP = collection.count(query.criteria,{maxTimeMS: maxTime}).catch(err => {
    console.error("allDocuments count error",err);
    if (err) {
      return `error: ${err}`;
    }
    return err;
  });

  if (query.embed) {
    const p = queryToPipeline(query, clone(JOINS));
    const pipeline = arrayResultsOptions(query, p);

    const pipelineOptions = {
    //   allowDiskUse: true,
      maxTimeMS: maxTime
    }

    if (debug) {
      console.log("DEBUG allDocuments query 2",JSON.stringify(query,null,4));
      console.log("DEBUG allDocuments pipeline",JSON.stringify(pipeline,null,4));
    }

    const resultsP = collection.aggregate(pipeline, pipelineOptions);

    return Promise.all([countP, resultsP]);
  }

  if (debug) {
    console.log("DEBUG allDocuments query",JSON.stringify(query,null,4));
  }

  const resultsP = collection.find(query.criteria, query.options).catch(err => {
    console.error("allDocuments error",err);
    if (err) {
      return `error: ${err}`;
    }
    return err;
  });

  return Promise.all([countP, resultsP]);
}



function dataReturn(res, array, offset, limit, embed, objectFormat, debug) {
  let data = array[1];
  let status = "success";
  let size = 0;

  // Contracts have a different structure and their length comes in the third item in the array
  // console.log("dataReturn",array);
  if (array[2] || (array[1] && typeof array[1] == "object")) {
    size = array[2] || array[1].length;
    if (embed) {
      data = array[1].map(o => (objectFormat(o)));
    }
  }
  else {
    console.error("dataReturn error",array);
    status = "error";
  }

  if (debug) {
    console.log("dataReturn",size);
  }

  const pageSize = limit || size;
  const pagesNum = Math.ceil((array[0] / pageSize));


  res.set('Content-Type', 'application/json; charset=utf-8');
  res.json({
    status: status,
    size,
    limit,
    offset,
    pages: pagesNum,
    count: array[0],
    data,
  });
}


async function allRecords(context) {
  const debug = context.params.query.debug;
  const query = {ocid: context.params.query.id };
  const offset = 0; //query.options.skip || 0;
  // console.log("allContracts debug",debug);

  if (debug) {
    console.log("DEBUG allContracts query",JSON.stringify(query,null,4));
  }

  allDocuments(query, collection, [], debug)
    .then(array => (addRecordPackage(array, debug)))
    .catch(err => {
      console.error('allContracts query error', err);
      if (err) {
        return err;
      }
      return false;
    })
    .then(array => {
      return dataReturn(res, array, offset, query.options.limit, query.embed, contractMapData, debug)
    } )
    .catch(err => {
      console.error("allContracts return error",err);
      res.json({"error": "error"})
    });

}


module.exports = {
  allRecords,
};
