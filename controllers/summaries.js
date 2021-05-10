const lib = require('./libv3');
const find = require('lodash/find');
let debug = false;
const useGraph = false;

function summaries(context) {
  const entity_id = context.params.query.id;
  if (entity_id) {
    debug = context.req.query.debug;
  
    const summaryDocument = {
      index: "contracts",
      body: {
        "query": {
          "bool": { 
            "should": [
              {
                "match_phrase": {
                  "parties.buyer.id.keyword": entity_id
                }
              },
              {
                "match_phrase": {
                  "parties.buyer.memberOf.id.keyword": entity_id
                }
              },
              {
                "match_phrase": {
                  "parties.suppliers.ids.keyword": entity_id
                }
              },
              {
                "match_phrase": {
                  "parties.funder_ids.keyword": entity_id
                }
              },
              {
                "match": {
                  "parties.buyer.contactPoint.id.keyword": entity_id
                }
              }
            ]
          }
        },
        "aggs": {
          "role": {
            "filters": {
              "filters": {
                "buyer_contract": {
                  "bool": {
                    "minimum_should_match": 1,
                    "should": [
                      {
                        "match_phrase": {
                          "parties.buyer.id.keyword": entity_id
                        }
                      },
                      {
                        "match_phrase": {
                          "parties.buyer.memberOf.id.keyword": entity_id
                        }
                      }
                    ],
                    "must": [
                      {
                        "match": {
                          "classification.keyword": "contract"
                        }
                      }
                    ]  
                  }
                },
                "buyer_purchase": {
                  "bool": {
                    "should": [
                      {
                        "match_phrase": {
                          "parties.buyer.id.keyword": entity_id
                        }
                      },
                      {
                        "match_phrase": {
                          "parties.buyer.memberOf.id.keyword": entity_id
                        }
                      }
                    ],
                    "minimum_should_match": 1,
                    "must": [
                      {
                        "match": {
                          "classification.keyword": "purchase"
                        }
                      }
                    ]                  
                  }
                },              
                "supplier_contract": {
                  "bool": {
                    "must": [
                      {
                        "match_phrase": {
                          "parties.suppliers.list.id.keyword": entity_id
                        }
                      },
                      {
                        "match": {
                          "classification.keyword": "contract"
                        }
                      }
                    ]
                  }
                },
                "supplier_purchase": {
                  "bool": {
                    "must": [
                      {
                        "match_phrase": {
                          "parties.suppliers.list.id.keyword": entity_id
                        }
                      },
                      {
                        "match": {
                          "classification.keyword": "purchase"
                        }
                      }
                    ]
                  }
                },
                "contactPoint": {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "parties.buyer.contactPoint.id.keyword": entity_id
                        }
                      }
                    ],
                    "minimum_should_match": 1
                  }
                },
                "funder": {
                  "bool": {
                    "must": [
                      {
                        "match_phrase": {
                          "parties.funder.id.keyword": entity_id
                        }
                      }
                    ],
                    "minimum_should_match": 1
                  }
                }
              }
            },
            "aggs": {
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
                  "field": "tender.procurementMethod.keyword",
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
              },
              "top_contracts": {
                "top_hits": {
                  "sort": [
                    {
                      "contracts.value.amount": {
                        "order": "desc"
                      }
                    }
                  ],
                  "size": 3
                }
              },
              "top_entities_buyer": {
                "terms": {
                  "field": "buyer.id.keyword",
                  "order": {
                    "amount": "desc"
                  },
                  "size": 3
                },
                "aggs": {
                  "amount": {
                    "sum": {
                      "field": "contracts.value.amount"
                    }
                  },
                  "entity": {
                    "top_hits": {
                      "size": 1
                    }
                  }
                }
              },            
              "top_entities_funder": {
                "terms": {
                  "field": "parties.funder.id.keyword",
                  "order": {
                    "amount": "desc"
                  },
                  "size": 3
                },
                "aggs": {
                  "amount": {
                    "sum": {
                      "field": "contracts.value.amount"
                    }
                  },
                  "entity": {
                    "top_hits": {
                      "size": 1
                    }
                  }
                }
              },
              "top_entities_supplier": {
                "terms": {
                  "field": "awards.suppliers.id.keyword",
                  "order": {
                    "amount": "desc"
                  },
                  "size": 3
                },
                "aggs": {
                  "amount": {
                    "sum": {
                      "field": "contracts.value.amount"
                    }
                  },
                  "entity": {
                    "top_hits": {
                      "size": 1
                    }
                  }
                }
              },
              "top_entities_contactPoint": {
                "terms": {
                  "field": "awards.suppliers.id.keyword",
                  "order": {
                    "amount": "desc"
                  },
                  "size": 3
                },
                "aggs": {
                  "amount": {
                    "sum": {
                      "field": "contracts.value.amount"
                    }
                  },
                  "entity": {
                    "top_hits": {
                      "size": 1
                    }
                  }
                }
              },
              "top_products" : {
                "terms": {
                  "field": "contracts.items.id.keyword",
                },
                "aggs": {
                  "producto": {
                    "top_hits": {
                      "size": 1,
                      "_source": [
                        "contracts.items.classification.description"
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
              },
              "sobrecosto_total": {
                "scripted_metric": {
                  "init_script": "state.sobrecostos = []", 
                  "map_script": "if (doc['contracts.items.unit.value.amountOverpriceMxIMSS'].size()>0) { def o = doc['contracts.items.unit.value.amountOverpriceMxIMSS'].value; state.sobrecostos.add( o > 0 ? o : 0) }",
                    "combine_script": "double sobrecosto = 0; for (t in state.sobrecostos) { sobrecosto += t } return sobrecosto",  
                    "reduce_script": "double sobrecosto = 0; for (a in states) { sobrecosto += a } return sobrecosto"
                  }
              },
              "sobrecosto_porcentaje": {
                "scripted_metric": {
                  "init_script": "state.sobrecostos = []", 
                  "map_script": "if (doc['contracts.items.unit.value.percentageOverpriceMxIMSS'].size()>0) { def o = doc['contracts.items.unit.value.percentageOverpriceMxIMSS'].value; state.sobrecostos.add( o > 0 ? o : 0) }",
                    "combine_script": "double sobrecosto = 0; for (t in state.sobrecostos) { sobrecosto += t } return sobrecosto/state.sobrecostos.length",  
                    "reduce_script": "double sobrecosto = 0; for (a in states) { sobrecosto += a } return sobrecosto / states.length"
                  }
              } 
            }
          }
        },
        "size": 0
      }
    }

    const graphSummaryDocument = {
    "relation_suppliers": {
        "terms": {
          "field": "awards.suppliers.id.keyword",
          "size": 5000
        },
        "aggregations": {
          "name": {
            "terms": {
              "field": "awards.suppliers.name.keyword",
              "size": 1 
            }
          },

          "type": {
            "terms": {
              "field": "tender.procurementMethod.keyword",
              "order": {
                "_count": "desc"
              },
              "missing": "undefined",
              "size": 10,
            },

          },
          "uc": {
            "terms": {
              "field": "buyer.id.keyword",
              "size": 5000                
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
      },
      "relation_uc": {
        "terms": {
          "field": "buyer.id.keyword",
          "size": 5000
        },
        "aggregations": {
          "name": {
            "terms": {
              "field": "buyer.name.keyword",
              "size": 1 
            }
          },
          "type": {
            "terms": {
              "field": "tender.procurementMethod.keyword",
              "order": {
                "_count": "desc"
              },
              "missing": "undefined",
              "size": 10,
            },

          },
          "amount": {
            "sum": {
              "field": "contracts.value.amount"
            }
          },
          "dependencia": {
            "terms": {
              "field": "parties.buyer.memberOf.id.keyword",
              "size": 5000
            },
            "aggregations": {
              "name": {
                "terms": {
                  "field": "parties.buyer.memberOf.name.keyword",
                  "size": 1 
                }
              },
              "amount": {
                "sum": {
                  "field": "contracts.value.amount"
                }
              }
            }
          }
        }
      },
      "relation_funder": {
        "terms": {
          "field": "parties.funder.id.keyword",
          "size": 5000
        },
        "order": {
          "_count": "desc"
        },        
        "aggregations": {
          "name": {
            "terms": {
              "field": "buyer.name.keyword",
              "size": 1 
            }
          },
          "type": {
            "terms": {
              "field": "tender.procurementMethod.keyword",
              "order": {
                "_count": "desc"
              },
              "missing": "undefined",
              "size": 10,
            },

          },
          "amount": {
            "sum": {
              "field": "contracts.value.amount"
            }
          },
          "dependencia": {
            "terms": {
              "field": "parties.buyer.memberOf.id.keyword",
              "size": 1   
            },
            "aggs": {
              "name": {
                "terms": {
                  "field": "parties.buyer.memberOf.name.keyword",
                  "size": 1 
                }
              },
              "amount": {
                "sum": {
                  "field": "contracts.value.amount"
                }
              }
              
            }
          }
        }
      }
    }

    if (useGraph === true) {
      summaryDocument.body.aggs = Object.assign({}, summaryDocument.body.aggs, graphSummaryDocument);
    }
    
    if (debug) {
      console.log("summaries searchDocument body",JSON.stringify(summaryDocument.body))
    }
  
    return lib.client.search(summaryDocument).then(formatSummaries)
  }
  else {
    return {
      "error": "No id for entity summaries."
    }
  }

  

}

function formatSummaries(result) {
  if (debug) {
    console.log("formatSummaries",result);
  }

  const summaries = {
    
  };

  for (role in result.body.aggregations.role.buckets) {
    const thisBucket = result.body.aggregations.role.buckets[role];
    const yearObject = {};
    const typeObject = {};
    let entitiesObject = [];

    const yearBucket = thisBucket.year.buckets;
    for (y in yearBucket) {
      let thisYear = yearBucket[y].key_as_string.substring(0,4);
      yearObject[thisYear] = {
          value: yearBucket[y].amount.value,
          count: yearBucket[y].doc_count,
      }
    }

    const typeBucket = thisBucket.type.buckets;
    for (t in typeBucket) {
      thisType = typeBucket[t].key;
      typeObject[thisType] = {
        value: typeBucket[t].amount.value,
        count: typeBucket[t].doc_count
      }
    }

    let entityBucket = {}
      // console.log("formatSummaries role",role);
    if (role == "funder") {
      entityBucket = thisBucket.top_entities_funder.buckets;
      entityType = "institutions"
    }
    if (role == "supplier_contract") {
      entityBucket = thisBucket.top_entities_buyer.buckets;
      entityType = "institutions"
    }
    if (role == "supplier_purchase") {
      entityBucket = thisBucket.top_entities_buyer.buckets;
      entityType = "institutions"
    }
    if (role == "buyer_contract") {
      entityBucket = thisBucket.top_entities_supplier.buckets;
      entityType = "companies"
    }
    if (role == "buyer_purchase") {
      entityBucket = thisBucket.top_entities_supplier.buckets;
      entityType = "companies"
    }
    if (role == "contactPoint") {
      entityBucket = thisBucket.top_entities_contactPoint.buckets;
      entityType = "persons"
    }
    for (e in entityBucket) {
      const thisEntity = entityBucket[e];
      // console.log("formatSummaries entityBucket",thisEntity.entity.hits.hits[0]._source.parties,thisEntity.key)

      let allParties = [... [thisEntity.entity.hits.hits[0]._source.parties.buyer], ... [thisEntity.entity.hits.hits[0]._source.funder], ...thisEntity.entity.hits.hits[0]._source.parties.suppliers.list]
      const entityObject = find(allParties,{id: thisEntity.key});
      entityObject.contract_amount = { [entityObject.roles]: thisEntity.amount.value};
      entityObject.contract_count = { [entityObject.roles]: thisEntity.doc_count};
      entityObject.type = entityType;
      entityObject.classification = entityObject.details.type;

      entitiesObject.push(entityObject)
    }
    // console.log(b,thisBucket);

    summaries[role] = {
      total: {
        value: thisBucket.amount.value,
        count: thisBucket.doc_count,
        sobrecosto_total: thisBucket.sobrecosto_total.value,
        sobrecosto_porcentaje: thisBucket.sobrecosto_porcentaje.value
      },
      year: yearObject,
      type: typeObject,
      top_contracts: thisBucket.top_contracts.hits.hits.map(o => Object.assign(o._source,{type: o._index.split("_")[0]})),
      top_entities: entitiesObject,
      top_products: formatProducts(thisBucket.top_products.buckets)
    }
  }

  if (result.body.aggregations && result.body.aggregations.relation_suppliers) {
    summaries.relation = formatGraph(result.body.aggregations)
  }
  return summaries;
}

function formatProducts(buckets) {
  if (!buckets || buckets.length == 0) { return [] }
  let products = []
  for (b in buckets) {
    let p = buckets[b];
    // console.log("formatProducts",p.key,p.producto.hits.hits[0]._source.contracts.items.classification.description)
  
  //Ignore 0's and 9's
   if (p.producto.hits.hits[0]._source.contracts) { 
     products.push({
       clave: p.key,
       cantidad: p.doc_count,
       monto_total: p.monto_total.value,
       ultima_compra: p.ultima_compra.value_as_string,
       producto: p.producto.hits.hits[0]._source.contracts.items.classification.description,
       monto_total_sobrecosto: p.monto_total_sobrecosto.value,
       primera_compra: p.primera_compra.value_as_string,
       sobrecosto: p.sobrecosto.value
     })
   }
   else {
    //  console.log(p)
   }
  }
  return products;
}

function formatGraph(graph) {
  // console.log("formatGraph",graph)
  const response = {
    nodes: [],
    links: []
  }

  relation_funder = createNodes("funder",graph.relation_funder.buckets);
  relation_suppliers = createNodes("supplier",graph.relation_suppliers.buckets);
  relation_uc = createNodes("uc",graph.relation_uc.buckets);

  response.nodes = [... relation_funder.nodes, ... relation_suppliers.nodes, ... relation_uc.nodes]
  response.links = [... relation_funder.links, ... relation_suppliers.links, ... relation_uc.links]

  return response;
}

function createNodes(rel,buckets) {
  const response = {
    nodes: [],
    links: []
  }  

  for(relIndex in buckets) {
    let entity = buckets[relIndex];

    // console.log("createNodes",JSON.stringify(entity));

    response.nodes.push({id: entity.key, weight: entity.doc_count, type: rel, label: entity.name.buckets[0].key });

    if (rel == "uc") {
      for (index in entity.dependencia.buckets) {
        // console.log(JSON.stringify(entity));
        response.nodes.push({id: entity.dependencia.buckets[index].key, "type": "dependencia", weight: entity.doc_count, label: entity.dependencia.buckets[index].name.buckets[0].key  });
        response.links.push({source: entity.key, target: entity.dependencia.buckets[index].key, type:entity.type.buckets[0].key, classification: "dependencia", weight: entity.dependencia.buckets[index].doc_count });  
      }
    }
    if (rel == "funder") {
      for (index in entity.dependencia.buckets) {
        response.links.push({surce: entity.key, target: entity.dependencia.buckets[index].key, classification: rel, type:entity.type.buckets[0].key, weight: entity.dependencia.buckets[index].doc_count });  
      }

    }
    if (rel == "supplier") {
      for (index in entity.uc.buckets) {
        response.links.push({target: entity.key, source: entity.uc.buckets[index].key, classification: rel, type:entity.type.buckets[0].key, weight: entity.uc.buckets[index].doc_count });  
      }
    }
  }
  return response;
}



module.exports = {summaries}