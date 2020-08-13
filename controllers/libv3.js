const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

client.get = function() {
  console.error("Can't call client.get in api v3.")
  return {}
}

module.exports = client;

const query_definitions = {
  "country": {
    context: "filter",
    type: "term"
  }
}

function paramsToBody(params) {
  const body={query: { bool: { filter: [] }}}; 
  Object.keys(params).forEach( param => { 
    if (params[param]) {
      let qdp = query_definitions[param];
      if (qdp) {
        if (qdp.context == "filter") {
          if (qdp.type == "term") {
            body.query.bool.filter.push({term: { adquisicion_por: params[param]}}); 
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