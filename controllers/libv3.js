const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

client.get = function() {
  console.error("Can't call client.get in api v3.")
  return {}
}

module.exports = client;

function paramsToMatch(params) {
  let result={}; 
  Object.keys(params).forEach( param => { 
    if (params[param]) { 
      if (param != "limit") {
        result[param] = params[param]; 
      }
    } 
  })
  return result; 
}



async function search (index,params) {
  // console.log("search",params,typeof params);

  const searchDocument = {
    index: index,
    body:
     {
      // query: {
      //   match: paramsToMatch(params) 
      // },
      // limit: params.limit
    }
  }

  console.log("search searchDocument",JSON.stringify(searchDocument));

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