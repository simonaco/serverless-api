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
      let hero = ({ id, name, saying } = req.body);
      db
        .collection('Heroes')
        .updateOne({ id: hero.id }, { $set: { hero } }, (err, heroes) => {
          if (err) throw err;
          context.res = {
            body: hero
          };
          database.close();
          context.done();
        });
    }
  );
};
