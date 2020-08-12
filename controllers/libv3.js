const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

client.get = function() {
  console.error("Can't call client.get in api v3.")
  return {}
}

module.exports = client;

async function search (index,body) {

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  // await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  try {

    const { result } = await client.search({
      index: index,
      body: body
      //  {
      //   query: {
      //     match: { quote: 'winter' }
      //   }
      // }
    })

  }  
  catch(e) {
    return {error: e}
  }
//   return {}
  return result.hits;
  // console.log(body.hits.hits[0])
}

function prepareOutput(array, offset, limit, embed, objectFormat, debug) {
    let data = array[1];
    let status = "success";
    let size = 0;

    // Contracts have a different structure and their length comes in the third item in the array
    // console.log("dataReturn",array);
    if (array[2] || (array[1] && typeof array[1] == "object")) {
        size = array[2] || array[1].length;
        if (embed) {
        data = array[1].map(o => (objectFormat(o)));
        }
    }
    else {
        console.error("dataReturn error",array);
        status = "error";
    }

    if (debug) {
        console.log("dataReturn",size);
    }

    const pageSize = limit || size;
    const pagesNum = Math.ceil((array[0] / pageSize));


    return {
        status: status,
        size,
        limit,
        offset,
        pages: pagesNum,
        count: array[0],
        data,
    };
}

module.exports = {
    prepareOutput,
    search
}