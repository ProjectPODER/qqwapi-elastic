const { Client } = require('@elastic/elasticsearch');
const laundry = require('company-laundry'); 
const pjson = require('../package.json');

let client = {};

const elasticNode = process.env.ELASTIC_URI || 'http://localhost:9200/';


//We are using self-signed certificaes for elastic
client = new Client({ node: elasticNode, ssl: { rejectUnauthorized: false } });

//Simple test query
client.xpack.usage().then(
  () => {
    console.log("Connected to elastic node:",elasticNode);
  }
).catch(e => {
  console.error("Error connecting to elastic node:",elasticNode,e);
  if (e.meta && e.meta.body && e.meta.body.error) {
    console.error("Error body", e.meta.body.error);
  }
  process.exit(100);
})

const query_definitions = {
  // apiFilterName: "country",
  // apiFieldNames:["area.id"],
  "embed": {
    context: "skip"
  },
  "type": {
    context: "skip"
  },
  "country": {
    context: "should",
    type: "match",
    fields: ["area.id","parent_id"]
  },
  // apiFilterName: "name",
  // apiFieldNames:["name"],
  "name": {
    context: "should",
    type: "match",
    fields: ["name","contracts.title","other_names.name"],
    launder: true,
  },
  // apiFilterName: "identifier",
  // apiFieldNames:["identifiers.id"],
  "identifier": {
    context: "should",
    type: "match",
    field: "identifiers.id"
  },
  // apiFilterName: {
  //   min: "contract_amount_supplier_min",
  //   max: "contract_amount_supplier_max",
  // },        
  // apiFieldNames:["contract_amount.supplier"],
  "contract_amount_supplier_min": {
    context: "must",
    type: "range-gt",
    field: "contract_amount.supplier"
  },
  "contract_amount_supplier_max": {
    context: "must",
    type: "range-lt",
    field: "contract_amount.supplier"
  },


  // apiFilterName: {
  //   min: "contract_count_supplier_min",
  //   max: "contract_count_supplier_max",
  // },
  // apiFieldNames:["contract_count.supplier"],
  "contract_count_supplier_min": {
    context: "must",
    type: "range-gt",
    field: "contract_count.supplier"
  },
  "contract_count_supplier_max": {
    context: "must",
    type: "range-lt",
    field: "contract_count.supplier"
  },

  // apiFilterName: {
  //   min: "contract_amount_buyer_min",
  //   max: "contract_amount_buyer_max",
  // },    
  // apiFieldNames:["contract_amount.buyer"],
  "contract_amount_buyer_min": {
    context: "must",
    type: "range-gt",
    field: "contract_amount.buyer"
  },
  "contract_amount_buyer_max": {
    context: "must",
    type: "range-lt",
    field: "contract_amount.buyer"
  },

  // apiFilterName: {
  //   min: "contract_count_buyer_min",
  //   max: "contract_count_buyer_max",
  // },    
  // apiFieldNames:["contract_count.buyer"],
  "contract_count_buyer_min": {
    context: "must",
    type: "range-gt",
    field: "contract_count.buyer"
  },
  "contract_count_buyer_max": {
    context: "must",
    type: "range-lt",
    field: "contract_count.buyer"
  },


  // apiFilterName: {
  //   min: "start_date_min",
  //   max: "start_date_max"
  // },
  // apiFieldNames:["contracts.period.startDate"],
  "start_date_min": {
    context: "must",
    type: "range-gt",
    field: "contracts.period.startDate"
  },
  "start_date_max": {
    context: "must",
    type: "range-lt",
    field: "contracts.period.startDate"
  },


  // apiFilterName: {
  //   min: "amount_min",
  //   max: "amount_max"
  // },    
  // apiFieldNames:["total_amount"],
  "amount_min": {
    context: "must",
    type: "range-gt",
    field: "contracts.value.amount"
  },
  "amount_max": {
    context: "must",
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
    type: "fuzzy",
    field: "contracts.title"
  },


  // apiFilterName: "supplier_name",
  // apiFieldNames:["awards.suppliers.name"],
  "supplier_name": {
    context: "must",
    type: "match",
    field: "parties.suppliers.names",
    launder: true
  },

  // apiFilterName: "buyer_name",
  // apiFieldNames:["parties.memberOf.name"],
  "buyer_name": {
    context: "should",
    type: "match",
    fields: ["parties.buyer.name","parties.buyer.memberOf.name","parties.buyer.memberOf.initials"],
    launder: true
  },

  // apiFilterName: "funder_name",
  // apiFieldNames:["funder"],
  // TODO: Match party type too
  "funder_name": {
    context: "should",
    type: "match",
    fields: ["parties.funder_names","parties.funder.details.initials"],
    launder: true
  },

  // apiFilterName: "subclassification",
  // apiFieldNames:["subclassification"],
  "subclassification": {
    context: "filter",
    type: "term",
    field: "subclassification"
  },
  // apiFilterName: "id",
  // apiFieldNames:["contracts.id"],
  "id": {
    context: "must",
    type: "match_phrase",
    field: "id"
  },
  "ids": {
    context: "should",
    type: "match",
    field: "id"
  },
  "ocid": {
    context: "filter",
    type: "term",
    field: "ocid"
  },

  // apiFilterName: "buyer_id",
  // apiFieldNames:["buyer.id"],
  "buyer_id": {
    context: "filter",
    type: "term",
    field: "buyer.id"
  },
  // apiFilterName: "contact_point_name",
  // apiFieldNames:["parties.contactPoint.name"],
  "contact_point_name": {
    context: "must",
    type: "match",
    field: "parties.buyer.contactPoint.name"
  },

  // apiFilterName: "procurement_method",
  // apiFieldNames:["tender.procurementMethod"],
  "procurement_method": {
    context: "filter",
    type: "term",
    field: "tender.procurementMethod"
  },
  // apiFilterName: "source",
  // apiFieldNames: ["source.id"],
  "source": {
    context: "filter",
    type: "term",
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


function paramsToBody(paramsObject, debug) {
  const params = Object.assign({}, paramsObject.query, paramsObject.path);
  const body={ sort: [], from: 0, query: { bool: { should: [], must: [], filter: []}}, aggs: {} }; 
  if (debug) {
    console.log("paramsToBody",paramsObject.query);
  }

  Object.keys(params).forEach( param => { 
    if (params[param]) {
      let qdp = query_definitions[param];
      
      params[param] = decodeURIComponent(params[param]);

      if (qdp.launder && ! params[param].map) {
        params[param] = laundry.launder(params[param]);
      }
      // console.log(param,query_definitions[param]);
      if (qdp) {
        if (qdp.context == "skip") {
          //Skip
        }
        if (qdp.context == "filter") {
          if (qdp.type == "term") {
            body.query.bool[qdp.context].push({term: { [qdp.field]: params[param]}}); 
          }
        }
        if (qdp.context == "should") {
          if (qdp.type == "match" || qdp.type == "match_phrase" || qdp.type == "fuzzy") {
            if (qdp.field) {
              if (params[param].map) {
                params[param].map( value => {
                  if (qdp.launder ) {
                    value = laundry.launder(value);
                  }
            
                  body.query.bool[qdp.context].push({[qdp.type]: { [qdp.field]: value}});             
                })

              }
              else {
                body.query.bool[qdp.context].push({[qdp.type]: { [qdp.field]: params[param]}});             
              }
            }
            if (qdp.fields) {
              qdp.fields.forEach((field) => {
                body.query.bool[qdp.context].push({[qdp.type]: { [field]: params[param]}});             
              })
            }
          }
        }
        if (qdp.context == "must") {
          if (qdp.type == "match" || qdp.type == "match_phrase" || qdp.type == "fuzzy") {
            if (qdp.field) {
              if (params[param].map) {
                params[param].map( value => {
                  if (qdp.launder ) {
                    value = laundry.launder(value);
                  }

                  body.query.bool[qdp.context].push({[qdp.type]: { [qdp.field]: value}});             
                })

              }
              else {
                body.query.bool[qdp.context].push({[qdp.type]: { [qdp.field]: params[param]}});             
              }         
            }
            if (qdp.fields) {
              qdp.fields.forEach((field) => {
                body.query.bool[qdp.context].push({[qdp.type]: { [field]: params[param]}});             
              })
            }
          }
          if (qdp.type == "range-lt") {
            body.query.bool[qdp.context].push( {range: { [qdp.field]: { lt: params[param] }}} ); 
          }
          if (qdp.type == "range-gt") {
            body.query.bool[qdp.context].push( {range: { [qdp.field]: { gt: params[param] }}} ); 
          }

        }
        if (qdp.context == "body") {
          if (qdp.type=="sort") {
            body.sort.push({[params[param]]: {order: "desc"}});             
          }
          if (qdp.type=="direction") {
            if (params["sort"]) {
              body.sort[0][params["sort"]] = {order: params[param]};             
            }
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

const membership_embed = [{
  id: "id",
  foreign_key: "parent_id",
  index: "memberships",
  location: "memberships",
  add: {direction: "child" }
},
{
  id: "id",
  foreign_key: "organization_id",
  index: "memberships",
  location: "memberships",
  add: {direction: "parent" }

}];

const party_flags_embed = {
  id: "id",
  foreign_key: "id",
  index: "party_flags",
  location: "flags"
}

const embed_definitions = { 
  areas: membership_embed,
  persons: [... membership_embed, party_flags_embed ],
  organizations: [ ... membership_embed, party_flags_embed ],
  contracts: [
    {
      id: "id",
      foreign_key: "id",
      index: "contract_flags",
      location: "flags"
    }

  ]
}

const aggs_definitions = {
  contracts: {
    "amount": {
      "sum": {
        "field": "contracts.value.amount"
      }
    },
    "year": {
      "date_histogram": {
        "field": "contracts.period.startDate",
        "calendar_interval": "1y",
        "time_zone": "America/Mexico_City",
        "min_doc_count": 1
      },
      "aggs": {
        "amount": {
          "sum": {
            "field": "contracts.value.amount"
          }
        }
      }
    },
    "type": {
      "terms": {
        "field": "tender.procurementMethod.raw",
        "order": {
          "_count": "desc"
        },
        "missing": "undefined",
        "size": 10
      },
      "aggs": {
        "amount": {
          "sum": {
            "field": "contracts.value.amount"
          }
        }
      }
    }
  }
}

async function embed(index,params,results) {
  // console.log("embed",params);
  if (!results.hits) {
    console.error("Embed with no hits",index);
    return results;
  }
  
  if (!params.query.embed) {
    return results;
  }
  else {
    // console.log("embed original results",index,results);
    
    const edis = embed_definitions[index];

    if (edis) {
      for (e in edis) {
        let edi = edis[e];
        let body = {query: {bool: {should: []}}}

        //collect ids
        //query other collections
        results.hits.hits.forEach(result => {
          body.query.bool.should.push({match_phrase: {[edi.foreign_key]: result._source[edi.id]}})
        })
  
        const searchDocument = {
          index: edi.index,
          body: body
        }
      
        // console.log("embed searchDocument body",edi.index,JSON.stringify(searchDocument.body));
      
        try {
          // console.log("embed",edi);
          const embedResult = await client.search(searchDocument);
      
          // console.log("embed results",embedResult.body.hits.hits);
          for (r in results.hits.hits) {
            for (h in embedResult.body.hits.hits) {
              if (embedResult.body.hits.hits[h]._source[edi.foreign_key] == results.hits.hits[r]._source[edi.id]) {
                // console.log(embedResult.body.hits.hits[h]._source[edi.foreign_key],results.hits[r]._source[edi.id]);
                if (!results.hits.hits[r]._source[edi.location]) { 
                  results.hits.hits[r]._source[edi.location] = [];
                }
                if (edi.add) {
                  embedResult.body.hits.hits[h]._source = Object.assign({},embedResult.body.hits.hits[h]._source,edi.add);
                }
                results.hits.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
                // console.log("embed one result expanded",results.hits[r]._source);
              }
            }
          }
        }  
        catch(e) {
          console.error("embed error",e)
        }
        // console.log("embed results expanded",edi.location,results.hits);
      }

      // console.log("embed results returned",results);
      return results;

    }
    else {
      console.error("No embed definitions for",index)
      return results;
    }
  }
}


async function search (index,params,debug) {
  // console.log("search",params,typeof params);

  const searchDocument = {
    index: index,
    body: paramsToBody(params)
  }

  //Add aggregations for result summaries
  if (aggs_definitions[index]) {
    searchDocument.body.aggs = aggs_definitions[index];
  }

  // console.log("search size",searchDocument.body.from,searchDocument.body.size,(searchDocument.body.from + searchDocument.body.size))
  if ((parseInt(searchDocument.body.from) + parseInt(searchDocument.body.size)) < 10000) {
    if (debug) {
      console.log("normal search",JSON.stringify(searchDocument.body));
    }
    try {
      const result = await client.search(searchDocument);
      return result.body;
    }
    catch(e) {
      return {error: e}
    }
      
  }
  else {
    return {error: "Search size is bigger than 10000. Elasticsearch does not allow it."}
  }
}

function prepareOutput(body, offset, limit, embed, objectFormat, debug) {
    let data = {};
    let status = "success";
    let size = 0;
    let count = 0;
    let count_precission = "unknown";
    let bodyhits = body.hits;

    if (debug) {
      console.log("prepareOutput",body);
    }
      
    
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
        version: pjson.version,
        error: bodyhits ? bodyhits.error : "Unexpected error",
        generated: new Date(),
        summary: formatSummary(body.aggregations),
        data,
    };
}

function formatSummary(aggs) {
  if (aggs) {
    return {
      value: aggs.amount.value,
      year: formatClassifications(aggs.year.buckets),
      type: formatClassifications(aggs.type.buckets),
    }
  }
}


function formatClassifications(buckets) {
  return buckets.map(bucket => {
    if (bucket.key_as_string) {
      bucket.key = bucket.key_as_string.substr(0,4);
    }
    let classification = {
      [bucket.key]: {
        count: bucket.doc_count
      }
    }
    if (bucket.date) {
      classification[bucket.key].lastModified = bucket.date.value_as_string;
    }
    return classification;
  }).reduce(function(result, item, index, array) {
    firstKey = Object.keys(item)[0];
    result[firstKey] = item[firstKey]; //a, b, c
    return result;
  }, {});
  
}

module.exports = {
    prepareOutput,
    search,
    embed,
    client
}