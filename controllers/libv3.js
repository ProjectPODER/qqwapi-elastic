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


  // apiFilterName: {
  //   min: "contract_count_supplier_min",
  //   max: "contract_count_supplier_max",
  // },
  // apiFieldNames:["compiledRelease.contract_count.supplier"],
  "contract_count_supplier_min": {
    context: "query",
    type: "range-gt",
    field: "compiledRelease.contract_count.supplier"
  },
  "contract_count_supplier_max": {
    context: "query",
    type: "range-lt",
    field: "compiledRelease.contract_count.supplier"
  },

  // apiFilterName: {
  //   min: "contract_amount_buyer_min",
  //   max: "contract_amount_buyer_max",
  // },    
  // apiFieldNames:["compiledRelease.contract_amount.buyer"],
  "contract_amount_buyer_min": {
    context: "query",
    type: "range-gt",
    field: "compiledRelease.contract_amount.buyer"
  },
  "contract_amount_buyer_max": {
    context: "query",
    type: "range-lt",
    field: "compiledRelease.contract_amount.buyer"
  },

  // apiFilterName: {
  //   min: "contract_count_buyer_min",
  //   max: "contract_count_buyer_max",
  // },    
  // apiFieldNames:["compiledRelease.contract_count.buyer"],
  "contract_count_buyer_min": {
    context: "query",
    type: "range-gt",
    field: "compiledRelease.contract_count.buyer"
  },
  "contract_count_buyer_max": {
    context: "query",
    type: "range-lt",
    field: "compiledRelease.contract_count.buyer"
  },


  // apiFilterName: {
  //   min: "start_date_min",
  //   max: "start_date_max"
  // },
  // apiFieldNames:["compiledRelease.contracts.period.startDate"],
  "start_date_min": {
    context: "query",
    type: "range-gt",
    field: "compiledRelease.contracts.period.startDate"
  },
  "start_date_max": {
    context: "query",
    type: "range-lt",
    field: "compiledRelease.contracts.period.startDate"
  },


  // apiFilterName: {
  //   min: "amount_min",
  //   max: "amount_max"
  // },    
  // apiFieldNames:["compiledRelease.total_amount"],
  "amount_min": {
    context: "query",
    type: "range-gt",
    field: "compiledRelease.total_amount"
  },
  "amount_max": {
    context: "query",
    type: "range-lt",
    field: "compiledRelease.total_amount"
  },

  // apiFilterName: "classification",
  // apiFieldNames:["compiledRelease.classification"],
  "classification": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.classification"
  },
  // apiFilterName: "title",
  // apiFieldNames:["compiledRelease.contracts.title"],
  "title": {
    context: "must",
    type: "match",
    field: "compiledRelease.contracts.title"
  },


  // apiFilterName: "supplier_name",
  // apiFieldNames:["compiledRelease.awards.suppliers.name"],
  "supplier_name": {
    context: "must",
    type: "match",
    field: "compiledRelease.awards.suppliers.name"
  },

  // apiFilterName: "buyer_name",
  // apiFieldNames:["compiledRelease.parties.memberOf.name"],
  "buyer_name": {
    context: "must",
    type: "match",
    field: "compiledRelease.parties.memberOf.name"
  },

  // apiFilterName: "funder_name",
  // apiFieldNames:["funder"],
  // TODO: Match party type too
  "funder_name": {
    context: "must",
    type: "match",
    field: "compiledRelease.parties.name"
  },

  // apiFilterName: "subclassification",
  // apiFieldNames:["compiledRelease.subclassification"],
  "subclassification": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.subclassification"
  },
  // apiFilterName: "id",
  // apiFieldNames:["compiledRelease.contracts.id"],
  "id": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.contracts.id"
  },

  // apiFilterName: "country",
  // apiFieldNames:["compiledRelease.area.id"],
  "country": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.area.id"
  },
  // apiFilterName: "buyer_id",
  // apiFieldNames:["compiledRelease.buyer.id"],
  "buyer_id": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.buyer.id"
  },
  // apiFilterName: "contact_point_name",
  // apiFieldNames:["compiledRelease.parties.contactPoint.name"],
  "contact_point_name": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.parties.contactPoint.name"
  },

  // apiFilterName: "procurement_method",
  // apiFieldNames:["compiledRelease.tender.procurementMethod"],
  "procurement_method": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.tender.procurementMethod"
  },
  // apiFilterName: "source",
  // apiFieldNames: ["compiledRelease.source.id"],
  "source": {
    context: "query",
    type: "match_phrase",
    field: "compiledRelease.source.id"
  },

  // OK apiFilterName: "sort",
  // apiFieldNames:["sort"],
  "sort": {
    context: "body",
    type: "sort",
    field: "sort"
  },

  // OK apiFilterName: "sort_direction",
  // apiFieldNames:["_sortDirection"],
  "sort_direction": {
    context: "body",
    type: "direction",
    field: "sort"
  },


  // OK apiFilterName: "offset",
  // apiFieldNames:["offset"],
  "offset": {
    context: "body",
    field: "from"
  },

  //OK 
  "limit": {
    context: "body",
    field: "size"
  }
}


function paramsToBody(params) {
  const body={ sort: []}; 
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
        if (qdp.context == "must") {
          if (qdp.type == "match") {
            if (!body.query) {
              body.query={}
            }
            if (!body.query.bool) {
              body.query.bool={}
            }
            if (!body.query.bool.must) {
              body.query.bool.must=[]
            }
            body.query.bool.must.push({match: { [qdp.field]: params[param]}}); 
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
          if (qdp.type=="sort") {
            if (!body.sort) {
              body.sort = [];
            }
            body.sort.push({[params[param]]: ""});             
          }
          if (qdp.type=="direction") {
            if (!body.sort) {
              body.sort = [];
            }
            body.sort[0][params["sort"]] = {order: params[param]};             
          }
          if (!qdp.type) {
            body[qdp.field] = params[param]; 
          }

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

  // Let's search!
  try {

    const result = await client.search(searchDocument)

    return result.body.hits;
  }  
  catch(e) {
    return {error: e}
  }
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