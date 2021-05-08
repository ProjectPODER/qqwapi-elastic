const lib = require('./libv3');
const controllerIndex = "sources"

function allSourcesList(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;
  const products = context.params.query.products;

  const searchDocument = {
    index: lib.allIndexes,
    body: {  
      "size": 0,
      "aggs": {
        "sourceList": {
          "terms": {
            "field": "source.id.keyword",
            "order": {
              "_key": "asc"
            }
          },
        },
      }
    },
  };


  if (products != "true") {

    searchDocument.body.query = {
      bool: {
        must_not: [
          {
            "terms": {
              "classification.keyword": ["purchase","Artículos de consumo","Material médico","Medicinas y vacunas","Mobiliario","Ropa y Telas"]
            }
          },
          {
            "match": {
              "source.id.keyword": "cbmei"
            }
          } 
        ]
      }
    };
    
    searchDocument.body.query.bool.must_not.push(
    {
      "match": {
        "source.id.keyword": "comprasimss"
      }
    } 
    );
  }

  if (debug) {
    console.log ("allSourcesList searchDocument",products,lib.allIndexes,JSON.stringify(searchDocument.body))
  }



  return lib.client.search(searchDocument)
    .then(returnAggregations)
}

function returnAggregations(response) {
  // console.log("parseAggregations",response.body.aggregations.source.buckets);
  // return response.body.aggregations;
  return {
    status: "success",
    size: response.body.aggregations.sourceList.buckets.length,
    limit: null,
    offset: null,
    pages: null,
    count: response.body.aggregations.sourceList.buckets.length,
    count_precission: "eq",
    data: formatSourcesList(response.body.aggregations.sourceList.buckets), 
  };

}

function formatSourcesList(buckets) {
    let returnArray = [];
  return buckets.map(bucket => {
    // console.log("formatSourcesList",bucket.key);
    let source = {
      [bucket.key]: { id: bucket.key, name: bucket.key },
    }
    return source;
  })
  .reduce(function(result, item, index, array) {
    firstKey = Object.keys(item)[0];
    // console.log(firstKey)
    returnArray.push(item[firstKey]); //a, b, c
    return returnArray;
  }, {});
}

module.exports = {allSourcesList}