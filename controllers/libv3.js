const { Client } = require('@elastic/elasticsearch');
const laundry = require('company-laundry'); 
const fs = require('fs'); 
const allIndexes = "areas,contracts,organizations,persons,products";

const version = packageVersion();
//We are using self-signed certificaes for elastic

const elasticNode = process.env.ELASTIC_URI || 'http://localhost:9200/';
const client = new Client({ node: elasticNode, ssl: { rejectUnauthorized: false }, resurrectStrategy: "none", compression: "gzip" });

const query_definitions = {
  "embed": {
    context: "skip"
  },
  "type": {
    context: "skip"
  },
  "format": {
    context: "skip"
  },
  "db_prefix": {
    context: "index"
  },  
  "country": {
    context: "must",
    type: "multi_match",
    fields: ["area.id.keyword","parent_id.keyword","area.name.keyword","parent.keyword","parties.buyer.address.countryName"],
    // min: 1
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
    fields: ["name","contracts.title","other_names.name","identifiers.legalName","contracts.items.description","contracts.items.id","contracts.items.classification.description","identifiers.id" ],

    launder: true,
  },
  "product_name": {
    context: "must",
    type: "multi_match",
    match: "phrase_prefix",
    fields: ["contracts.items.description","contracts.items.id","contracts.items.classification.description" ],
    launder: false,
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
    type: "range-gte",
    field: "contract_amount.supplier"
  },
  "contract_amount_supplier_max": {
    context: "must",
    type: "range-lte",
    field: "contract_amount.supplier"
  },


  // apiFilterName: {
  //   min: "contract_count_supplier_min",
  //   max: "contract_count_supplier_max",
  // },
  // apiFieldNames:["contract_count.supplier"],
  "contract_count_supplier_min": {
    context: "must",
    type: "range-gte",
    field: "contract_count.supplier"
  },
  "contract_count_supplier_max": {
    context: "must",
    type: "range-lte",
    field: "contract_count.supplier"
  },

  // apiFilterName: {
  //   min: "contract_amount_buyer_min",
  //   max: "contract_amount_buyer_max",
  // },    
  // apiFieldNames:["contract_amount.buyer"],
  "contract_amount_buyer_min": {
    context: "must",
    type: "range-gte",
    field: "contract_amount.buyer"
  },
  "contract_amount_buyer_max": {
    context: "must",
    type: "range-lte",
    field: "contract_amount.buyer"
  },

  // apiFilterName: {
  //   min: "contract_count_buyer_min",
  //   max: "contract_count_buyer_max",
  // },    
  // apiFieldNames:["contract_count.buyer"],
  "contract_count_buyer_min": {
    context: "must",
    type: "range-gte",
    field: "contract_count.buyer"
  },
  "contract_count_buyer_max": {
    context: "must",
    type: "range-lte",
    field: "contract_count.buyer"
  },


  // apiFilterName: {
  //   min: "start_date_min",
  //   max: "start_date_max"
  // },
  // apiFieldNames:["contracts.period.startDate"],
  "start_date_min": {
    context: "must",
    type: "range-gte",
    field: "contracts.period.startDate"
  },
  "start_date_max": {
    context: "must",
    type: "range-lte",
    field: "contracts.period.startDate"
  },


  // apiFilterName: {
  //   min: "amount_min",
  //   max: "amount_max"
  // },    
  // apiFieldNames:["total_amount"],
  "amount_min": {
    context: "must",
    type: "range-gte",
    field: "contracts.value.amount"
  },
  "amount_max": {
    context: "must",
    type: "range-lte",
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
  "party_name": {
    context: "must",
    type: "multi_match",
    fields: ["parties.id", "parties.name"],
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
    context: "must",
    type: "match",
    field: "ocid.keyword"
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
 
  "rank": {
    context: "should",
    type: "function_score_sort",
    field: "order"
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
  },
  "hide_by_id": {
    context: "must_not",
    type: "hide_by_id"
  }

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
  location: "flags"
}

const party_flags_max_embed = {
  index: "party_flags",
  location: "party_max",
  size: 0,
  aggs: [
    {
      location: "max_conf",
      definition: {
        "max": {
          field: "node_categories.conf"
        }
      }
    },
    {
      location: "max_trans",
      definition: {
        "max": {
          field: "contract_categories.trans"
        }
      }
    },
    {
      location: "max_temp",
      definition: {
        "max": {
          field: "contract_categories.temp"
        }
      }
    },
    {
      location: "max_comp",
      definition: {
        "max": {
          field: "node_categories.comp"
        }
      }
    },
    {
      location: "max_traz",
      definition: {
        "max": {
          field: "node_categories.traz"
        }
      }
    }

  ]
}

//Discared, not necesary #27
// const products_buyer_embed = {
//   id: "id",
//   foreign_key: "buyer.id",
//   index: "contracts",
//   location: "products",
//   aggs: {
    
//   }

// }

const product_related_embed = {
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
  ],
  aggs: [
    { 
      location: "suppliers",
      definition: {
        "terms": {
          "field": "parties.suppliers.list.id.keyword",
          "size": 100
        },        
        aggs: {
          "nombre": {
            "top_hits": {
              "size": 1,
              "_source": [
                "parties.suppliers.list.name",
                "parties.suppliers.list.id",
                "parties.suppliers.list.details.type"
              ]
            }
          },
          "monto_total": {
            "sum": {
              "field": "contracts.value.amount"
            }
          },
          "monto_total_sobrecosto": {
            "scripted_metric": {
              "init_script": "state.sobrecostos = []", 
              "map_script": "if (doc['contracts.items.unit.value.amountOverpriceMxIMSS'].size()>0) { def o = doc['contracts.items.unit.value.amountOverpriceMxIMSS'].value; state.sobrecostos.add( o > 0 ? o : 0) }",
                "combine_script": "double sobrecosto = 0; for (t in state.sobrecostos) { sobrecosto += t } return sobrecosto",  
                "reduce_script": "double sobrecosto = 0; for (a in states) { sobrecosto += a } return sobrecosto"
              }
          },
          "sobrecosto": {
            "scripted_metric": {
              "init_script": "state.sobrecostos = []", 
              "map_script": "if (doc['contracts.items.unit.value.percentageOverpriceMxIMSS'].size()>0) { def o = doc['contracts.items.unit.value.percentageOverpriceMxIMSS'].value; state.sobrecostos.add( o > 0 ? o : 0) }",
                "combine_script": "double sobrecosto = 0; for (t in state.sobrecostos) { sobrecosto += t } return sobrecosto/state.sobrecostos.length",  
                "reduce_script": "double sobrecosto = 0; for (a in states) { sobrecosto += a } return sobrecosto / states.length"
              }
          },   
          "cantidad_perdida": {
            "sum": {
              "field": "contracts.items.unit.value.quantityLostMxIMSS"
            }
          },          
          "ultima_compra": {
            "max": {
              "field": "contracts.period.startDate"
            }
          },
          "primera_compra": {
            "min": {
              "field": "contracts.period.startDate"
            }
          }
        }
      }
    }
    ,
    { 
      location: "buyers",
      definition: {
        "terms": {
          "field": "buyer.id.keyword",
          "size": 100
        },
        "aggs": {
          "estado": {
            "top_hits": {
              "size": 1
              , "_source": ["buyer.name","buyer.id","parties.buyer.address.region"]
            }
          },
          "monto_total": {
            "sum": {
              "field": "contracts.value.amount"
            }
          },
          "monto_total_sobrecosto": {
            "scripted_metric": {
              "init_script": "state.sobrecostos = []", 
              "map_script": "if (doc['contracts.items.unit.value.amountOverpriceMxIMSS'].size()>0) { def o = doc['contracts.items.unit.value.amountOverpriceMxIMSS'].value; state.sobrecostos.add( o > 0 ? o : 0) }",
                "combine_script": "double sobrecosto = 0; for (t in state.sobrecostos) { sobrecosto += t } return sobrecosto",  
                "reduce_script": "double sobrecosto = 0; for (a in states) { sobrecosto += a } return sobrecosto"
              }
          },
          "sobrecosto": {
            "scripted_metric": {
              "init_script": "state.sobrecostos = []", 
              "map_script": "if (doc['contracts.items.unit.value.percentageOverpriceMxIMSS'].size()>0) { def o = doc['contracts.items.unit.value.percentageOverpriceMxIMSS'].value; state.sobrecostos.add( o > 0 ? o : 0) }",
                "combine_script": "double sobrecosto = 0; for (t in state.sobrecostos) { sobrecosto += t } return sobrecosto/state.sobrecostos.length",  
                "reduce_script": "double sobrecosto = 0; for (a in states) { sobrecosto += a } return sobrecosto / states.length"
              }
          },   
          "cantidad_perdida": {
            "sum": {
              "field": "contracts.items.unit.value.quantityLostMxIMSS"
            }
          },    
          "ultima_compra": {
            "max": {
              "field": "contracts.period.startDate"
            }
          }
        }
      }
    },
  ]
}

const embed_definitions = { 
  areas: [... membership_embed, party_flags_embed, party_flags_max_embed],
  persons: [... membership_embed, party_flags_embed, party_flags_max_embed ],
  organizations: [ ... membership_embed, party_flags_embed, party_flags_max_embed ],
  products: [ product_related_embed, product_contracts_embed ],
  contracts: [
    {
      id: "ocid",
      foreign_key: "ocid",
      index: "contract_flags",
      location: "flags"
    }

  ],
  "contract_flags": [
    {

      id: "id",
      foreign_key: "id",
      index: "contracts",
      location: "contracts"
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
  },
  "type": {
    "terms": {
      "field": "_index",
    },
  }

};

const contracts_summary = {
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
      "min_doc_count": 1,
      "format": "yyyy"
    },
    "aggs": {
      "amount": {
        "sum": {
          "field": "contracts.value.amount"
        }
      }
    }
  },
  "method": {
    "terms": {
      "field": "tender.procurementMethod.keyword",
      "order": {
        "_count": "desc"
      },
      "missing": "other",
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

const contracts_summary_month = {
  "month": {
    "date_histogram": {
      "field": "contracts.period.startDate",
      "calendar_interval": "1m",
      "time_zone": "America/Mexico_City",
      "min_doc_count": 1,
      "format": "yyyy-MM"
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

const aggs_definitions = {
  [allIndexes]: general_summary,
  areas: general_summary,
  persons: general_summary,
  organizations: general_summary,
  products:  general_summary,
  contracts: Object.assign({},general_summary , contracts_summary),
  records: {}
}

function genericController(controllerIndex,context,preprocess) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;
  const prefix = context.params.query.db_prefix;
  // console.log("genericController",context.params);

  return search(controllerIndex,context.params,prefix,debug)
    .then(results => { 
      return embed(controllerIndex,context.params,results,prefix,debug) 
    })
    .then(body => {
      if (preprocess) {
        body = preprocess(body,debug);
      }
      return prepareOutput(body, context, debug)
    })
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

      // console.log(param,query_definitions[param]);
      if (qdp) {
        // console.log("laundry",qdp.launder,param,params[param]);
        if (qdp.launder && ! params[param].map) {
          params[param] = laundry.launder(params[param]);
        }
  
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
              // body.sort[0][params["sort"]] = {order: params[param]};             
            }
          }
          if (!qdp.type) {
            body[qdp.field] = params[param]; 

          }

        }
        else if (qdp.context == "must_not" ) {
          // console.log("qdp",qdp)
          //Hide products and purchases
          if (!body.query.bool.must_not) {
            body.query.bool.must_not = [];
          }
          if (qdp.type == "hide_by_id") {
            body.query.bool.must_not.push({
              "terms": {
                "id.keyword": params[param].split(",")
              }
            })
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
            body.query.bool[qdp.context].push(
              {
                [qdp.type]: { 
                  query: params[param], 
                  type: qdp.match || "phrase" , 
                  fields: qdp.fields,
                  // "analyzer": "spanish"
                }
              }
            );             
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
              
              values.map( (value, index) => {
                // console.log("function_score",value,index,qdp.field)
                if (qdp.launder ) {
                  value = laundry.launder(value);
                }
          
                function_score[qdp.type].functions.push({ weight: ((100000000000000+values.length)-index), filter: { match: { [qdp.field]: value }}});             
              })
            }
            body.query.bool[qdp.context].push(function_score);
          }
          else if (qdp.type == "function_score_sort") {
            let function_score = {["function_score"]: { functions: [],
              "score_mode": "max",
              "boost_mode": "sum"
            }}

            params[param] = params[param].split(/,|\%\2\5\2\C/);
            if (params[param].map) {
              values = params[param];
            }
            else {
              values = [params[param]]
            }
            
            values.map( (value, index) => {
              // console.log("function_score",value,index,qdp.field)
              if (qdp.launder ) {
                value = laundry.launder(value);
              }
        
              function_score["function_score"].functions.push({ field_value_factor: { field: value, factor: 1+(values.length-index)/10, missing: 0 }});             
            })
            body.query.bool[qdp.context].push(function_score);
          }          
          if (qdp.min) {
            body.query.bool.minimum_should_match = qdp.min;
          }

          if (qdp.type == "range-lte") {
            body.query.bool[qdp.context].push( {range: { [qdp.field]: { lte: params[param] }}} ); 
          }
          if (qdp.type == "range-gte") {
            body.query.bool[qdp.context].push( {range: { [qdp.field]: { gte: params[param] }}} ); 
          }
          else {
            //TODO: This throws some errors.
            // console.error("Unexpected query param definition",param, qdp);
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

function addPrefix(index,prefix) {
  if (!prefix) {
    // console.log("addPrefix no prefix",index);
    return index;
  }
  let prefixed = prefix+index;
  if (index.indexOf(",") > -1) {
    prefixed = index.split(",").map((i) => {
      return prefix+i;
    }).join(",");
  }
  // console.log("addPrefix",prefixed);
  return prefixed;
}

async function embed(index,params,results,prefix,debug) {
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
          index: addPrefix(edi.index,prefix),
          body: {size: 5000, aggs: {}, query: {bool: {should: [], must: [], minimum_should_match: 1}}},
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

            // console.log("edi",edi);
            if (edi.hasOwnProperty("size")) {
              searchDocument.body.size = edi.size;
              // process.exit();
            }

            function addFieldValue(type,field) {
              let fieldValue = fieldPathExists(field,result._source)[0];
              if (fieldValue) {
                searchDocument.body.query.bool[type].push({match_phrase: {[field]: fieldValue }})
              }
            }

            //Support for must and should in related products
            for (m in edi.must) {
              addFieldValue("must",edi.must[m])
            }
            for (s in edi.should) {
              addFieldValue("should",edi.should[s])
            }

            //Embed filter fields
            if (edi._source) {
              searchDocument.body._source = edi._source;
            }

            //Embed aggregations
            if (edi.aggs) {
              for (a in edi.aggs) {
                searchDocument.body.aggs[edi.aggs[a].location] = edi.aggs[a].definition;
              }
            }
          }
        })
  
      
        if (debug) {
          console.log("embed searchDocument body",edi.index,JSON.stringify(searchDocument.body));
        }
      
        try {
          if (searchDocument.body.query.bool.should.length == 0 && searchDocument.body.query.bool.must.length == 0 && edi.size != 0) {
            console.log("Embed","Empty search document in index: ",index,"location:",edi.location,edi.id);
            return results;
          }
          // console.log("embed",edi);
          const embedResult = await client.search(searchDocument);
      
          // console.log("embed results",edi,embedResult.body.hits.hits);
          if (embedResult.body.aggregations) {
            //TODO: We're adding the aggregations to the first result instead of specifying which one. This would fail for queries multiple results.
            results.hits.hits[0]._source[edi.location + "_summaries"] = formatSummary(embedResult.body.aggregations, debug);
          }

          for (r in results.hits.hits) {
            for (h in embedResult.body.hits.hits) {
              if (edi.foreign_key) {
                let foreign_key_value = fieldPathExists(edi.foreign_key, embedResult.body.hits.hits[h]._source)
                if (debug) {
                  // console.log("embed each result",foreign_key_value,edi.foreign_key,embedResult.body.hits.hits[h]._source)
                }
  
                if (foreign_key_value[0] && foreign_key_value[0] == results.hits.hits[r]._source[edi.id]) {
                  // console.log(embedResult.body.hits.hits[h]._source[edi.foreign_key],results.hits[r]._source[edi.id]);
                  if (!results.hits.hits[r]._source[edi.location]) { 
                    results.hits.hits[r]._source[edi.location] = [];
                  }
                  if (edi.add) {
                    embedResult.body.hits.hits[h]._source = Object.assign({},embedResult.body.hits.hits[h]._source,edi.add);
                  }
                  embedResult.body.hits.hits[h]._source.type = get_db_type(embedResult.body.hits.hits[h]._index);
                  results.hits.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
                  // console.log("embed foreign one result expanded",results.hits[r]._source);
                }
              }
              else if (edi.must || edi.should) {
                let resultValidEmbed = true;
                if (edi.dontRepeatSelf && results.hits.hits[r]._source.id == embedResult.body.hits.hits[h]._source.id) {
                  resultValidEmbed = false;
                }
                if (resultValidEmbed) {

                  // console.log("embed must one result expanded",results.hits.hits[r]._source);
                  if (!results.hits.hits[r]._source[edi.location]) { 
                    results.hits.hits[r]._source[edi.location] = [];
                  }                          
                  embedResult.body.hits.hits[h]._source.type = get_db_type(embedResult.body.hits.hits[h]._index);
                  results.hits.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);

                }
                
              }

              //This case is for edis without foreing key that are size-0 only-aggs.
              else if (edi.size == 0) {
                console.log("This case is for edis without foreing key that are size-0 only-aggs.",edi)
                if (!results.hits.hits[r]._source[edi.location]) { 
                  results.hits.hits[r]._source[edi.location] = [];
                }                          
                results.hits.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
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
      // console.error("No embed definitions for",index)
      return results;
    }
  }
}


async function search (index,params,prefix,debug) {
  // console.log("search",params,typeof params);

  const searchDocument = {
    index: addPrefix(index,prefix),
    body: paramsToBody(params,debug),
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

    if (debug) {
      console.log("search resultDataformat",searchDocumentDataformat);
    }

    try {
      let resultDataformat = await client.dataformat(searchDocumentDataformat,{}, debug)
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

  if (params.query.months_summary) {
    searchDocument.body.aggs =  Object.assign({}, searchDocument.body.aggs, contracts_summary_month) 
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
    console.error("Search size is bigger than 10000","bodysize",searchDocument.body.size, "bodyfrom",searchDocument.body.from,"sum",((parseInt(searchDocument.body.from) + parseInt(searchDocument.body.size))));
    return {error: "Search size is bigger than 10000. Elasticsearch does not allow it."}
  }
}

function get_db_type(index) {
  // console.log("get_db_type",index);
  let splitindex = index.split("_");

  //Fix for complex index name
  if (index.indexOf("cr_party_flags") == 0) {
    return "party_flags";
  }
  if (index.indexOf("cr_contract_flags") == 0) {
    return "contract_flags";
  }
  return splitindex[splitindex.length-2];
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
        o._source.type = get_db_type(o._index); 
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

    let errorText = (body.error ? body.error : (bodyhits ? bodyhits.error : "Unexpected error"));
    if (errorText && errorText.meta && errorText.meta.body && errorText.meta.body.error && errorText.meta.body.error.type) {
      errorText = errorText.meta.body.error.type;
    }

    return {
        status: status,
        size,
        limit,
        offset,
        pages: pagesNum,
        count: count,
        count_precission: count_precission,
        version: version,
        generated: new Date(),
        error: errorText,
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

      if (typeof aggs[key] == "number") {
        summary[key] = aggs[key];
      }
      else if (aggs[key].value) {
        summary[key] = aggs[key].value;
      }
      else if (aggs[key].hits) {
        summary[key] =  aggs[key].hits.hits[0]._source;
      }
      else {
        summary[key] = {};
        for (bucket_index in aggs[key].buckets) {
          let bucket = aggs[key].buckets[bucket_index];
          if (Object.keys(bucket).length > 2) {


            summary[key][bucket.key_as_string || bucket.key ] = formatSummary(bucket);
          }
          else {
            // console.log("formatSummary bucked", bucket)

            //Remove date from index names.
            if (/(.*)_[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(bucket.key)) {
              bucket.key = bucket.key.substr(0,bucket.key.length-11);
            }

            summary[key][bucket.key_as_string || bucket.key ] = bucket.doc_count;
          }
        }
      }
    }
    return summary;
  }
}


// function formatClassifications(buckets) {
//   return buckets.map(bucket => {
//     if (bucket.key_as_string) {
//       bucket.key = bucket.key_as_string.substr(0,4);
//     }
//     let classification = {
//       [bucket.key]: {
//         count: bucket.doc_count
//       }
//     }
//     if (bucket.date) {
//       classification[bucket.key].lastModified = bucket.date.value_as_string;
//     }
//     return classification;
//   }).reduce(function(result, item, index, array) {
//     firstKey = Object.keys(item)[0];
//     result[firstKey] = item[firstKey]; //a, b, c
//     return result;
//   }, {});
  
// }


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



function packageVersion() {
  const pjson = require('../package.json');
  let gitHead = fs.readFileSync(".git/HEAD", 'utf8');
  if (gitHead.indexOf("refs/") > -1) {
    gitHead = fs.readFileSync(".git/ORIG_HEAD", 'utf8');
  }
  return {
    version: pjson.version,
    commit: gitHead,
    commit_short: gitHead.substr(0,7)
  }
}

function elastic_test(retry=0) {

  //Simple test query
  client.xpack.usage().then(
    () => {
      console.log("Connected to elastic node:",elasticNode);
    }
  ).catch(e => {
    if (retry < 3) {
      console.log("Retry elastic");
      setTimeout(() => {

        elastic_test(retry+1)
      },5000*(retry+1))
    }
    else {

      console.error("Error connecting to elastic node:",elasticNode,e);
      if (e.meta && e.meta.body && e.meta.body.error) {
        console.error("Error body", e.meta.body.error);
      }
      process.exit(100);
    }
  })
}

//MAIN
client.extend('dataformat', ({ makeRequest, ConfigurationError }) => {
  return function dataformat (params, options, debug) {
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

    if (debug) {
      console.log("makeRequest", request, requestOptions);
    }

    return makeRequest(request, requestOptions)
  }
})

elastic_test();


module.exports = {
    addPrefix,
    genericController,
    prepareOutput,
    search,
    embed,
    allIndexes,
    client,
    version
}