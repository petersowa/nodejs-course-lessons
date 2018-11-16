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
    )
      .then(client => {
        _db = client.db();
        resolve(_db);
      })
      .catch(err => {
        console.log('failed to connect to db');
        reject(err);
      });
  });
};

exports.getDb = () => {
  if (_db) return _db;
  throw 'no database found!';
};
