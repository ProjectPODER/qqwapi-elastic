const { Client } = require('@elastic/elasticsearch');
const { id } = require('monk');

const orderBy = require('lodash/fp/orderBy');
const slice = require('lodash/fp/slice');
const find = require('lodash/find');


const client = new Client({ node: 'http://localhost:9200' });
module.exports = client;

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
    context: "filter",
    type: "term",
    field: "area.id"
  },
  // apiFilterName: "name",
  // apiFieldNames:["name"],
  "name": {
    context: "should",
    type: "fuzzy",
    fields: ["name","contracts.title","other_names.name"]
  },
  // apiFilterName: "identifier",
  // apiFieldNames:["identifiers.id"],
  "identifier": {
    context: "filter",
    type: "term",
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
    context: "filter",
    type: "term",
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
    type: "fuzzy",
    field: "awards.suppliers.name"
  },

  // apiFilterName: "buyer_name",
  // apiFieldNames:["parties.memberOf.name"],
  "buyer_name": {
    context: "must",
    type: "fuzzy",
    field: "parties.memberOf.name"
  },

  // apiFilterName: "funder_name",
  // apiFieldNames:["funder"],
  // TODO: Match party type too
  "funder_name": {
    context: "must",
    type: "fuzzy",
    field: "parties.name"
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
    context: "filter",
    type: "term",
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
    type: "fuzzy",
    field: "parties.contactPoint.name"
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
  },
  //OK 
  "offset": {
    context: "body",
    field: "from"
  }
}


function paramsToBody(paramsObject) {
  const params = Object.assign({}, paramsObject.query, paramsObject.path);
  const body={ sort: []}; 
  // console.log("paramsToBody",paramsObject.query);

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

          if (qdp.type == "match" || qdp.type == "match_phrase" || qdp.type == "fuzzy") {
            if (qdp.field) {
              body.query.bool.should.push({[qdp.type]: { [qdp.field]: params[param]}});             
            }
            if (qdp.fields) {
              qdp.fields.forEach((field) => {
                body.query.bool.should.push({[qdp.type]: { [field]: params[param]}});             
              })
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

          if (qdp.type == "match" || qdp.type == "match_phrase" || qdp.type == "fuzzy") {
            if (qdp.field) {
              body.query.bool.must.push({[qdp.type]: { [qdp.field]: params[param]}});             
            }
            if (qdp.fields) {
              qdp.fields.forEach((field) => {
                body.query.bool.must.push({[qdp.type]: { [field]: params[param]}});             
              })
            }
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
      location: "memberships",
      add: {direction: "child" }
    },
    {
      id: "id",
      foreign_key: "organization_id",
      index: "memberships",
      location: "memberships",
      add: {direction: "parent" }

    }
  ],
  contracts: [
    {
      id: "id",
      foreign_key: "id",
      index: "contract_flags",
      location: "flags"
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
      for (e in edis) {
        let edi = edis[e];
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
          console.log("embed",edi.location);
          const embedResult = await client.search(searchDocument);
      
          // console.log("embed results",embedResult.body.hits.hits);
          for (r in results.hits) {
            for (h in embedResult.body.hits.hits) {
              if (embedResult.body.hits.hits[h]._source[edi.foreign_key] == results.hits[r]._source[edi.id]) {
                // console.log(embedResult.body.hits.hits[h]._source[edi.foreign_key],results.hits[r]._source[edi.id]);
                if (!results.hits[r]._source[edi.location]) { 
                  results.hits[r]._source[edi.location] = [];
                }
                if (edi.add) {
                  embedResult.body.hits.hits[h]._source = Object.assign({},embedResult.body.hits.hits[h]._source,edi.add);
                }
                results.hits[r]._source[edi.location].push(embedResult.body.hits.hits[h]._source);
                // console.log("embed one result expanded",results.hits[r]._source);
              }
            }
          }
        }  
        catch(e) {
          console.error("embed error",e)
        }
        // console.log("embed results expanded",edi.location,results);
      }

      // console.log("embed results returned",results);
      return results;

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

async function addSummaries(index,params,results) {
  if (results.hits.length == 0) {
    console.error("addSummaries error, no result hits")
    return results;
  }
  let body = {sort: [{"contracts.value.amount": {order: "desc"}}], size: 10000, query: {bool: {filter: []}}}

  //collect ids
  //query other collections
  //merge
  console.log("embed",results);
  results.hits.forEach(result => {
    body.query.bool.filter.push({term: {"parties.id": result._source.id}})
    body.query.bool.filter.push({term: {"parties.memberOf.id": result._source.id}})
    body.query.bool.filter.push({term: {"parties.contactPoint.id": result._source.id}})
  })

  const searchDocument = {
    index: "contracts",
    body: body
  }

  console.log("addSummaries searchDocument body",JSON.stringify(searchDocument.body));

  try {
    console.log("addSummaries");
    const summariesResult = await client.search(searchDocument);

    // console.log("summaries results",summariesResult.body.hits.hits);
    for (r in results.hits) {
      results.hits[r]._source.summaries = calculateSummaries(results.hits[r]._source.id,summariesResult.body.hits.hits);
          // console.log("embed one result expanded",results.hits[r]._source);
    }
  }  
  catch(e) {
    console.error("addSummaries error",e)
  }
  // console.log("embed results expanded",edi.location,results);
  
  // console.log("embed results returned",results);
  return results;
}


function addLink(relationSummary, link) {
  if (relationSummary.links.length > 1000) {
    // console.log("skipping link", link)
    return false;
  }

  const source = find(relationSummary.nodes, { id: link.source });
  const target = find(relationSummary.nodes, { id: link.target });

  if (source && target) {

    // console.log('addLink',link,source.id,target.id);
    const existentLink = find(relationSummary.links, { source: source.id, target: target.id });

    if (!existentLink) {
      const newLink = {
        id: relationSummary.links.length,
        source: source.id,
        target: target.id,
        weight: link.weight || 1,
        type: link.type || "undefined"
      };
      // console.log('addLink',newLink);
      relationSummary.links.push(newLink);
    } else {
      existentLink.weight += link.weight || 1;
    }

    if (!target.fixedWeight){
      target.weight = parseFloat(target.weight) + (link.weight || 1);
    }
    if (!source.fixedWeight){
      source.weight = parseFloat(source.weight) + (link.weight || 1);
    }

  }
  // else {
  //   console.error('Faltó agregar algún nodo', link);
  // }
  return true;
}
function addNode(relationSummary, node) {
  if (relationSummary.nodes.length > 400) {
    return false;
  }

  if (!find(relationSummary.nodes, { id: node.id })) {
    // console.log('addNode',node);

    if (!node.weight) {
      node.weight = 1;
    }
    relationSummary.nodes.push(node);
  }
  return true;
}

function getMaxContractAmount(contracts) {
  let maxContractAmount = 0;
  for (const c in contracts) {
    if (Object.prototype.hasOwnProperty.call(contracts, c)) {
      const contract = contracts[c]._source;
      // console.log(contract);
      const amount = parseFloat(contract.contracts.value.amount);
      if (amount > maxContractAmount) {
        maxContractAmount = amount;
      }
    }
  }
  return maxContractAmount;
}

function calculateSummaries(orgID, contracts) {
  // console.log('calculateSummaries',records.length);

  //  Generar los objetos para cada gráfico
  const yearSummary = {};
  const typeSummary = {};
  const allBuyers = {};
  const allSuppliers = {};
  const allFundees = {};
  const relationSummary = { nodes: [], links: [] };
  const maxContractAmount = getMaxContractAmount(contracts);

  for (const c in contracts) {
    if (Object.prototype.hasOwnProperty.call(contracts, c)) {
      const contract = contracts[c]._source;

      const buyerParty = find(contract.parties, { id: contract.buyer.id });
      const funderParty = find(contract.parties, { roles: ["funder"] });
      // console.log("funderParty",funderParty,compiledRelease.parties);
      const memberOfParty = find(contract.parties, 'memberOf');
      // console.log('calculateSummaries memberOfParty', memberOfParty.memberOf[0].id === orgID, buyerParty.id === orgID || memberOfParty.memberOf[0].id === orgID);
      const procurementMethod = contract.tender.procurementMethod;

      const isFunderContract = funderParty ? (funderParty.id === orgID) : false;

      const isBuyerContract =
        buyerParty.id === orgID || (buyerParty.contactPoint && buyerParty.contactPoint.id === orgID) || memberOfParty && memberOfParty.memberOf[0].id === orgID;

  
      const award = contract.awards;
      const isSupplierContract = find(award.suppliers, { id: orgID }) || false;
      // console.log("compiledRelease.buyer.id",compiledRelease.buyer.id);
      //console.log("contract.period",contract.period,compiledRelease.ocid);

      let year = "undefined";
      if (contract.period) {
        year = new Date(contract.period.startDate).getFullYear();
      }

      if (isFunderContract) {
        if (!allFundees[memberOfParty.id]) {
          allFundees[memberOfParty.id] = memberOfParty;
          allFundees[memberOfParty.id].contract_amount_top_funder = 0;
          allFundees[memberOfParty.id].type = buyerParty.type;
        }
        allFundees[memberOfParty.id].contract_amount_top_funder += award.value.amount;
      }

      // To calculate top3buyers
      if (isSupplierContract) {
        if (memberOfParty) {
          if (!allBuyers[memberOfParty.id]) {
            allBuyers[memberOfParty.id] = memberOfParty;
            allBuyers[memberOfParty.id].contract_amount_top_buyer = 0;
            allBuyers[memberOfParty.id].type = buyerParty.type;
          }
          allBuyers[memberOfParty.id].contract_amount_top_buyer += award.value.amount;
        }
      }

      if (year != "undefined") {
        if (!yearSummary[year]) {
          yearSummary[year] = {
            buyer: { value: 0, count: 0 },
            supplier: { value: 0, count: 0 },
            funder: { value: 0, count: 0 },
          };
        }

        // TODO: sumar los amounts en MXN siempre
        if (isSupplierContract) {
          yearSummary[year].supplier.value += parseInt(contract.contracts.value.amount, 10);
          yearSummary[year].supplier.count += 1;
        }
        if (isBuyerContract) {
          yearSummary[year].buyer.value += parseInt(contract.contracts.value.amount, 10);
          yearSummary[year].buyer.count += 1;
        }
        if (isFunderContract) {
          yearSummary[year].funder.value += parseInt(contract.contracts.value.amount, 10);
          yearSummary[year].funder.count += 1;
        }

      }

      if (!typeSummary[procurementMethod]) {
        typeSummary[procurementMethod] = {
          buyer: { value: 0, count: 0 },
          supplier: { value: 0, count: 0 },
          funder: { value: 0, count: 0 },
        };
      }

      if (isSupplierContract) {
        typeSummary[procurementMethod].supplier.value += parseInt(contract.contracts.value.amount, 10);
        typeSummary[procurementMethod].supplier.count += 1;
      }
      if (isBuyerContract) {
        typeSummary[procurementMethod].buyer.value += parseInt(contract.contracts.value.amount, 10);
        typeSummary[procurementMethod].buyer.count += 1;
      }
      if (isFunderContract) {
        typeSummary[procurementMethod].funder.value += parseInt(contract.contracts.value.amount, 10);
        typeSummary[procurementMethod].funder.count += 1;
      }



      // TODO: sumar los amounts en MXN siempre

      // UC
      addNode(relationSummary, { id: buyerParty.id,label: buyerParty.name, type: buyerParty.details.type });
      // addNode(relationSummary, { id: procurementMethod,label: procurementMethod, type: 'procurementMethod' });

      // addLink(relationSummary, { source: buyerParty.id, target: procurementMethod });

      const linkWeight = Math.round((parseFloat(contract.contracts.value.amount)/parseFloat(maxContractAmount))*10);



      for (const a in award.suppliers) {
        if (Object.prototype.hasOwnProperty.call(award.suppliers, a)) {
          const supplierParty = find(contract.parties, { id: award.suppliers[a].id });

          if (supplierParty) {
            addNode(relationSummary, { id: award.suppliers[a].id,label: award.suppliers[a].name, type: supplierParty.details.type });
            addLink(relationSummary, { source: buyerParty.id, target: award.suppliers[a].id, weight: linkWeight, type: procurementMethod || "supplier" });

            if (isBuyerContract) {
              // To calculate top3suppliers
              if (!allSuppliers[supplierParty.id]) {
                allSuppliers[supplierParty.id] = supplierParty;
                allSuppliers[supplierParty.id].contract_amount_top_supplier = 0;
              }
              allSuppliers[supplierParty.id].contract_amount_top_supplier += award.value.amount;
            }
          }
          // else {
          //   console.error('Party id error','award:',award,'parties:',compiledRelease.parties);
          // }
        }
      }

      // console.log("calculateSummaries buyerParty",buyerParty);
      if (buyerParty.memberOf) {

        if (buyerParty.memberOf[0].name) {
          addNode(relationSummary, { id: buyerParty.memberOf[0].id, label: buyerParty.memberOf[0].name, type: "dependency" });
          addLink(relationSummary, { source: buyerParty.id, target: buyerParty.memberOf[0].id, type: "buyer" });
        }
      }

      if (funderParty) {
        addNode(relationSummary, { id: funderParty.id,label: funderParty.name, type: funderParty.details.type });

        if (buyerParty.memberOf) {
          addLink(relationSummary, { source: buyerParty.memberOf[0].id, target: funderParty.id, weight: linkWeight, type: "funder" });
        }
        else {
          addLink(relationSummary, { source: buyerParty.id, target: funderParty.id, weight: linkWeight, type: "funder" });
        }
      }

    }
  }

  
  // console.log("allBuyers",sortBy('contract_amount_top_buyer', allBuyers))

  //Cut the top 3 of all ordered by contract amount, except the current org
  delete allBuyers[orgID];
  delete allSuppliers[orgID];
  delete allFundees[orgID];
  const top3buyers = slice(0, 3, orderBy('contract_amount_top_buyer', 'desc', allBuyers));
  const top3suppliers = slice(0, 3, orderBy('contract_amount_top_supplier', 'desc', allSuppliers));
  const top3fundees = slice(0, 3, orderBy('contract_amount_top_funder', 'desc', allFundees));

  const summary = {
    year: yearSummary,
    type: typeSummary,
    relation: relationSummary,
    top_buyers: top3buyers,
    top_suppliers: top3suppliers,
    top_fundees: top3fundees,
  };

  return summary;
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
    addSummaries,
    embed
}