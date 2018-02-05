const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      const db = database.db('admin');

      db
        .collection('Heroes')
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          result.forEach(hero => {
            delete hero._id;
          });
          context.res = {
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};
