const { MongoClient } = require('mongodb');
const { db_connect } = require('./config.js');

let _db;

console.log('connecting to mongodb');

exports.mongoConnect = () => {
  return new Promise((resolve, reject) => {
    if (_db) resolve(_db);
    MongoClient.connect(
      db_connect,
      { useNewUrlParser: true }
    ).then(client => {
      _db=client;
      resolve(_db)
    }
  );
};
