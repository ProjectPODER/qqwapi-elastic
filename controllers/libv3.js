const { Client } = require('@elastic/elasticsearch');
const { id } = require('monk');
const client = new Client({ node: 'http://localhost:9200' });

module.exports = client;

const query_definitions = {
  // apiFilterName: "country",
  // apiFieldNames:["area.id"],
  "embed": {
    context: "skip"
  },
  "country": {
    context: "must",
    type: "match_phrase",
    field: "area.id"
  },
  // apiFilterName: "name",
  // apiFieldNames:["name"],
  "name": {
    context: "should",
    type: "match_phrase",
    field: "name",
    secondField: "contracts.title"
  },
  // apiFilterName: "identifier",
  // apiFieldNames:["identifiers.id"],
  "identifier": {
    context: "must",
    type: "match_phrase",
    field: "identifiers.id"
  },
  // apiFilterName: {
  //   min: "contract_amount_supplier_min",
  //   max: "contract_amount_supplier_max",
  // },        
  // apiFieldNames:["contract_amount.supplier"],
  "contract_amount_supplier_min": {
    context: "query",
    type: "range-gt",
    field: "contract_amount.supplier"
  },
  "contract_amount_supplier_max": {
    context: "query",
    type: "range-lt",
    field: "contract_amount.supplier"
  },


  // apiFilterName: {
  //   min: "contract_count_supplier_min",
  //   max: "contract_count_supplier_max",
  // },
  // apiFieldNames:["contract_count.supplier"],
  "contract_count_supplier_min": {
    context: "query",
    type: "range-gt",
    field: "contract_count.supplier"
  },
  "contract_count_supplier_max": {
    context: "query",
    type: "range-lt",
    field: "contract_count.supplier"
  },

  // apiFilterName: {
  //   min: "contract_amount_buyer_min",
  //   max: "contract_amount_buyer_max",
  // },    
  // apiFieldNames:["contract_amount.buyer"],
  "contract_amount_buyer_min": {
    context: "query",
    type: "range-gt",
    field: "contract_amount.buyer"
  },
  "contract_amount_buyer_max": {
    context: "query",
    type: "range-lt",
    field: "contract_amount.buyer"
  },

  // apiFilterName: {
  //   min: "contract_count_buyer_min",
  //   max: "contract_count_buyer_max",
  // },    
  // apiFieldNames:["contract_count.buyer"],
  "contract_count_buyer_min": {
    context: "query",
    type: "range-gt",
    field: "contract_count.buyer"
  },
  "contract_count_buyer_max": {
    context: "query",
    type: "range-lt",
    field: "contract_count.buyer"
  },


  // apiFilterName: {
  //   min: "start_date_min",
  //   max: "start_date_max"
  // },
  // apiFieldNames:["contracts.period.startDate"],
  "start_date_min": {
    context: "query",
    type: "range-gt",
    field: "contracts.period.startDate"
  },
  "start_date_max": {
    context: "query",
    type: "range-lt",
    field: "contracts.period.startDate"
  },


  // apiFilterName: {
  //   min: "amount_min",
  //   max: "amount_max"
  // },    
  // apiFieldNames:["total_amount"],
  "amount_min": {
    context: "query",
    type: "range-gt",
    field: "contracts.value.amount"
  },
  "amount_max": {
    context: "query",
    type: "range-lt",
    field: "contracts.value.amount"
  },

  // apiFilterName: "classification",
  // apiFieldNames:["classification"],
  "classification": {
    context: "must",
    type: "match_phrase",
    field: "classification"
  },
  // apiFilterName: "title",
  // apiFieldNames:["contracts.title"],
  "title": {
    context: "must",
    type: "match",
    field: "contracts.title"
  },


  // apiFilterName: "supplier_name",
  // apiFieldNames:["awards.suppliers.name"],
  "supplier_name": {
    context: "must",
    type: "match",
    field: "awards.suppliers.name"
  },

  // apiFilterName: "buyer_name",
  // apiFieldNames:["parties.memberOf.name"],
  "buyer_name": {
    context: "must",
    type: "match",
    field: "parties.memberOf.name"
  },

  // apiFilterName: "funder_name",
  // apiFieldNames:["funder"],
  // TODO: Match party type too
  "funder_name": {
    context: "must",
    type: "match",
    field: "parties.name"
  },

  // apiFilterName: "subclassification",
  // apiFieldNames:["subclassification"],
  "subclassification": {
    context: "must",
    type: "match_phrase",
    field: "subclassification"
  },
  // apiFilterName: "id",
  // apiFieldNames:["contracts.id"],
  "id": {
    context: "must",
    type: "match_phrase",
    field: "contracts.id"
  },

  // apiFilterName: "buyer_id",
  // apiFieldNames:["buyer.id"],
  "buyer_id": {
    context: "must",
    type: "match_phrase",
    field: "buyer.id"
  },
  // apiFilterName: "contact_point_name",
  // apiFieldNames:["parties.contactPoint.name"],
  "contact_point_name": {
    context: "must",
    type: "match_phrase",
    field: "parties.contactPoint.name"
  },

  // apiFilterName: "procurement_method",
  // apiFieldNames:["tender.procurementMethod"],
  "procurement_method": {
    context: "must",
    type: "match_phrase",
    field: "tender.procurementMethod"
  },
  // apiFilterName: "source",
  // apiFieldNames: ["source.id"],
  "source": {
    context: "must",
    type: "match_phrase",
    field: "source.id"
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


function paramsToBody(paramsObject) {
  const params = Object.assign({}, paramsObject.query, paramsObject.path);
  const body={ sort: []}; 

  Object.keys(params).forEach( param => { 
    if (params[param]) {
      let qdp = query_definitions[param];
      // console.log(param,query_definitions[param]);
      if (qdp) {
        if (qdp.context == "skip") {
          //Skip
        }
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
        if (qdp.context == "should") {
          if (!body.query) {
            body.query={}
          }
          if (!body.query.bool) {
            body.query.bool={}
          }
          if (!body.query.bool.should) {
            body.query.bool.should=[]
          }

          if (qdp.type == "match" || qdp.type == "match_phrase") {
            body.query.bool.should.push({[qdp.type]: { [qdp.field]: params[param]}});             
            if (qdp.secondField) {
              body.query.bool.should.push({[qdp.type]: { [qdp.secondField]: params[param]}});             
            }
          }
        }
        if (qdp.context == "must") {
          if (!body.query) {
            body.query={}
          }
          if (!body.query.bool) {
            body.query.bool={}
          }
          if (!body.query.bool.must) {
            body.query.bool.must=[]
          }

          if (qdp.type == "match" || qdp.type == "match_phrase") {
            body.query.bool.must.push({[qdp.type]: { [qdp.field]: params[param]}});             
          }
        }
        if (qdp.context == "query") {
          if (!body.query) {
            body.query={}
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

const embed_definitions = {
  organizations: [
    {
      id: "id",
      foreign_key: "parent_id",
      index: "memberships",
      location: "memberships.child"
    },
    {
      id: "id",
      foreign_key: "organization_id",
      index: "memberships",
      location: "memberships.parent"
    }
  ]
}

async function embed(index,params,results) {
  const edis = embed_definitions[index];
  const localResults = results;

  if (!params.query.embed) {
    return results;
  }
  else {
    if (edis) {
      edis.forEach(async edi => {
        let body = {query: {bool: {should: []}}}

        //collect ids
        //query other collections
        //merge
        // console.log("embed",results);
        results.hits.forEach(result => {
          body.query.bool.should.push({match_phrase: {[edi.foreign_key]: result._source[edi.id]}})
        })
  
        const searchDocument = {
          index: edi.index,
          body: body
        }
      
        // console.log("embed searchDocument body",edi.index,JSON.stringify(searchDocument.body));
      
        try {
          // console.log("embed");
          const embedResult = await client.search(searchDocument);
      
          console.log("embed results",embedResult.body.hits.hits);
          for (r in results.hits) {
            for (h in embedResult.body.hits.hits) {
              if (embedResult.body.hits.hits[h]._source[edi.foreign_key] == results.hits[r]._source[edi.id]) {
                // console.log(embedResult.body.hits.hits[h]._source[edi.foreign_key],results.hits[r]._source[edi.id]);
                if (!results.hits[r]._source[edi.location]) { 
                  localResults.hits[r]._source[edi.location] = [];
                }
                localResults.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
                console.log("embed one result expanded",results.hits[r]._source);
              }
            }
          }
        }  
        catch(e) {
          console.error("embed error",e)
        }
        // console.log("embed results expanded",results.hits);
        return results;
      })

      return localResults;

    }
    else {
      console.error("No embed definitions for",index)
    }
  }
}


async function search (index,params) {
  // console.log("search",params,typeof params);

  const searchDocument = {
    index: index,
    body: paramsToBody(params)
  }

  console.log("search searchDocument body",index,JSON.stringify(searchDocument.body));

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
    let count_precission = "unknown";
    // console.log("prepareOutput",bodyhits);
    
    // Contracts have a different structure and their length comes in the third item in the array
    if (bodyhits && !bodyhits.error) {
      count = bodyhits.total.value;
      count_precission = bodyhits.total.relation;
      data = bodyhits.hits.map(o => o._source);
      size = data.length;
    }
    else {
      status = "error";
      if (bodyhits) {
        console.error("prepareOutput error",bodyhits.error);
      }
      else {
        console.error("prepareOutput error, empty bodyhits");

      }
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
        count_precission: count_precission,
        data,
    };
}

module.exports = {
    prepareOutput,
    search,
    embed
}