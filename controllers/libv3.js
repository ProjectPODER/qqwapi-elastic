const { Client } = require('@elastic/elasticsearch');
const laundry = require('company-laundry'); 
const pjson = require('../package.json');


const elasticNode = process.env.ELASTIC_URI || 'http://localhost:9200/';


//We are using self-signed certificaes for elastic
const client = new Client({ node: elasticNode, ssl: { rejectUnauthorized: false }, resurrectStrategy: "none", compression: "gzip" });

client.extend('dataformat', ({ makeRequest, ConfigurationError }) => {
  return function dataformat (params, options) {
    // build request object
    const request = {
      method: params.method || 'GET',
      path: `/${encodeURIComponent(params.index)}/_data`, //format=${encodeURIComponent(params.querystring.format)}&source_content_type=application/json&source=${encodeURIComponent(JSON.stringify(params.querystring.source))}
      querystring: {
        format: params.querystring.format,
        source_content_type: "application/json",
        source: JSON.stringify(params.body)
      },
      context: params.context
    }

    // build request options object
    const requestOptions = {
      ignore: options.ignore || null,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null
    }
    console.log("makeRequest", request, requestOptions);

    return makeRequest(request, requestOptions)
  }
})


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
  "format": {
    context: "skip"
  },
  "country": {
    context: "should",
    type: "multi_match",
    fields: ["area.id.keyword","parent_id.keyword","area.name.keyword","parent.keyword","parties.buyer.address.countryName"],
    min: 1
  },
  "state": {
    context: "must",
    type: "multi_match",
    fields: ["area.id.keyword","parent_id.keyword","area.name.keyword","parent.keyword","parties.buyer.address.region"],
  },
  "city": {
    context: "must",
    type: "multi_match",
    fields: ["area.id.keyword","area.name.keyword","parties.buyer.address.locality"],
  },
  // apiFilterName: "name",
  // apiFieldNames:["name"],
  "name": {
    context: "must",
    type: "multi_match",
    match: "phrase_prefix",
    fields: ["name","contracts.title","other_names.name","identifiers.legalName"],
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
    field: "classification",
    change_qdp: { //Modify query definition for another field based on the value of this field
      "country": {
          value: "city",
          context: "must",
          type: "match",
          field: "parent_id",
          modifier: "-"
      }
    }
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
    type: "multi_match",
    fields: ["parties.suppliers.names", "parties.suppliers.ids"],
    launder: true
  },
  // apiFilterName: "buyer_name",
  // apiFieldNames:["parties.memberOf.name"],
  "buyer_name": {
    context: "must",
    type: "multi_match",
    fields: ["parties.buyer.name","parties.buyer.memberOf.name","parties.buyer.id","parties.buyer.memberOf.id","parties.buyer.memberOf.initials"],
    launder: true
  },

  // apiFilterName: "funder_name",
  // apiFieldNames:["funder"],
  // TODO: Match party type too
  "funder_name": {
    context: "must",
    type: "multi_match",
    fields: ["parties.funder_names","parties.funder.details.initials"],
    launder: true
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
    type: "multi_match",
    fields: ["id.keyword", "ocid", "tender.id", "contracts.awardID"]
  },
  "ids": {
    context: "should",
    type: "function_score",
    field: "id.keyword"
  },
  "ocid": {
    context: "filter",
    type: "term",
    field: "ocid"
  },

  // apiFilterName: "buyer_id",
  // apiFieldNames:["buyer.id"],
  // apiFilterName: "contact_point_name",
  // apiFieldNames:["parties.contactPoint.name"],
  "contact_point_name": {
    context: "must",
    type: "multi_match",
    fields: ["parties.buyer.contactPoint.name","parties.buyer.contactPoint.id"]
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
  "indications": {
    context: "must",
    type: "match",
    field: "guideline.indicationsMxIMSS"
  },

  //OK 
  "limit": {
    context: "body",
    field: "size"
  },
  "collection": {
    context: "skip"
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
        else if (qdp.context == "filter") {
          if (qdp.type == "term") {
            body.query.bool[qdp.context].push({term: { [qdp.field]: params[param]}}); 
          }
        }
        else if (qdp.context == "body") {
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
        else {
          if (qdp.type == "match" || qdp.type == "match_phrase" || qdp.type == "fuzzy") {
            if (qdp.field) {
              if (params[param].map) {
                values = params[param];
              }
              else {
                values = [params[param]]
              }
              
              values.map( value => {
                if (qdp.launder ) {
                  value = laundry.launder(value);
                }
          
                body.query.bool[qdp.context].push({[qdp.type]: { [qdp.field]: value}});             
              })
            }
          }
          else if (qdp.type == "multi_match") {
            body.query.bool[qdp.context].push({[qdp.type]: { query: params[param], type: qdp.match || "phrase" , fields: qdp.fields }});             
          }
          else if (qdp.type == "function_score") {
            let function_score = {[qdp.type]: { functions: [] }}

            if (qdp.field) {
              params[param] = params[param].split(",");
              if (params[param].map) {
                values = params[param];
              }
              else {
                values = [params[param]]
              }
              
              values.map( value => {
                if (qdp.launder ) {
                  value = laundry.launder(value);
                }
          
                function_score[qdp.type].functions.push({ weight: 10, filter: { match: { [qdp.field]: value }}});             
              })
            }
            body.query.bool[qdp.context].push(function_score);
          }
          if (qdp.min) {
            body.query.bool.minimum_should_match = qdp.min;
          }

          if (qdp.type == "range-lt") {
            body.query.bool[qdp.context].push( {range: { [qdp.field]: { lt: params[param] }}} ); 
          }
          if (qdp.type == "range-gt") {
            body.query.bool[qdp.context].push( {range: { [qdp.field]: { gt: params[param] }}} ); 
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
  add: {direction: "parent" }
},
{
  id: "id",
  foreign_key: "organization_id",
  index: "memberships",
  location: "memberships",
  add: {direction: "child" }

},
{
  id: "id",
  foreign_key: "person_id",
  index: "memberships",
  location: "memberships",
  add: {direction: "child" }

}];

const party_flags_embed = {
  id: "id",
  foreign_key: "party.id",
  index: "party_flags",
  location: "flags",
  condition: {
    field: "classification",
    negativeValue: "company"
  }
}

//TODO: Embed aggregations
const products_buyer_embed = {
  id: "id",
  foreign_key: "buyer.id",
  index: "contracts",
  location: "products",
  aggs: {
    
  }

}

const pruducts_related_embed = {
  must: ["cbmei.clave1_grupo_id","cbmei.clave2_especifico_id"],
  should: [ "name","cbmei.clave3_diferenciador_id"],
  index: "products",
  location: "relatedProducts",
  dontRepeatSelf: true
}

const product_contracts_embed = {
  id: "id",
  foreign_key: "contracts.items.classification.id",
  index: "contracts",
  location: "contracts",
  _source: [
    "contracts.items.quantity",
    "contracts.items.unit.value.amount",
    "contracts.items.unit.value.valueAverageMxIMSS",
    "contracts.period.startDate",
    "contracts.items.classification.id",
    "contracts.items.unit.value.amountOverpriceMxIMSS"
]
}

const embed_definitions = { 
  areas: membership_embed,
  persons: [... membership_embed, party_flags_embed ],
  organizations: [ ... membership_embed, products_buyer_embed, party_flags_embed ],
  products: [ product_contracts_embed, pruducts_related_embed ],
  contracts: [
    {
      id: "id",
      foreign_key: "id",
      index: "contract_flags",
      location: "flags"
    }

  ]
}

const general_summary = {
  "sources": {
    "terms": {
      "field": "source.id.keyword",
      "size": 100
    }
  },
  "count": {
    "value_count": {
      "field": "id.keyword"
    }
  },
  "areas": {
    "cardinality": {
      "field": "area.id.keyword",
    },
  },
  "classification": {
    "terms": {
      "field": "classification.keyword",
    },
  }

};

const allIndexes = "areas,contracts,organizations,persons,products";

const aggs_definitions = {
  [allIndexes]: general_summary,
  areas: general_summary,
  persons: general_summary,
  organizations: general_summary,
  products:  general_summary,
  contracts: Object.assign({},general_summary , {
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
  })
}

async function embed(index,params,results,debug) {
  // console.log("embed",index,params);
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
      if (debug) {
        console.log("Embed definitions for", index, edis);
      }
      for (e in edis) {
        const edi = edis[e];

        const searchDocument = {
          index: edi.index,
          body: {size: 5000, query: {bool: {should: [], must: [], minimum_should_match: 1}}},
          // errorTrace: true
        }


        //collect ids
        //query other collections
        results.hits.hits.forEach(result => {
          let resultValid = true;

          //Test for negative condition and mark as invalid if true
          if (edi.condition) {

            if (debug) {
              console.log("embed condition",edi,result._source[edi.condition.field] == edi.condition.negativeValue);
            }            
            if (result._source[edi.condition.field] == edi.condition.negativeValue) {
              resultValid = false;
            }
          }

          if (resultValid) {
            if (edi.id) {
              const foreignKeyword = edi.foreign_key+".keyword";
              searchDocument.body.query.bool.should.push({match_phrase: {[foreignKeyword]: result._source[edi.id]}})
            }

            //Support for must and should in related products
            for (m in edi.must) {
              searchDocument.body.query.bool.must.push({match_phrase: {[edi.must[m]]: fieldPathExists(edi.must[m],result._source)[0] }})
            }
            for (s in edi.should) {
              searchDocument.body.query.bool.should.push({match_phrase: {[edi.should[s]]: fieldPathExists(edi.should[s],result._source)[0] }})
            }

            //Embed filter fields
            if (edi._source) {
              searchDocument.body._source = edi._source;
            }

            //TODO: Embed aggregations
          }
        })
  
      
        if (debug) {
          console.log("embed searchDocument body",edi.index,JSON.stringify(searchDocument.body));
        }
      
        try {
          // console.log("embed",edi);
          const embedResult = await client.search(searchDocument);
      
          // console.log("embed results",embedResult.body.hits.hits);
          for (r in results.hits.hits) {
            for (h in embedResult.body.hits.hits) {
              if (edi.foreign_key) {
                let foreign_key_value = fieldPathExists(edi.foreign_key, embedResult.body.hits.hits[h]._source)
                if (debug) {
                  console.log("embed each result",foreign_key_value,edi.foreign_key,embedResult.body.hits.hits[h]._source)
                }
  
                if (foreign_key_value[0] && foreign_key_value[0] == results.hits.hits[r]._source[edi.id]) {
                  // console.log(embedResult.body.hits.hits[h]._source[edi.foreign_key],results.hits[r]._source[edi.id]);
                  if (!results.hits.hits[r]._source[edi.location]) { 
                    results.hits.hits[r]._source[edi.location] = [];
                  }
                  if (edi.add) {
                    embedResult.body.hits.hits[h]._source = Object.assign({},embedResult.body.hits.hits[h]._source,edi.add);
                  }
                  embedResult.body.hits.hits[h]._source.type = embedResult.body.hits.hits[h]._index.split("_")[0];
                  results.hits.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
                  // console.log("embed foreign one result expanded",results.hits[r]._source);
                }
              }
              if (edi.must || edi.should) {
                let resultValidEmbed = true;
                if (edi.dontRepeatSelf && results.hits.hits[r]._source.id == embedResult.body.hits.hits[h]._source.id) {
                  resultValidEmbed = false;
                }
                if (resultValidEmbed) {

                  // console.log("embed must one result expanded",results.hits.hits[r]._source);
                  if (!results.hits.hits[r]._source[edi.location]) { 
                    results.hits.hits[r]._source[edi.location] = [];
                  }                          
                  embedResult.body.hits.hits[h]._source.type = embedResult.body.hits.hits[h]._index.split("_")[0];
                  results.hits.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
                }
                
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
    body: paramsToBody(params),
    // errorTrace: true
  }

  //This is the case for CSV with dataformat plugin
  if (params.query.format) {
    const searchDocumentDataformat = {
      index: searchDocument.index,
      querystring: {
        format: params.query.format,
      },
      body: searchDocument.body,
      context: params
    };

    console.log("search resultDataformat",searchDocumentDataformat);

    try {
      let resultDataformat = await client.dataformat(searchDocumentDataformat,{})
      // resultDataformat.body = client.serializer.deserialize(resultDataformat.body);
      return resultDataformat
    }
    catch(e) {
      return {error: e, body: (e.meta && e.meta.body ) ? e.meta.body.error : {} }
    }

  }
 
  // console.log(index);
  //Add aggregations for result summaries
  if (aggs_definitions[index]) {
    searchDocument.body.aggs = aggs_definitions[index];
  }

  // console.log("search size",searchDocument.body.from,searchDocument.body.size,(searchDocument.body.from + searchDocument.body.size))
  if ((parseInt(searchDocument.body.from) + parseInt(searchDocument.body.size)) < 10000) {
    if (debug) {
      console.log("normal search",JSON.stringify(searchDocument));
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

// function prepareOutput(body, offset, limit, embed, objectFormat, debug) {
function prepareOutput(body, context, debug) {
    let data = {};
    let status = "success";
    let limit = context.params.query.limit;
    let offset = context.params.query.offset;
    let size = 0;
    let count = 0;
    let count_precission = "unknown";
    let bodyhits = body.hits;

    if (debug) {
      console.log("prepareOutput",JSON.stringify(context.params,body,10));
    }

    //This case is for dataformat extension
    if (context.params.query.format) {

      const filename = "qqw"+context.req.url.replace(/\//g,"_").replace(/\?/g,"_").replace(/&/g,"_")+"."+context.params.query.format;

      if(body.body.root_cause) {
        console.log("prepareOutput dataformat error",body.body.root_cause);
      }
  
      if (context.params.query.format == "csv") {
        if (body.headers) {

          const headerKeys = Object.keys(body.headers);
          for (header in headerKeys) {
            context.res.set(headerKeys[header],body.headers[headerKeys[header]]);
      
          }
      
          context.res
            .status(body.statusCode)
            .header("content-disposition","attachment; filename=\""+filename+"\"")
            .setBody(body.body);
        }
        else {
          console.error("CSV with no headers",body);
          return "API Error: "+body.body;
        }
      }

      if (context.params.query.format == "xlsx" || context.params.query.format == "xls") {

        if (body.error) {
          console.log("prepareOutput xls/xlsx error",body.error);
          body.statusCode = 500;

        }
        console.log(body)

        //esto está bueno porque le pone el content-type adecuado y el content-length tambien, pero tira errores de headers
        // context.origRes
        //   .status(body.statusCode)
        //   .attachment(filename)
        //   .type(context.params.query.format)
        //   .set('Content-Transfer-Encoding','binary')
        // .send(body.body)
          // .end();

        context.res
          .set("content-type","application/octet-stream; charset=binary")
          .set('Content-Transfer-Encoding','binary')
          .set('Content-Length',body.body.length)
          .set("content-disposition","attachment; filename=\""+filename+"\"")
          .status(body.statusCode)
          .setBody(body.body);


        console.log(context.res.getHeaders())

       }


  
      return;
    }


    
    // Case for Contracts - they have a different structure and their length comes in the third item in the array
    if (bodyhits && !bodyhits.error) {
      count = bodyhits.total.value;
      count_precission = bodyhits.total.relation;
      data = bodyhits.hits.map(o => { 
        //Add index to results
        o._source.type = o._index.split("_")[0]; 
        return  o._source 
      } );
      size = data.length;
    }

    //Unable to parse
    else {
      status = "error";
      let stack_trace;
      if (body && body. error && body.error.meta && body.error.meta.body) {
        stack_trace = body.error.meta.body.error;
      } 
      console.error("prepareOutput error",bodyhits ? bodyhits.error : "empty bodyhits", body ? body.error : "", stack_trace);

      //If connection is lost to database, kill API process
      if (body.error.name == 'ConnectionError') {
          process.exit(-1);
      }
    }

    if (debug) {
        console.log("prepareOutput size",size);
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
        summary: formatSummary(body.aggregations,debug),
        data,
    };
}

function formatSummary(aggs,debug) {
  if (debug) {
    console.log("formatSummary",JSON.stringify(aggs,10));
  }
  if (aggs) {
    let summary = {}
    let agg_keys = Object.keys(aggs);
    for (key_index in agg_keys) {
      let key = agg_keys[key_index];
      if (aggs[key].value) {
        summary[key] = aggs[key].value;
      }
      else {
        summary[key] = {};
        for (bucket_index in aggs[key].buckets) {
          let bucket = aggs[key].buckets[bucket_index];
          summary[key][bucket.key_as_string || bucket.key ] = bucket.doc_count;
        }
      }
    }
    return summary;
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


/** This code imported from redflags project */
// Parameters:
//      field: name of the field as a string separated by "."
//      tempObj: the object in which the fields should be found
// Return:
//      Array: the contents of the field, or empty array if the field was not found
function fieldPathExists(field, tempObj) {
  var fieldValues = [];
  var fieldPath = field.split('.');

  // Iterate over array with the components of the field
  for(var i=0; i<fieldPath.length; i++) {
      // Field does NOT exist in object
      if( typeof tempObj[fieldPath[i]] == 'undefined' ) {
          return fieldValues;
      }
      // Field has a value of null
      if(tempObj[fieldPath[i]] == null) {
          return fieldValues;
      }

      if( isArray(tempObj[fieldPath[i]]) ) { // Field is an array
          if(i == fieldPath.length - 1) { // Estamos chequeando si existe el array, no su valor
              fieldValues.push(tempObj[fieldPath[i]]);
          }
          else if( tempObj[fieldPath[i]].length > 0 ) { // Iteramos sobre el array de campos
              tempObj[fieldPath[i]].map( (tempItem) => {
                  var results = fieldPathExists( fieldPath.slice(i+1, fieldPath.length).join('.'), tempItem );
                  fieldValues = fieldValues.concat(results);
              } );
          }
          return fieldValues;
      }
      else if( isString(tempObj[fieldPath[i]]) || isNumeric(tempObj[fieldPath[i]]) ) { // Value of the field is a string or number
          if(i < fieldPath.length - 1) { // Arrived at a string or number while end of path has not been reached
              return fieldValues;
          }
          if(tempObj[fieldPath[i]] == '' || tempObj[fieldPath[i]] == '---' || tempObj[fieldPath[i]] == 'null') { // Arrived at empty string, '---' or 'null'
              return fieldValues;
          }
          fieldValues.push( tempObj[fieldPath[i]] );
          return fieldValues;
      }
      else if( isDate(tempObj[fieldPath[i]]) ) { // Value of the field is a date
          if(i < fieldPath.length - 1) { // Arrived at a date while end of path has not been reached
              return fieldValues;
          }
          fieldValues.push(tempObj[fieldPath[i]].toISOString());
          return fieldValues;
      }
      else if( tempObj.hasOwnProperty(fieldPath[i]) && !isEmpty(tempObj[fieldPath[i]]) ) { // fieldPath[i] is an object
          tempObj = tempObj[fieldPath[i]];
      }
      else { // None of the above...
          return fieldValues;
      }
  }

  fieldValues.push(tempObj);
  return fieldValues;
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

function isArray(obj) {
  return !!obj && obj.constructor === Array;
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isDate(d) {
  return typeof d.toISOString === "function";
}
/** END This code imported from redflags project */

module.exports = {
    prepareOutput,
    search,
    embed,
    allIndexes,
    client
}