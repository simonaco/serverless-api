const MongoClient = require('mongodb').MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPass
};
module.exports = function(context, req) {
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      let hero = ({ id, name, saying } = req.body);
      var db = database.db('admin');

      db.collection('heros').insertOne(
        {
          id: hero.id,
          name: hero.name,
          saying: hero.saying
        },
        (err, heros) => {
          if (err) throw err;
          context.res = {
            body: hero
          };
          database.close();
          context.done();
        }
      );
    }
  );
};
