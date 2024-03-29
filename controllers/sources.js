const lib = require('./libv3');
const controllerIndex = "sources"

function allSources(context) {
  const debug = context.req.originalUrl.indexOf("debug") > -1;
  const prefix = context.params.query.db_prefix;

  const searchDocument = {
    index: lib.addPrefix(lib.allIndexes,prefix),
    body: {  
      "size": 0,
      "aggs": {
        "source": {
          "terms": {
            "field": "source.id.keyword",
            "order": {
              "_key": "asc"
            }
          },
          "aggs": {
            "classification": {
              "terms": {
                "field": "classification.keyword",
                "order": {
                  "_key": "asc",
                },
                "size": 20
              }
            },
            "date": {
              "max": {
                "field": "date"
              }
            }
          }
        },
        "classification": {
          "terms": {
            "field": "classification.keyword",
            "order": {
              "_key": "asc"
            },
            "size": 20
          },
          "aggs": {
            "date": {
              "max": {
                "field": "date"
              }
            }
          }
        },
        "index": {
          "terms": {
            "field": "_index",
            "order": {
              "_key": "asc"
            }
          },
          "aggs": {
            "date": {
              "max": {
                "field": "date"
              }
            }
          }
        }
      }
    },
  };

  if (debug) {
    console.log ("allSources searchDocument",products,JSON.stringify(searchDocument.body))
  }  

  return lib.client.search(searchDocument)
    .then(returnAggregations)
}

function returnAggregations(response) {
  // console.log("parseAggregations",response.body.aggregations.source.buckets);
  // return response.body.aggregations;
  return {
    status: "success",
    size: response.body.aggregations.source.buckets.length,
    limit: null,
    offset: null,
    pages: null,
    count: response.body.aggregations.source.buckets.length,
    count_precission: "eq",
    version: lib.version,
    generated: new Date(),
    data: { 
      index: formatClassifications(response.body.aggregations.index.buckets) ,
      classification: formatClassifications(response.body.aggregations.classification.buckets),
      sources: formatSources(response.body.aggregations.source.buckets), 
    },
};

}

function formatClassifications(buckets) {
  return buckets.map(bucket => {
    if (bucket.key.indexOf("areas_" ) == 0) {
      bucket.key = "areas";
    }    
    if (bucket.key.indexOf("persons_") == 0) {
      bucket.key = "persons";
    }    
    if (bucket.key.indexOf("contracts_") == 0) {
      bucket.key = "contracts";
    }    
    if (bucket.key.indexOf("organizations_") == 0) {
      bucket.key = "organizations";
    }   
    if (bucket.key.indexOf("products_") == 0) {
      bucket.key = "products";
    }   

    let classification = {
      [bucket.key]: {
        count: bucket.doc_count
      }
    }
    if (bucket.date) {
      classification[bucket.key].lastModified = bucket.date.value_as_string;
    }
    return classification;
  }).reduce(function(result, item, index, array) {
    firstKey = Object.keys(item)[0];
    result[firstKey] = item[firstKey]; //a, b, c
    return result;
  }, {});
  
}

function formatSources(buckets) {
  return buckets.map(bucket => {
    // console.log("formatSources",bucket.key,bucket.contracts);
    let fullBucket =  bucket.classification.buckets;
    let source = {
      [bucket.key]: { classification: formatClassifications(fullBucket) },
    }
    // console.log("formatSources",bucket);
    if (bucket.date) {
      source[bucket.key].lastModified = bucket.date.value_as_string
    }
    return source;
  }).reduce(function(result, item, index, array) {
    firstKey = Object.keys(item)[0];
    result[firstKey] = item[firstKey]; //a, b, c
    return result;
  }, {});
}

module.exports = {allSources}