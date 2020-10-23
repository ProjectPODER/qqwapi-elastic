const lib = require('./libv3');
const find = require('lodash/find');


function summaries(context) {
  const entity_id = context.params.query.id;

  const summaryDocument = {
    index: "contracts",
    body: {
      "query": {
        "bool": {
          "should": [
            {
              "match_phrase": {
                "parties.buyer.id.raw": entity_id
              }
            },
            {
              "match_phrase": {
                "parties.buyer.memberOf.id.raw": entity_id
              }
            },
            {
              "match_phrase": {
                "parties.suppliers.ids.raw": entity_id
              }
            },
            {
              "match_phrase": {
                "parties.funder_ids.raw": entity_id
              }
            },
            {
              "match": {
                "parties.buyer.contactPoint.id": entity_id
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
                        "parties.buyer.id.raw": entity_id
                      }
                    },
                    {
                      "match_phrase": {
                        "parties.buyer.memberOf.id.raw": entity_id
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
                        "parties.suppliers.list.id.raw": entity_id
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
                        "parties.buyer.contactPoint.id": entity_id
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
                        "parties.funder.id.raw": entity_id
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
                "field": "buyer.id.raw",
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
                "field": "parties.funder.id.raw",
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
                "field": "awards.suppliers.id.raw",
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
                "field": "awards.suppliers.id.raw",
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
            "field": "awards.suppliers.id.raw",
            "size": 1000
          },
          "aggregations": {
            "uc": {
              "terms": {
                "field": "buyer.id.raw",
                "size": 1000                
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
            "field": "buyer.id.raw",
            "size": 1000
          },
          "aggregations": {
            "amount": {
              "sum": {
                "field": "contracts.value.amount"
              }
            },
            "dependencia": {
              "terms": {
                "field": "parties.buyer.memberOf.id.raw",
                "size": 1000
              },
              "aggregations": {
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
            "field": "parties.funder.id.raw",
            "size": 1000
          },
          "aggregations": {
            "amount": {
              "sum": {
                "field": "contracts.value.amount"
              }
            },
            "dependencia": {
              "terms": {
                "field": "parties.buyer.memberOf.id.raw",
                "size": 1000               
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
      },
      "size": 0
    }
  }
  
  // console.log("summaries searchDocument body",JSON.stringify(summaryDocument.body))

  return lib.client.search(summaryDocument).then(formatSummaries)

  

}

function formatSummaries(result) {
  // console.log("formatSummaries",result);

  
  // return Object.keys(result.body.aggregations.role.buckets).map((role) => {
  //   thisRole = result.body.aggregations.role.buckets[role];
  //   return {
  //     [role] : Object.assign({},
  //       {
  //         total: {
  //           count: thisRole.doc_count,
  //           amount: thisRole.amount.value
  //         }
  //       }, 
  //       Object.keys(thisRole).map((summary) => {
  //         thisSummary = thisRole[summary];
  //         // console.log(summary,thisSummary);
  //         if (thisSummary.hits) {
  //           return thisSummary.hits.hits.map(o => o._source)
  //         }
  //         if (thisSummary.buckets) {
  //           return thisSummary.buckets.map(item => {
  //             thisItem = thisSummary.buckets[item];
  //             // console.log(item,thisItem);
  //             return {
  //               [item.key]: {
  //                 count: item.doc_count,
  //                 amount: item.amount.value
  //               }
  //             }
  //           })
    
  //         }
  //       })    
  //     )
  //   }
  // })

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
        value: yearBucket[y].amount.value,
        count: yearBucket[y].doc_count
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

    // console.log("createNodes",entity);

    //Todo: fix weights, types and add names

    response.nodes.push({id: entity.key, weight: entity.doc_count, type: rel, label: entity.key.replace("-"," ") });

    if (rel == "uc") {
      for (index in entity.dependencia.buckets) {
        response.nodes.push({id: entity.dependencia.buckets[index].key, "type": "dependencia", weight: entity.doc_count, label: entity.key.replace("-"," ")  });
        response.links.push({source: entity.key, target: entity.dependencia.buckets[index].key, type: "dependencia", weight: entity.dependencia.buckets[index].doc_count });  
      }
    }
    if (rel == "funder") {
      for (index in entity.dependencia.buckets) {
        response.links.push({surce: entity.key, target: entity.dependencia.buckets[index].key, type: rel, weight: entity.dependencia.buckets[index].doc_count });  
      }

    }
    if (rel == "supplier") {
      for (index in entity.uc.buckets) {
        response.links.push({target: entity.key, source: entity.uc.buckets[index].key, type: rel, weight: entity.uc.buckets[index].doc_count });  
      }
    }
  }
  return response;
}

// function summariesOld(context) {
//   let controllerIndex = context.params.type;
//   delete context.params.type;

//   return lib.search(controllerIndex,context.params)
//     .then(results => { 
//       return addSummaries(controllerIndex,context.params,results) 
//     })
//     .then(lib.prepareOutput)
// }


// async function addSummaries(index,params,results) {
//   if (results.hits.length == 0) {
//     console.error("addSummaries error, no result hits")
//     return results;
//   }
//   let body = {sort: [{"contracts.value.amount": {order: "desc"}}], size: 10000, query: {bool: {filter: []}}}

//   //collect ids
//   //query other collections
//   //merge
//   console.log("embed",results);
//   results.hits.forEach(result => {
//     body.query.bool.filter.push({term: {"parties.id": result._source.id}})
//     body.query.bool.filter.push({term: {"parties.memberOf.id": result._source.id}})
//     body.query.bool.filter.push({term: {"parties.contactPoint.id": result._source.id}})
//   })

//   const searchDocument = {
//     index: "contracts",
//     body: body
//   }

//   console.log("addSummaries searchDocument body",JSON.stringify(searchDocument.body));

//   try {
//     console.log("addSummaries");
//     const summariesResult = await lib.client.search(searchDocument);

//     // console.log("summaries results",summariesResult.body.hits.hits);
//     for (r in results.hits) {
//       results.hits[r]._source.summaries = calculateSummaries(results.hits[r]._source.id,summariesResult.body.hits.hits);
//           // console.log("embed one result expanded",results.hits[r]._source);
//     }
//   }  
//   catch(e) {
//     console.error("addSummaries error",e)
//   }
//   // console.log("embed results expanded",edi.location,results);
  
//   // console.log("embed results returned",results);
//   return results;
// }


// function addLink(relationSummary, link) {
//   if (relationSummary.links.length > 1000) {
//     // console.log("skipping link", link)
//     return false;
//   }

//   const source = find(relationSummary.nodes, { id: link.source });
//   const target = find(relationSummary.nodes, { id: link.target });

//   if (source && target) {

//     // console.log('addLink',link,source.id,target.id);
//     const existentLink = find(relationSummary.links, { source: source.id, target: target.id });

//     if (!existentLink) {
//       const newLink = {
//         id: relationSummary.links.length,
//         source: source.id,
//         target: target.id,
//         weight: link.weight || 1,
//         type: link.type || "undefined"
//       };
//       // console.log('addLink',newLink);
//       relationSummary.links.push(newLink);
//     } else {
//       existentLink.weight += link.weight || 1;
//     }

//     if (!target.fixedWeight){
//       target.weight = parseFloat(target.weight) + (link.weight || 1);
//     }
//     if (!source.fixedWeight){
//       source.weight = parseFloat(source.weight) + (link.weight || 1);
//     }

//   }
//   // else {
//   //   console.error('Faltó agregar algún nodo', link);
//   // }
//   return true;
// }
// function addNode(relationSummary, node) {
//   if (relationSummary.nodes.length > 400) {
//     return false;
//   }

//   if (!find(relationSummary.nodes, { id: node.id })) {
//     // console.log('addNode',node);

//     if (!node.weight) {
//       node.weight = 1;
//     }
//     relationSummary.nodes.push(node);
//   }
//   return true;
// }

// function getMaxContractAmount(contracts) {
//   let maxContractAmount = 0;
//   for (const c in contracts) {
//     if (Object.prototype.hasOwnProperty.call(contracts, c)) {
//       const contract = contracts[c]._source;
//       // console.log(contract);
//       const amount = parseFloat(contract.contracts.value.amount);
//       if (amount > maxContractAmount) {
//         maxContractAmount = amount;
//       }
//     }
//   }
//   return maxContractAmount;
// }

// function calculateSummaries(orgID, contracts) {
//   // console.log('calculateSummaries',records.length);

//   //  Generar los objetos para cada gráfico
//   const yearSummary = {};
//   const typeSummary = {};
//   const allBuyers = {};
//   const allSuppliers = {};
//   const allFundees = {};
//   const relationSummary = { nodes: [], links: [] };
//   const maxContractAmount = getMaxContractAmount(contracts);

//   for (const c in contracts) {
//     if (Object.prototype.hasOwnProperty.call(contracts, c)) {
//       const contract = contracts[c]._source;

//       const buyerParty = find(contract.parties, { id: contract.buyer.id });
//       const funderParty = find(contract.parties, { roles: ["funder"] });
//       // console.log("funderParty",funderParty,compiledRelease.parties);
//       const memberOfParty = find(contract.parties, 'memberOf');
//       // console.log('calculateSummaries memberOfParty', memberOfParty.memberOf[0].id === orgID, buyerParty.id === orgID || memberOfParty.memberOf[0].id === orgID);
//       const procurementMethod = contract.tender.procurementMethod;

//       const isFunderContract = funderParty ? (funderParty.id === orgID) : false;

//       const isBuyerContract =
//         buyerParty.id === orgID || (buyerParty.contactPoint && buyerParty.contactPoint.id === orgID) || memberOfParty && memberOfParty.memberOf[0].id === orgID;

  
//       const award = contract.awards;
//       const isSupplierContract = find(award.suppliers, { id: orgID }) || false;
//       // console.log("compiledRelease.buyer.id",compiledRelease.buyer.id);
//       //console.log("contract.period",contract.period,compiledRelease.ocid);

//       let year = "undefined";
//       if (contract.period) {
//         year = new Date(contract.period.startDate).getFullYear();
//       }

//       if (isFunderContract) {
//         if (!allFundees[memberOfParty.id]) {
//           allFundees[memberOfParty.id] = memberOfParty;
//           allFundees[memberOfParty.id].contract_amount_top_funder = 0;
//           allFundees[memberOfParty.id].type = buyerParty.type;
//         }
//         allFundees[memberOfParty.id].contract_amount_top_funder += award.value.amount;
//       }

//       // To calculate top3buyers
//       if (isSupplierContract) {
//         if (memberOfParty) {
//           if (!allBuyers[memberOfParty.id]) {
//             allBuyers[memberOfParty.id] = memberOfParty;
//             allBuyers[memberOfParty.id].contract_amount_top_buyer = 0;
//             allBuyers[memberOfParty.id].type = buyerParty.type;
//           }
//           allBuyers[memberOfParty.id].contract_amount_top_buyer += award.value.amount;
//         }
//       }

//       if (year != "undefined") {
//         if (!yearSummary[year]) {
//           yearSummary[year] = {
//             buyer: { value: 0, count: 0 },
//             supplier: { value: 0, count: 0 },
//             funder: { value: 0, count: 0 },
//           };
//         }

//         // TODO: sumar los amounts en MXN siempre
//         if (isSupplierContract) {
//           yearSummary[year].supplier.value += parseInt(contract.contracts.value.amount, 10);
//           yearSummary[year].supplier.count += 1;
//         }
//         if (isBuyerContract) {
//           yearSummary[year].buyer.value += parseInt(contract.contracts.value.amount, 10);
//           yearSummary[year].buyer.count += 1;
//         }
//         if (isFunderContract) {
//           yearSummary[year].funder.value += parseInt(contract.contracts.value.amount, 10);
//           yearSummary[year].funder.count += 1;
//         }

//       }

//       if (!typeSummary[procurementMethod]) {
//         typeSummary[procurementMethod] = {
//           buyer: { value: 0, count: 0 },
//           supplier: { value: 0, count: 0 },
//           funder: { value: 0, count: 0 },
//         };
//       }

//       if (isSupplierContract) {
//         typeSummary[procurementMethod].supplier.value += parseInt(contract.contracts.value.amount, 10);
//         typeSummary[procurementMethod].supplier.count += 1;
//       }
//       if (isBuyerContract) {
//         typeSummary[procurementMethod].buyer.value += parseInt(contract.contracts.value.amount, 10);
//         typeSummary[procurementMethod].buyer.count += 1;
//       }
//       if (isFunderContract) {
//         typeSummary[procurementMethod].funder.value += parseInt(contract.contracts.value.amount, 10);
//         typeSummary[procurementMethod].funder.count += 1;
//       }



//       // TODO: sumar los amounts en MXN siempre

//       // UC
//       addNode(relationSummary, { id: buyerParty.id,label: buyerParty.name, type: buyerParty.details.type });
//       // addNode(relationSummary, { id: procurementMethod,label: procurementMethod, type: 'procurementMethod' });

//       // addLink(relationSummary, { source: buyerParty.id, target: procurementMethod });

//       const linkWeight = Math.round((parseFloat(contract.contracts.value.amount)/parseFloat(maxContractAmount))*10);



//       for (const a in award.suppliers) {
//         if (Object.prototype.hasOwnProperty.call(award.suppliers, a)) {
//           const supplierParty = find(contract.parties, { id: award.suppliers[a].id });

//           if (supplierParty) {
//             addNode(relationSummary, { id: award.suppliers[a].id,label: award.suppliers[a].name, type: supplierParty.details.type });
//             addLink(relationSummary, { source: buyerParty.id, target: award.suppliers[a].id, weight: linkWeight, type: procurementMethod || "supplier" });

//             if (isBuyerContract) {
//               // To calculate top3suppliers
//               if (!allSuppliers[supplierParty.id]) {
//                 allSuppliers[supplierParty.id] = supplierParty;
//                 allSuppliers[supplierParty.id].contract_amount_top_supplier = 0;
//               }
//               allSuppliers[supplierParty.id].contract_amount_top_supplier += award.value.amount;
//             }
//           }
//           // else {
//           //   console.error('Party id error','award:',award,'parties:',compiledRelease.parties);
//           // }
//         }
//       }

//       // console.log("calculateSummaries buyerParty",buyerParty);
//       if (buyerParty.memberOf) {

//         if (buyerParty.memberOf[0].name) {
//           addNode(relationSummary, { id: buyerParty.memberOf[0].id, label: buyerParty.memberOf[0].name, type: "dependency" });
//           addLink(relationSummary, { source: buyerParty.id, target: buyerParty.memberOf[0].id, type: "buyer" });
//         }
//       }

//       if (funderParty) {
//         addNode(relationSummary, { id: funderParty.id,label: funderParty.name, type: funderParty.details.type });

//         if (buyerParty.memberOf) {
//           addLink(relationSummary, { source: buyerParty.memberOf[0].id, target: funderParty.id, weight: linkWeight, type: "funder" });
//         }
//         else {
//           addLink(relationSummary, { source: buyerParty.id, target: funderParty.id, weight: linkWeight, type: "funder" });
//         }
//       }

//     }
//   }

  
//   // console.log("allBuyers",sortBy('contract_amount_top_buyer', allBuyers))

//   //Cut the top 3 of all ordered by contract amount, except the current org
//   delete allBuyers[orgID];
//   delete allSuppliers[orgID];
//   delete allFundees[orgID];
//   const top3buyers = slice(0, 3, orderBy('contract_amount_top_buyer', 'desc', allBuyers));
//   const top3suppliers = slice(0, 3, orderBy('contract_amount_top_supplier', 'desc', allSuppliers));
//   const top3fundees = slice(0, 3, orderBy('contract_amount_top_funder', 'desc', allFundees));

//   const summary = {
//     year: yearSummary,
//     type: typeSummary,
//     relation: relationSummary,
//     top_buyers: top3buyers,
//     top_suppliers: top3suppliers,
//     top_fundees: top3fundees,
//   };

//   return summary;
// }



module.exports = {summaries}