const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

module.exports = client;

const query_definitions = {
  // apiFilterName: "country",
  // apiFieldNames:["compiledRelease.area.id"],
  "country": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.area.id"
  },
  // apiFilterName: "name",
  // apiFieldNames:["compiledRelease.name"],
  "name": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.name"
  },
  // apiFilterName: "identifier",
  // apiFieldNames:["compiledRelease.identifiers.id"],
  "identifier": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.identifiers.id"
  },
  // apiFilterName: {
  //   min: "contract_amount_supplier_min",
  //   max: "contract_amount_supplier_max",
  // },        
  // apiFieldNames:["compiledRelease.contract_amount.supplier"],
  "contract_amount_supplier_min": {
    context: "query",
    type: "range-gt",
    field: "compiledRelease.contract_amount.supplier"
  },
  "contract_amount_supplier_max": {
    context: "query",
    type: "range-lt",
    field: "compiledRelease.contract_amount.supplier"
  },
  // apiFilterName: "classification",
  // apiFieldNames:["compiledRelease.classification"],
  "classification": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.classification"
  },
  "limit": {
    context: "body",
    field: "size"
  }
}




// apiFilterName: {
//   min: "contract_count_supplier_min",
//   max: "contract_count_supplier_max",
// },
// apiFieldNames:["compiledRelease.contract_count.supplier"],

// apiFilterName: {
//   min: "contract_amount_buyer_min",
//   max: "contract_amount_buyer_max",
// },    
// apiFieldNames:["compiledRelease.contract_amount.buyer"],

// apiFilterName: {
//   min: "contract_count_buyer_min",
//   max: "contract_count_buyer_max",
// },    
// apiFieldNames:["compiledRelease.contract_count.buyer"],


// apiFilterName: "subclassification",
// apiFieldNames:["compiledRelease.subclassification"],


// apiFilterName: "title",
// apiFieldNames:["compiledRelease.contracts.title"],

// apiFilterName: "id",
// apiFieldNames:["compiledRelease.contracts.id"],

// apiFilterName: "supplier_name",
// apiFieldNames:["compiledRelease.awards.suppliers.name"],

// apiFilterName: "buyer_name",
// apiFieldNames:["compiledRelease.parties.memberOf.name"],

// apiFilterName: "funder_name",
// apiFieldNames:["funder"],

// apiFilterName: "country",
// apiFieldNames:["compiledRelease.area.id"],

// apiFilterName: "buyer_id",
// apiFieldNames:["compiledRelease.buyer.id"],

// apiFilterName: "contact_point_name",
// apiFieldNames:["compiledRelease.parties.contactPoint.name"],

// apiFilterName: {
//   min: "start_date_min",
//   max: "start_date_max"
// },
// apiFieldNames:["compiledRelease.contracts.period.startDate"],

// apiFilterName: {
//   min: "amount_min",
//   max: "amount_max"
// },    
// apiFieldNames:["compiledRelease.total_amount"],

// apiFilterName: "procurement_method",
// apiFieldNames:["compiledRelease.tender.procurementMethod"],

// apiFilterName: "source",
// apiFieldNames: ["compiledRelease.source.id"],

// apiFilterName: "sort",
// apiFieldNames:["sort"],

// apiFilterName: "sort_direction",
// apiFieldNames:["_sortDirection"],

// apiFilterName: "offset",
// apiFieldNames:["offset"],



function paramsToBody(params) {
  const body={}; 
  Object.keys(params).forEach( param => { 
    if (params[param]) {
      let qdp = query_definitions[param];
      if (qdp) {
        if (qdp.context == "filter") {
          if (qdp.type == "term") {
            if (!body.query) {
              body.query={}
            }
            if (!body.query.bool) {
              body.query.bool={}
            }
            if (!body.query.bool.filter) {
              body.query.bool.filter=[]
            }
            body.query.bool.filter.push({term: { [qdp.field]: params[param]}}); 
          }
        }
        if (qdp.context == "query") {
          if (!body.query) {
            body.query={}
          }
          if (qdp.type == "match_phrase") {
            body.query[qdp.type] = { [qdp.field]: params[param]}; 
          }
          if (qdp.type == "range-lt") {
            if (!body.query.range) {
              body.query.range={}
            }
            if (!body.query.range[qdp.field]) {
              body.query.range[qdp.field]={}
            }
            body.query.range[qdp.field].lt = params[param]; 
          }
          if (qdp.type == "range-gt") {
            if (!body.query.range) {
              body.query.range={}
            }
            if (!body.query.range[qdp.field]) {
              body.query.range[qdp.field]={}
            }
            body.query.range[qdp.field].gt = params[param]; 
          }
        }
        if (qdp.context == "body") {
          body[qdp.field] = params[param]; 
        }
  
      }
      else {
        console.error("Unexpected query param",param);
      }
    } 
  })
  return body; 
}



async function search (index,params) {
  // console.log("search",params,typeof params);

  const searchDocument = {
    index: index,
    body: paramsToBody(params)
    //  {
    //   // query: {
    //   //   match: paramsToMatch(params) 
    //   // },
    //   // limit: params.limit
    // }
  }

  console.log("search searchDocument body",JSON.stringify(searchDocument.body));

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  // await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  try {

    const result = await client.search(searchDocument)

    return result.body.hits;
  }  
  catch(e) {
    return {error: e}
  }
//   return {}
  // console.log(body.hits.hits[0])
}

function prepareOutput(bodyhits, offset, limit, embed, objectFormat, debug) {
    let data = {};
    let status = "success";
    let size = 0;
    let count = 0;
    // console.log("prepareOutput",bodyhits);
    
    // Contracts have a different structure and their length comes in the third item in the array
    if (!bodyhits.error) {
      count = bodyhits.total.value;
      data = bodyhits.hits.map(o => o._source);
      size = data.length;
    }
    else {
        console.error("prepareOutput error",bodyhits.error);
        status = "error";
    }

    if (debug) {
        console.log("prepareOutput",size);
    }

    const pageSize = limit || size;
    const pagesNum = Math.ceil((count / pageSize));


    return {
        status: status,
        size,
        limit,
        offset,
        pages: pagesNum,
        count: count,
        data,
    };
}

module.exports = {
    prepareOutput,
    search
}