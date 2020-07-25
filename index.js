
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {

    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    // await client.indices.refresh({ index: 'game-of-thrones' })
  
    // Let's search!
    const { body } = await client.search({
      index: 'imss',
      body: {
        // query: {
        //   match: { quote: 'winter' }
        // }
      }
    })
  
    console.log(body.hits.hits[0])
  }
  
  run().catch(console.log)