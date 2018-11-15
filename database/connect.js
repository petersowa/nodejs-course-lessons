const { MongoClient } = require('mongodb');
const { db_connect } = require('./config.js');

console.log('connecting to mongodb');

exports.mongoConnect = () => {
  return MongoClient.connect(
    db_connect,
    { useNewUrlParser: true }
  );
};
