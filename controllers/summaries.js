const lib = require('./libv3');
const find = require('lodash/find');
let debug = false;

function summaries(context) {
  const entity_id = context.params.query.id;
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
              "buyer": {
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
                  "minimum_should_match": 1
                }
              },
              "supplier": {
                "bool": {
                  "should": [
                    {
                      "match_phrase": {
                        "parties.suppliers.list.id.keyword": entity_id
                      }
                    }
                  ],
                  "minimum_should_match": 1
                }
              },
              "contactPoint": {
                "bool": {
                  "should": [
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
            }

          }
        },
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
      },
      "size": 0
    }
  }
  
  if (debug) {
    console.log("summaries searchDocument body",JSON.stringify(summaryDocument.body))
  }

  return lib.client.search(summaryDocument).then(formatSummaries)

  

}

function formatSummaries(result) {
  if (debug) {
    console.log("formatSummaries",result);
  }

  const summaries = {
    relation: formatGraph(result.body.aggregations)
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
    }
    if (role == "supplier") {
      entityBucket = thisBucket.top_entities_buyer.buckets;
    }
    if (role == "buyer") {
      entityBucket = thisBucket.top_entities_supplier.buckets;
    }
    if (role == "contactPoint") {
      entityBucket = thisBucket.top_entities_contactPoint.buckets;
    }
    for (e in entityBucket) {
      const thisEntity = entityBucket[e];
      // console.log("formatSummaries entityBucket",thisEntity.entity.hits.hits[0]._source.parties,thisEntity.key)

      let allParties = [... [thisEntity.entity.hits.hits[0]._source.parties.buyer], ... [thisEntity.entity.hits.hits[0]._source.funder], ...thisEntity.entity.hits.hits[0]._source.parties.suppliers.list]
      const entityObject = find(allParties,{id: thisEntity.key});
      entityObject.contract_amount = { [entityObject.roles[0]]: thisEntity.amount.value};
      entityObject.contract_count = { [entityObject.roles[0]]: thisEntity.doc_count};

      entitiesObject.push(entityObject)
    }
    // console.log(b,thisBucket);

    summaries[role] = {
      total: {
        value: thisBucket.amount.value,
        count: thisBucket.doc_count
      },
      year: yearObject,
      type: typeObject,
      top_contracts: thisBucket.top_contracts.hits.hits.map(o => Object.assign(o._source,{type: o._index})),
      top_entities: entitiesObject
    }
  }
  return summaries;
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