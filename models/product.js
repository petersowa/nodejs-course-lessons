const uuid = require('uuid/v1');
const { getDb } = require('../database/connect');

const getProductsFromDB = query => {
  const products = getDb().collection('products');
  return products.find(query).toArray();
};

module.exports = class Product {
  constructor(
    title = 'picture',
    description = 'A cool picture.',
    imageURL = 'https://picsum.photos/200',
    price = 1.0
  ) {
    this.product = { id: uuid(), title, description, imageURL, price };
  }

  async save() {
    const db = getDb();
    try {
      return await db.collection('products').insertOne(this.product);
    } catch (err) {
      throw err;
    }
  }

  static fetchAll(query = {}) {
    return getProductsFromDB(query);
  }
};

exports.version = '0.1';
