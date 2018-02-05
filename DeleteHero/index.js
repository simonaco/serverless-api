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
      let heroId = parseInt(req.params.id);
      db.collection('Heroes').remove({ id: heroId }, (err, result) => {
        if (err) throw err;
        context.res = {
          body: result
        };
        database.close();
        context.done();
      });
    }
  );
};
