const db = require('../db');
const collection = db.get('organizations', { castIds: false });
// const omit = require('lodash/omit');
const omitEmpty = require('./lib').omitEmpty;
const queryToPipeline = require('./lib').queryToPipeline;
const getQuery = require('./lib').getQuery;
const allDocuments = require('./lib').allDocuments;
const addGraphs = require('./lib').addGraphs;
const getDistinct = require('./lib').getDistinct;
const dataReturn = require('./lib').dataReturn;
const prepareOutput = require('./libv3').prepareOutput;
const search = require('./libv3').search;

const membershipJoins = [
  {
    $lookup: {
      from: 'memberships',
      localField: 'id',
      foreignField: 'compiledRelease.organization_id',
      as: 'memberships.child',
    },
  },
  {
    $lookup: {
      from: 'memberships',
      localField: 'id',
      foreignField: 'compiledRelease.parent_id',
      as: 'memberships.parent',
    },
  },

  { // Adding country info
    $lookup: {
      from: 'mujeres_en_la_bolsa',
      localField: 'compiledRelease.area.id',
      foreignField: 'id',
      as: 'countryData',
    }
  },
  // {
  //   $lookup: {
  //     from: 'organizations',
  //     localField: 'memberships.child.organization_id',
  //     foreignField: 'id',
  //     as: 'memberships.child_expanded',
  //   },
  // },
];

function orgDataMap(o) {
  // const object = omit(o, ['memberships_sob', 'shares']);
  // const sob = o.memberships_sob.map(b => (omit(b, ['_id', 'user_id', 'sob_org'])));
  //
  // object.shares = o.shares
  //   .map(b => {
  //     b.org_id = b.sob_org;
  //     return omit(b, ['_id', 'user_id', 'sob_org', 'org', 'role']);
  //   });
  //
  // object.board = sob
  //   .filter(b => (b.department === 'board'))
  //   .map(b => (omit(b, ['department'])));
  //
  // object.shareholders = sob.filter(b => (b.role === 'shareholder'))
  //   .map(b => (omit(b, 'role')));
  //
  // object.memberships = sob.filter(b => (b.role !== 'shareholder' && b.department !== 'board'));

  // return omitEmpty(o);
  return o;
}
function allInstitutions(context) {;
  return search("imss",context.params.query).then(results => { return prepareOutput(results) } )
}


function allCompanies(req, res) {
  const debug = req.query.debug;
  const query = getQuery(req,debug);
  const offset = query.options.skip || 0;

  let typeJoins = [];
  let joins = [];

  if (req.originalUrl.indexOf('companies') > -1) {
    query.criteria["compiledRelease.classification"] = 'company';
  } else {
    query.criteria["compiledRelease.classification"] = query.criteria["compiledRelease.classification"] || 'institution';
    typeJoins = [{ // Adding flags only for instiutions
      $lookup: {
        from: 'party_flags',
        localField: 'id',
        foreignField: 'party.id',
        as: 'flags',
      },
    }];
  }

  // if (query.criteria.compiledRelease.subclassification == "unidad-compradora") {
  //   joins = typeJoins
  // }
  // else {
    joins = [...membershipJoins, ...typeJoins]
  // }


  // console.log("allOrganizations query",JSON.stringify(query));

  allDocuments(query, collection, joins, debug)
    .then(array => (addGraphs(collection, array, db)))
    .catch(err => {
      console.error('allOrganizations query error', err);
      if (err) {
        return err;
      }
      return false;
    })
    .then(array => {
      return dataReturn(res, array, offset, query.options.limit, query.embed, orgDataMap, debug)
    } )
    .catch(err => {
      console.error("allOrganizations return error",err);
      res.json({"error": "error"})
    });
}

function distinctOrganization(req, res) {
  getDistinct(req, res, collection);
}


function singleOrganization(req, res) {
  const query = getQuery(req);
  const pipeline = queryToPipeline(query, membershipJoins);

  collection.aggregate(pipeline)
    .then(array => (addGraphs(collection, array, db)))
    .then(docs => (dataReturn(res, [1, docs], 0, true, query.options.limit, orgDataMap, debug)));
}

module.exports = {
  allCompanies,
  allInstitutions,
  singleOrganization,
  distinctOrganization,
};
